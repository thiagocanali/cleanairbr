import {createAuthorizedVisit} from './create-authorized-visit.js';
import {AccessDenied} from './require-admin.js';

// Framework-independent HTTP handler. Wire only after server-side auth and DB adapters exist.
export function makeVisitHandler(dependencies){
 return async function handle(request,response){
  response.setHeader('Cache-Control','no-store');
  response.setHeader('Content-Type','application/json; charset=utf-8');
  response.setHeader('X-Content-Type-Options','nosniff');
  if(request.method!=='POST'){
   response.setHeader('Allow','POST');
   return response.status(405).json({error:'Método não permitido.'});
  }
  if(!/^application\/json(?:\s*;|\s*$)/i.test(request.headers?.['content-type']||'')){
   return response.status(415).json({error:'Envie JSON.'});
  }
  // Defense in depth for cookie-based sessions. Reject cross-origin browser writes.
  // Configure explicit trusted origins in the server adapter; never trust Host blindly.
  const origin=request.headers?.origin;
  if(origin){
   const allowed=dependencies.allowedOrigins;
   if(!Array.isArray(allowed)||!allowed.includes(origin))return response.status(403).json({error:'Origem não autorizada.'});
  }
  try{
   const result=await createAuthorizedVisit(request,dependencies);
   return response.status(201).json(result);
  }catch(error){
   if(error instanceof AccessDenied)return response.status(error.status).json({error:error.message});
   if(error instanceof TypeError&&error.message!=='Executor SQL não configurado.'&&error.message!=='Provedores de autenticação não configurados.')return response.status(400).json({error:error.message});
   // Never expose SQL details, stack traces or environment variables.
   return response.status(500).json({error:'Não foi possível registrar o atendimento.'});
  }
 };
}
