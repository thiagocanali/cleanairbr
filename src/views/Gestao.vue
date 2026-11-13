<template>
<div class="gestao">
  <div class="gestao-inner">
    <div class="heading"><div><p class="section-label">Área privada</p><h1>Clean Air <span>Gestão</span></h1><p>Seu caderno digital de clientes e atendimentos.</p></div><button v-if="authenticated" class="small-button" @click="logout">Sair da conta</button></div>
    <div v-if="!configured" class="notice" role="status"><strong>Configuração pendente.</strong> O sistema ainda não está conectado a um banco exclusivo da Clean Air. Nenhum dado de cliente deve ser inserido nesta etapa.</div>
    <form v-else-if="!authenticated" class="panel login" @submit.prevent="login">
      <h2>Acesso autorizado</h2><p>Somente contas previamente cadastradas podem entrar.</p>
      <label>E-mail<input v-model.trim="email" type="email" required autocomplete="username"/></label>
      <label>Senha<input v-model="password" type="password" required autocomplete="current-password"/></label>
      <button class="button-primary" :disabled="busy">{{busy?'Entrando...':'Entrar'}}</button>
    </form>
    <template v-else>
      <nav class="tabs" aria-label="Seções da gestão"><button v-for="item in tabs" :key="item" :class="{active:tab===item}" @click="tab=item">{{item}}</button></nav>
      <section v-if="tab==='Clientes'" class="panel">
        <div class="panel-title"><h2>Clientes</h2><button class="small-button" @click="toggleCustomerForm">{{showCustomerForm?'Cancelar':'+ Novo cliente'}}</button></div>
        <form v-if="showCustomerForm" class="form-grid" @submit.prevent="saveCustomer">
          <label>Nome completo *<input v-model.trim="customer.full_name" required maxlength="180"/></label>
          <label>Telefone<input v-model.trim="customer.phone" type="tel" maxlength="40"/></label>
          <label>E-mail<input v-model.trim="customer.email" type="email" maxlength="180"/></label>
          <label>Canal preferido<select v-model="customer.preferred_contact"><option value="whatsapp">WhatsApp</option><option value="phone">Ligação</option><option value="email">E-mail</option><option value="none">Não contatar</option></select></label>
          <label class="full checkbox"><input v-model="customer.contact_consent" type="checkbox"/> Cliente autorizou lembretes de contato</label>
          <button class="button-primary" :disabled="busy">{{editingCustomerId?'Atualizar cliente':'Salvar cliente'}}</button>
        </form>
        <label class="search">Buscar por nome<input v-model="search" placeholder="Digite o nome do cliente" @input="debouncedSearch"/></label>
        <div v-if="!customers.length" class="empty">Nenhum cliente encontrado.</div>
        <div v-for="item in customers" :key="item.id" class="list-item"><button class="customer-link" @click="openCustomer(item)"><span><strong>{{item.full_name}}</strong><small>{{item.phone||'Sem telefone'}} · {{item.preferred_contact}}</small></span><span aria-hidden="true">→</span></button><button class="small-button" @click="editCustomer(item)">Editar</button><button class="small-button danger" :disabled="busy" @click="removeCustomer(item)">Excluir</button></div>
      </section>
      <section v-if="tab==='Atendimentos'" class="panel">
        <h2>Ficha de atendimento</h2><p class="hint">Selecione um cliente e um equipamento para registrar a higienização e os testes.</p>
        <label>Cliente<select v-model="selectedCustomerId" @change="loadEquipment"><option value="">Selecione</option><option v-for="item in customers" :key="item.id" :value="item.id">{{item.full_name}}</option></select></label>
        <template v-if="selectedCustomerId">
          <div class="panel-title"><h3>Equipamentos</h3><button class="small-button" @click="toggleEquipmentForm">{{editingEquipmentId?'Cancelar edição':'+ Equipamento'}}</button></div>
          <form v-if="showEquipmentForm" class="form-grid" @submit.prevent="saveEquipment"><label>Identificação *<input v-model.trim="equipment.label" required placeholder="Ex.: Ar da sala"/></label><label>Marca<input v-model.trim="equipment.brand"/></label><label>Modelo<input v-model.trim="equipment.model"/></label><button class="button-primary" :disabled="busy">{{editingEquipmentId?'Atualizar equipamento':'Salvar equipamento'}}</button></form>
          <div v-for="item in equipments" :key="item.id" class="equipment-row"><span><strong>{{item.label}}</strong><small>{{item.brand||'Sem marca'}} {{item.model||''}}</small></span><button class="small-button" @click="editEquipment(item)">Editar</button><button class="small-button danger" :disabled="busy" @click="removeEquipment(item)">Excluir</button></div>
          <label>Equipamento<select v-model="selectedEquipmentId" @change="loadVisits"><option value="">Selecione</option><option v-for="item in equipments" :key="item.id" :value="item.id">{{item.label}} {{item.brand}}</option></select></label>
        </template>
        <form v-if="selectedEquipmentId" class="visit-form" @submit.prevent="saveVisit">
          <h3>Novo atendimento</h3><label>Serviço<select v-model="visit.service_type"><option value="higienizacao">Higienização</option><option value="manutencao">Manutenção</option><option value="outro">Outro serviço</option></select></label>
          <label>Descrição do serviço<textarea v-model.trim="visit.description" rows="3" placeholder="O que foi realizado?"/></label>
          <div class="measure-grid"><div v-for="phase in ['antes','depois']" :key="phase"><h4>{{phase==='antes'?'Antes do serviço':'Depois do serviço'}}</h4><label>Velocidade do ar (m/s)<input v-model="measure[phase].air_velocity_ms" type="number" step="0.001" min="0"/></label><label>Temperatura de saída (°C)<input v-model="measure[phase].outlet_temperature_c" type="number" step="0.01"/></label><label>Condições do teste<input v-model.trim="measure[phase].test_conditions" placeholder="Ex.: ventilação máxima"/></label></div></div>
          <div v-if="velocityComparison || temperatureComparison" class="comparison" aria-live="polite"><h4>Prévia do comparativo</h4><p v-if="velocityComparison"><strong>Velocidade do ar:</strong> {{formatDifference(velocityComparison.difference,2)}} m/s <span v-if="velocityComparison.percent!==null">({{formatDifference(velocityComparison.percent,1)}}%)</span></p><p v-if="temperatureComparison"><strong>Temperatura de saída:</strong> {{formatDifference(temperatureComparison.difference,1)}} °C</p><small>Compare apenas testes realizados em condições equivalentes. Estes números não representam economia elétrica.</small></div><p v-else class="hint">Preencha as medições antes e depois para visualizar a diferença. Isso não representa economia de energia.</p>
          <label>Próximo contato (opcional)<input v-model="visit.next_contact_on" type="date"/></label>
          <button class="button-primary" :disabled="busy">Salvar atendimento</button>
          <h3>Histórico deste equipamento</h3>
          <div v-if="!visits.length" class="empty">Nenhum atendimento registrado.</div>
          <article v-for="item in visits" :key="item.id" class="history"><strong>{{formatDate(item.performed_at)}} · {{item.service_type}}</strong><p>{{item.description||'Sem observações'}}</p><small v-for="m in item.measurements" :key="m.id">{{m.phase}}: {{m.air_velocity_ms??'—'}} m/s · {{m.outlet_temperature_c??'—'}} °C<br/></small></article>
        </form>
      </section>
      <section v-if="tab==='Lembretes'" class="panel"><h2>Próximos contatos</h2><p class="hint">Entre em contato somente quando houver autorização do cliente.</p><div v-if="!reminders.length" class="empty">Nenhum lembrete pendente.</div><article v-for="item in reminders" :key="item.id" class="reminder"><div><strong>{{item.customers?.full_name||'Cliente'}}</strong><p>{{item.equipment?.label}} · {{formatDate(item.due_on)}}</p><small>Preferência: {{item.customers?.preferred_contact}}</small></div><div class="reminder-actions"><a v-if="item.customers?.contact_consent && item.customers?.preferred_contact==='whatsapp' && item.customers?.phone" :href="whatsLink(item)" target="_blank" rel="noopener noreferrer" class="small-button">Abrir WhatsApp</a><button class="small-button" :disabled="busy" @click="markReminder(item.id)">Marcar contato</button></div></article></section>
    </template>
    <p v-if="message" class="feedback" role="status">{{message}}</p>
  </div>
</div>
</template>
<script setup>
import {ref,reactive,computed,onBeforeUnmount} from 'vue';
import {compareMeasurements,formatDifference} from '../lib/measurements.js';
import {configured,signIn,signOut,listCustomers,addCustomer,updateCustomer,deleteCustomer,listEquipment,addEquipment,updateEquipment,deleteEquipment,listVisits,addVisit,listReminders,addReminder,completeReminder} from '../lib/gestaoApi.js';
const tabs=['Clientes','Atendimentos','Lembretes'];
const tab=ref('Clientes'),authenticated=ref(false),busy=ref(false),message=ref(''),email=ref(''),password=ref('');
const customers=ref([]),search=ref(''),showCustomerForm=ref(false),editingCustomerId=ref(''),customer=reactive({full_name:'',phone:'',email:'',preferred_contact:'whatsapp',contact_consent:false});
const selectedCustomerId=ref(''),selectedEquipmentId=ref(''),equipments=ref([]),visits=ref([]),reminders=ref([]),showEquipmentForm=ref(false),editingEquipmentId=ref(''),equipment=reactive({label:'',brand:'',model:''});
const nextYear=()=>{const date=new Date();date.setFullYear(date.getFullYear()+1);return date.toISOString().slice(0,10)};
const visit=reactive({service_type:'higienizacao',description:'',next_contact_on:nextYear()});
const measure=reactive({antes:{air_velocity_ms:'',outlet_temperature_c:'',test_conditions:''},depois:{air_velocity_ms:'',outlet_temperature_c:'',test_conditions:''}});
const velocityComparison=computed(()=>compareMeasurements(measure.antes.air_velocity_ms,measure.depois.air_velocity_ms,'m/s'));
const temperatureComparison=computed(()=>compareMeasurements(measure.antes.outlet_temperature_c,measure.depois.outlet_temperature_c,'°C'));
let searchTimer;
onBeforeUnmount(()=>clearTimeout(searchTimer));
const fail=e=>{message.value=e.message||'Ocorreu um erro.'};
const run=async(fn)=>{busy.value=true;message.value='';try{await fn()}catch(e){fail(e)}finally{busy.value=false}};
const refreshCustomers=async()=>{customers.value=await listCustomers(search.value)};
const login=()=>run(async()=>{await signIn(email.value,password.value);try{await Promise.all([refreshCustomers(),refreshReminders()]);authenticated.value=true;password.value=''}catch(error){await signOut();throw error}});
const logout=()=>run(async()=>{await signOut();authenticated.value=false;customers.value=[];equipments.value=[];visits.value=[];reminders.value=[];selectedCustomerId.value='';selectedEquipmentId.value=''});
const debouncedSearch=()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>run(refreshCustomers),300)};
const resetCustomer=()=>{editingCustomerId.value='';Object.assign(customer,{full_name:'',phone:'',email:'',preferred_contact:'whatsapp',contact_consent:false})};
const toggleCustomerForm=()=>{showCustomerForm.value=!showCustomerForm.value;if(!showCustomerForm.value)resetCustomer()};
const editCustomer=item=>{editingCustomerId.value=item.id;Object.assign(customer,{full_name:item.full_name,phone:item.phone||'',email:item.email||'',preferred_contact:item.preferred_contact,contact_consent:item.contact_consent});showCustomerForm.value=true};
const saveCustomer=()=>run(async()=>{
 const phone=customer.phone.replace(/\D/g,'');
 if(phone && (phone.length<10||phone.length>13)) throw new Error('Informe um telefone válido com DDD.');
 const payload={...customer,full_name:customer.full_name.trim(),email:customer.email||null,phone:phone||null};
 if(editingCustomerId.value) await updateCustomer(editingCustomerId.value,payload); else await addCustomer(payload);
 resetCustomer();showCustomerForm.value=false;await refreshCustomers();message.value='Cliente salvo.';
});
const removeCustomer=item=>{
 if(!window.confirm('Excluir '+item.full_name+' e TODOS os equipamentos, atendimentos e lembretes vinculados? Esta ação não pode ser desfeita.'))return;
 run(async()=>{await deleteCustomer(item.id);if(selectedCustomerId.value===item.id){selectedCustomerId.value='';selectedEquipmentId.value='';equipments.value=[];visits.value=[]}await refreshCustomers();await refreshReminders();message.value='Cliente excluído.'});
};
const openCustomer=async(item)=>{selectedCustomerId.value=item.id;tab.value='Atendimentos';await run(loadEquipment)};
const loadEquipment=async()=>{selectedEquipmentId.value='';visits.value=[];equipments.value=selectedCustomerId.value?await listEquipment(selectedCustomerId.value):[]};
const resetEquipment=()=>{editingEquipmentId.value='';Object.assign(equipment,{label:'',brand:'',model:''})};
const toggleEquipmentForm=()=>{if(showEquipmentForm.value){showEquipmentForm.value=false;resetEquipment()}else showEquipmentForm.value=true};
const editEquipment=item=>{editingEquipmentId.value=item.id;Object.assign(equipment,{label:item.label,brand:item.brand||'',model:item.model||''});showEquipmentForm.value=true};
const saveEquipment=()=>run(async()=>{
 const payload={...equipment,customer_id:selectedCustomerId.value,brand:equipment.brand||null,model:equipment.model||null};
 if(editingEquipmentId.value) await updateEquipment(editingEquipmentId.value,payload); else await addEquipment(payload);
 resetEquipment();showEquipmentForm.value=false;await loadEquipment();message.value='Equipamento salvo.';
});
const removeEquipment=item=>{
 if(!window.confirm('Excluir '+item.label+' e TODOS os atendimentos e lembretes vinculados? Esta ação não pode ser desfeita.'))return;
 run(async()=>{await deleteEquipment(item.id);await loadEquipment();await refreshReminders();message.value='Equipamento excluído.'});
};
const loadVisits=async()=>{visits.value=selectedEquipmentId.value?await listVisits(selectedEquipmentId.value):[]};
const saveVisit=()=>run(async()=>{
 const measurements=['antes','depois'].filter(p=>measure[p].air_velocity_ms!==''||measure[p].outlet_temperature_c!=='').map(phase=>({phase,air_velocity_ms:measure[phase].air_velocity_ms===''?null:Number(measure[phase].air_velocity_ms),outlet_temperature_c:measure[phase].outlet_temperature_c===''?null:Number(measure[phase].outlet_temperature_c),test_conditions:measure[phase].test_conditions||null}));
 const next=visit.next_contact_on;
 await addVisit({equipment_id:selectedEquipmentId.value,service_type:visit.service_type,description:visit.description||null,next_contact_on:next||null},measurements);
 Object.assign(visit,{service_type:'higienizacao',description:'',next_contact_on:nextYear()});for(const phase of ['antes','depois'])Object.assign(measure[phase],{air_velocity_ms:'',outlet_temperature_c:'',test_conditions:''});await Promise.all([loadVisits(),refreshReminders()]);message.value='Atendimento, medições e lembrete salvos.';
});
const refreshReminders=async()=>{reminders.value=await listReminders()};
const markReminder=id=>run(async()=>{await completeReminder(id);await refreshReminders();message.value='Contato registrado.'});
const formatDate=value=>value?new Date(value.length===10?value+'T12:00:00':value).toLocaleDateString('pt-BR'):'—';
const whatsLink=item=>'https://wa.me/'+(item.customers.phone||'').replace(/\D/g,'')+'?text='+encodeURIComponent('Olá! Aqui é da Clean Air. Gostaria de conversar sobre uma nova higienização do seu ar-condicionado. Podemos falar?');
</script>
<style scoped>
.gestao{min-height:75vh;background:#edf4f6;padding:54px 20px}.gestao-inner{max-width:1020px;margin:auto}.heading{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:30px}.heading h1{margin:0;color:#103548;font-size:clamp(2rem,5vw,3rem);letter-spacing:-.06em}.heading h1 span{color:#087e9b}.heading p:last-child{color:#667f8a}.panel{padding:28px;background:#fff;border:1px solid #dce8ec;border-radius:16px;margin:0 0 24px}.panel h2{margin:0 0 16px}.login{max-width:440px}.login p,.hint{color:#657c86;line-height:1.6}.panel label{display:flex;flex-direction:column;gap:7px;margin:14px 0;font-weight:700;font-size:.88rem}.panel input,.panel select,.panel textarea{width:100%;padding:12px 13px;border:1px solid #c8dce3;border-radius:8px;font:inherit;background:#fff;color:#17394b}.panel input:focus,.panel select:focus,.panel textarea:focus{outline:2px solid #0784a0;outline-offset:1px}.panel .checkbox{flex-direction:row;align-items:center}.checkbox input{width:auto}.tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}.tabs button,.small-button{border:1px solid #bfd5dd;border-radius:8px;padding:11px 16px;background:#fff;color:#123d50;font:inherit;font-size:.88rem;font-weight:800;cursor:pointer;text-decoration:none}.tabs button.active{background:#10394d;color:#fff}.panel-title{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 20px;padding:15px 0 25px;border-bottom:1px solid #dce8ec}.form-grid .full{grid-column:1/-1}.form-grid button{justify-self:start}.search{max-width:400px}.list-item{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:16px 4px;border:0;border-bottom:1px solid #e2ebee;background:transparent;text-align:left;cursor:pointer;color:#14384b;font:inherit}.equipment-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 0;border-bottom:1px solid #e2ebee}.equipment-row span{flex:1;min-width:160px}.equipment-row small{display:block;color:#68808c}.customer-link{display:flex;align-items:center;justify-content:space-between;gap:14px;flex:1;min-width:0;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer;font:inherit}.list-item .small-button{flex-shrink:0}.danger{color:#9c2828;border-color:#e7c3c3}.list-item small{display:block;margin-top:5px;color:#68808c}.empty{padding:25px 0;color:#748993}.measure-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.measure-grid>div{padding:18px;border:1px solid #dce8ec;border-radius:10px}.measure-grid h4{margin:0 0 15px}.visit-form{margin-top:24px;border-top:1px solid #dce8ec;padding-top:18px}.history,.reminder{padding:18px 0;border-bottom:1px solid #dce8ec}.history p,.reminder p{margin:7px 0;color:#627b85}.reminder{display:flex;align-items:center;justify-content:space-between;gap:20px}.reminder-actions{display:flex;gap:8px;flex-wrap:wrap}.comparison{padding:15px 18px;background:#edf7fa;border:1px solid #c4e4ed;border-radius:10px;margin:20px 0;color:#14394c}.comparison h4{margin:0 0 8px}.comparison p{margin:6px 0}.comparison small{color:#4c6e7b}.notice,.feedback{padding:18px;background:#fff4df;border:1px solid #e8c785;border-radius:10px;color:#654b19}.feedback{margin-top:20px}@media(max-width:650px){.list-item{flex-wrap:wrap}.customer-link{flex-basis:100%}.gestao{padding:35px 16px}.panel{padding:20px}.form-grid,.measure-grid{grid-template-columns:1fr}.heading,.reminder{align-items:flex-start;flex-direction:column}}
</style>