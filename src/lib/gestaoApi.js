// Clean Air Gestão: cliente REST sem persistência de tokens no navegador.
// O backend Supabase deve ter RLS e lista de administradores habilitadas.
const url = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
let session = null;
export const configured = Boolean(url && key);
export const isSignedIn = () => Boolean(session?.access_token);
const request = async (path, options = {}) => {
  if (!configured) throw new Error('Configure o banco exclusivo da Clean Air antes de utilizar a gestão.');
  if (session?.expires_at && Date.now() >= session.expires_at * 1000 - 60000 && !path.startsWith('/auth/v1/')) {\n    const refreshed = await request('/auth/v1/token?grant_type=refresh_token', {method:'POST',body:JSON.stringify({refresh_token:session.refresh_token})});\n    session = {...refreshed,expires_at:Math.floor(Date.now()/1000)+refreshed.expires_in};\n  }\n  const response = await fetch(url + path, {
    ...options,
    headers: { apikey: key, ...(session?.access_token ? {Authorization: 'Bearer ' + session.access_token} : {}),
      'Content-Type': 'application/json', ...options.headers },
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.msg || payload.message || payload.error_description || payload.error || 'Não foi possível concluir a operação.');
  }
  if (response.status === 204) return null;
  return response.json();
};
export async function signIn(email, password) {
  const result = await request('/auth/v1/token?grant_type=password', {method:'POST',body:JSON.stringify({email,password})});
  session = {...result,expires_at:Math.floor(Date.now()/1000)+result.expires_in};
  try {
    const admins = await request('/rest/v1/admin_users?select=user_id&limit=1');
    if (!admins.length) throw new Error('Esta conta não está autorizada a acessar a gestão.');
  } catch (error) { session = null; throw error; }
}
export async function signOut() {
  try { if (session) await request('/auth/v1/logout', {method:'POST'}); } finally { session = null; }
}
export async function listCustomers(search='') {
  const query = new URLSearchParams({select:'id,full_name,phone,email,preferred_contact,contact_consent,created_at',order:'full_name.asc',limit:'100'});
  if (search.trim()) query.set('full_name','ilike.*'+search.trim().replace(/[*,()]/g,'')+'*');
  return request('/rest/v1/customers?'+query.toString());
}
export async function updateCustomer(id,data) {\n  const [updated] = await request('/rest/v1/customers?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});\n  if (!updated) throw new Error('Cliente não encontrado ou sem permissão.');\n  return updated;\n}\nexport async function deleteCustomer(id) {\n  const deleted = await request('/rest/v1/customers?id=eq.'+encodeURIComponent(id),{method:'DELETE',headers:{Prefer:'return=representation'}});\n  if (!deleted.length) throw new Error('Cliente não encontrado ou sem permissão.');\n}\nexport async function addCustomer(data) {
  return request('/rest/v1/customers', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});
}
export async function listEquipment(customerId) {
  return request('/rest/v1/equipment?'+new URLSearchParams({select:'*',customer_id:'eq.'+customerId,order:'created_at.desc'}));
}
export async function updateEquipment(id,data) {\n  const [updated] = await request('/rest/v1/equipment?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});\n  if (!updated) throw new Error('Equipamento não encontrado ou sem permissão.');\n  return updated;\n}\nexport async function deleteEquipment(id) {\n  const deleted = await request('/rest/v1/equipment?id=eq.'+encodeURIComponent(id),{method:'DELETE',headers:{Prefer:'return=representation'}});\n  if (!deleted.length) throw new Error('Equipamento não encontrado ou sem permissão.');\n}\nexport async function addEquipment(data) {
  return request('/rest/v1/equipment', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});
}
export async function listVisits(equipmentId) {
  return request('/rest/v1/service_visits?'+new URLSearchParams({select:'*,measurements(*)',equipment_id:'eq.'+equipmentId,order:'performed_at.desc'}));
}
export async function addVisit(data, measurements) {
  const [visit] = await request('/rest/v1/service_visits',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});
  if (measurements.length) {
    try { await request('/rest/v1/measurements',{method:'POST',body:JSON.stringify(measurements.map(m=>({...m,visit_id:visit.id})))}); }
    catch (error) { throw new Error('Atendimento salvo, mas houve erro nas medições: '+error.message); }
  }
  return visit;
}
export async function listReminders() {
  return request('/rest/v1/reminders?'+new URLSearchParams({select:'id,due_on,status,customer_id,customers(full_name,phone,preferred_contact,contact_consent),equipment(label)',status:'eq.pendente',order:'due_on.asc',limit:'100'}));
}
export async function completeReminder(id) {
  return request('/rest/v1/reminders?id=eq.'+encodeURIComponent(id),{method:'PATCH',body:JSON.stringify({status:'concluido',contacted_at:new Date().toISOString()})});
}
export async function addReminder(data) {
  return request('/rest/v1/reminders',{method:'POST',body:JSON.stringify(data)});
}
