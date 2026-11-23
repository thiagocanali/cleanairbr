// Database-backed role resolver. Never authorize using a client or session role claim.
export function makeAdminUserLookup(query){
 if(typeof query!=='function')throw new TypeError('Executor SQL não configurado.');
 return async function findUser(authUserId){
  if(typeof authUserId!=='string'||!authUserId.trim())return null;
  const result=await query(
   'select auth_user_id, role from public.app_users where auth_user_id = $1::text limit 1',
   [authUserId]
  );
  const row=result?.rows?.[0];
  if(!row||row.auth_user_id!==authUserId)return null;
  return {id:row.auth_user_id,role:row.role};
 };
}
