import test from 'node:test';
import assert from 'node:assert/strict';
import {validateVisitInput} from '../api/_lib/visit-validation.js';
const id='123e4567-e89b-42d3-a456-426614174000';
const base={equipment_id:id,service_type:'higienizacao'};
test('normaliza atendimento e medições',()=>{const r=validateVisitInput({...base,next_contact_on:'2027-11-15',measurements:[{phase:'antes',air_velocity_ms:'2.4',outlet_temperature_c:'21'}]});assert.equal(r.measurements[0].air_velocity_ms,2.4);assert.equal(r.next_contact_on,'2027-11-15');});
test('rejeita equipamento inválido',()=>assert.throws(()=>validateVisitInput({...base,equipment_id:'x'}),/Equipamento/));
test('rejeita tipo desconhecido',()=>assert.throws(()=>validateVisitInput({...base,service_type:'invasivo'}),/Tipo/));
test('rejeita fases repetidas',()=>assert.throws(()=>validateVisitInput({...base,measurements:[{phase:'antes'},{phase:'antes'}]}),/duplicada/));
test('rejeita valores não finitos',()=>assert.throws(()=>validateVisitInput({...base,measurements:[{phase:'antes',air_velocity_ms:'Infinity'}]}),/Velocidade/));
test('rejeita velocidade negativa',()=>assert.throws(()=>validateVisitInput({...base,measurements:[{phase:'antes',air_velocity_ms:-1}]}),/Velocidade/));
test('rejeita data impossível',()=>assert.throws(()=>validateVisitInput({...base,next_contact_on:'2027-02-30'}),/Data/));
test('rejeita mais de duas medições',()=>assert.throws(()=>validateVisitInput({...base,measurements:[{},{},{}]}),/duas/));

test('rejeita velocidade acima do limite físico',()=>assert.throws(()=>validateVisitInput({...base,measurements:[{phase:'antes',air_velocity_ms:201}]}),/intervalo/));
test('rejeita temperatura extrema',()=>assert.throws(()=>validateVisitInput({...base,measurements:[{phase:'depois',outlet_temperature_c:151}]}),/intervalo/));

test('rejeita strings numéricas não decimais',()=>{for(const value of ['0x10','0b11','0o7','1_000'])assert.throws(()=>validateVisitInput({...base,measurements:[{phase:'antes',air_velocity_ms:value}]}),/Velocidade/)});
test('aceita decimal com expoente finito',()=>{const r=validateVisitInput({...base,measurements:[{phase:'antes',air_velocity_ms:'2.5e1'}]});assert.equal(r.measurements[0].air_velocity_ms,25)});
