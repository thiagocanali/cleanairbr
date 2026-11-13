// Clean Air Gestão: cliente REST sem persistência de tokens no navegador.
// O backend Supabase deve ter RLS e lista de administradores habilitadas.
const url = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
let session = null;
export const configured = Boolean(url && key);
export const isSignedIn = () => Boolean(session?.access_token);
const request = async (path, options = {}) => {
  if (!configured) throw new Error('Configure o banco exclusivo da Clean Air antes de utilizar a gestão.');
  if (session?.expires_at && Date.now() >= session.expires_at * 1000 - 60000 && !path.startsWith('/auth/v1/')) {
    if (!session.refresh_token) { session = null; throw new Error('Sessão expirada. Entre novamente.'); }
    let refreshed;
    try { refreshed = await request('/auth/v1/token?grant_type=refresh_token', {method:'POST',body:JSON.stringify({refresh_token:session.refresh_token})}); }
    catch (error) { session = null; throw new Error('Sessão expirada. Entre novamente.'); }
    session = {...refreshed,expires_at:Math.floor(Date.now()/1000)+refreshed.expires_in};
  }
  const response = await fetch(url + path, {
    ...options,
    headers: { apikey: key, ...(session?.access_token ? {Authorization: 'Bearer ' + session.access_token} : {}),
      'Content-Type': 'application/json', ...options.headers },
  });
  if (!response.ok) {
    if (response.status === 401 && !path.startsWith('/auth/v1/')) session = null;
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.msg || payload.message || payload.error_description || payload.error || 'Não foi possível concluir a operação.');
  }
  if (response.status === 204) return null;
  const raw = await response.text();
  return raw ? JSON.parse(raw) : null;
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
  try { if (session) await request('/auth/v1/logout', {method:'POST'}); }
  finally { session = null; }
}
export async function listCustomers(search='') {
  const query = new URLSearchParams({select:'id,full_name,phone,email,preferred_contact,contact_consent,created_at',order:'full_name.asc',limit:'100'});
  if (search.trim()) query.set('full_name','ilike.*'+search.trim().replace(/[*,()\\]/g,'')+'*');
  return request('/rest/v1/customers?'+query.toString());
}
export async function updateCustomer(id,data) {
  const [updated] = await request('/rest/v1/customers?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});
  if (!updated) throw new Error('Cliente não encontrado ou sem permissão.');
  return updated;
}
export async function deleteCustomer(id) {
  const deleted = await request('/rest/v1/customers?id=eq.'+encodeURIComponent(id),{method:'DELETE',headers:{Prefer:'return=representation'}});
  if (!deleted?.length) throw new Error('Cliente não encontrado ou sem permissão.');
}
export async function addCustomer(data) {
  return request('/rest/v1/customers', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});
}
export async function listEquipment(customerId) {
  return request('/rest/v1/equipment?'+new URLSearchParams({select:'*',customer_id:'eq.'+customerId,order:'created_at.desc'}));
}
export async function updateEquipment(id,data) {
  const [updated] = await request('/rest/v1/equipment?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});
  if (!updated) throw new Error('Equipamento não encontrado ou sem permissão.');
  return updated;
}
export async function deleteEquipment(id) {
  const deleted = await request('/rest/v1/equipment?id=eq.'+encodeURIComponent(id),{method:'DELETE',headers:{Prefer:'return=representation'}});
  if (!deleted?.length) throw new Error('Equipamento não encontrado ou sem permissão.');
}
export async function addEquipment(data) {
  return request('/rest/v1/equipment', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)});
}
export async function listVisits(equipmentId) {
  return request('/rest/v1/service_visits?'+new URLSearchParams({select:'*,measurements(*)',equipment_id:'eq.'+equipmentId,order:'performed_at.desc'}));
}
export async function addVisit(data, measurements) {
  const visitId = await request('/rest/v1/rpc/create_service_visit', {
    method:'POST',
    body:JSON.stringify({
      p_equipment_id:data.equipment_id,
      p_service_type:data.service_type,
      p_description:data.description||null,
      p_next_contact_on:data.next_contact_on||null,
      p_measurements:measurements,
    }),
  });
  return {id:visitId};
}
export async function listReminders() {
  return request('/rest/v1/reminders?'+new URLSearchParams({select:'id,due_on,status,customer_id,customers(full_name,phone,preferred_contact,contact_consent),equipment(label)',status:'eq.pendente',order:'due_on.asc',limit:'100'}));
}
export async function completeReminder(id) {
  const updated = await request('/rest/v1/reminders?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({status:'concluido',contacted_at:new Date().toISOString()})});
  if (!updated?.length) throw new Error('Lembrete não encontrado ou sem permissão.');
  return updated[0];
}

