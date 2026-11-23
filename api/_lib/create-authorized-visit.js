import {requireAdmin} from './require-admin.js';
import {validateVisitInput} from './visit-validation.js';

// The caller must supply a server-side SQL executor with bound parameters.
// Never import this module in browser code or expose it without session verification.
export async function createAuthorizedVisit(request, {getSession,findUser,query}) {
 if(typeof query!=='function')throw new TypeError('Executor SQL não configurado.');
 await requireAdmin(request,{getSession,findUser});
 const input=validateVisitInput(request?.body);
 const statement='select public.create_service_visit($1::uuid,$2::text,$3::text,$4::date,$5::jsonb) as id';
 const values=[input.equipment_id,input.service_type,input.description,input.next_contact_on,JSON.stringify(input.measurements)];
 const result=await query(statement,values);
 const id=result?.rows?.[0]?.id;
 if(typeof id!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))throw new Error('Banco não confirmou o atendimento.');
 return {id};
}
