const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DATE=/^\d{4}-\d{2}-\d{2}$/;
const TYPES=new Set(['higienizacao','manutencao','outro']);
const PHASES=new Set(['antes','depois']);
export function validateVisitInput(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new TypeError('Atendimento inválido.');
 const {equipment_id,service_type,description,next_contact_on,measurements=[]}=input;
 if(typeof equipment_id!=='string'||!UUID.test(equipment_id))throw new TypeError('Equipamento inválido.');
 if(!TYPES.has(service_type))throw new TypeError('Tipo de serviço inválido.');
 if(description!=null&&(typeof description!=='string'||description.length>5000))throw new TypeError('Descrição inválida.');
 if(next_contact_on!=null&&(typeof next_contact_on!=='string'||!DATE.test(next_contact_on)||Number.isNaN(Date.parse(next_contact_on+'T00:00:00Z'))||new Date(next_contact_on+'T00:00:00Z').toISOString().slice(0,10)!==next_contact_on))throw new TypeError('Data de retorno inválida.');
 if(!Array.isArray(measurements)||measurements.length>2)throw new TypeError('Informe até duas medições.');
 const seen=new Set();
 const normalized=measurements.map(item=>{
  if(!item||typeof item!=='object'||Array.isArray(item)||!PHASES.has(item.phase)||seen.has(item.phase))throw new TypeError('Fase da medição inválida ou duplicada.');
  seen.add(item.phase);
  const numberOrNull=(value,label)=>{if(value===''||value==null)return null;if(typeof value!=='number'&&(typeof value!=='string'||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/.test(value.trim())))throw new TypeError(label+' inválida.');const parsed=Number(value);if(!Number.isFinite(parsed))throw new TypeError(label+' inválida.');return parsed;};
  const velocity=numberOrNull(item.air_velocity_ms,'Velocidade do ar');
  const temperature=numberOrNull(item.outlet_temperature_c,'Temperatura');
  if(temperature!=null&&(temperature < -100||temperature > 150))throw new TypeError('Temperatura fora do intervalo permitido.');
  if(velocity!=null&&velocity>200)throw new TypeError('Velocidade do ar fora do intervalo permitido.');
  if(velocity!=null&&velocity<0)throw new TypeError('Velocidade do ar inválida.');
  if(item.test_conditions!=null&&(typeof item.test_conditions!=='string'||item.test_conditions.length>2000))throw new TypeError('Condições do teste inválidas.');
  return {phase:item.phase,air_velocity_ms:velocity,outlet_temperature_c:temperature,test_conditions:item.test_conditions||null};
 });
 return {equipment_id,service_type,description:description?.trim()||null,next_contact_on:next_contact_on||null,measurements:normalized};
}
