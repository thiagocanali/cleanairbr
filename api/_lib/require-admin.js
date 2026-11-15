// Authorization boundary for future Neon-backed API routes.
// Authentication must resolve a verified server-side session; client-supplied roles are never trusted.
export class AccessDenied extends Error {
 constructor(status=401){super(status===401?'Autenticação necessária.':'Acesso não autorizado.');this.name='AccessDenied';this.status=status;}
}
export async function requireAdmin(request, {getSession,findUser}){
 if(typeof getSession!=='function'||typeof findUser!=='function')throw new TypeError('Provedores de autenticação não configurados.');
 const session=await getSession(request);
 const userId=session?.user?.id;
 if(typeof userId!=='string'||!userId.trim())throw new AccessDenied(401);
 // The role is read from trusted database state, never from session metadata or request payload.
 const user=await findUser(userId);
 if(!user||user.id!==userId||user.role!=='admin')throw new AccessDenied(403);
 return {userId:user.id};
}
