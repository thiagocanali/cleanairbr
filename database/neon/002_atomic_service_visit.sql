-- Neon: atomic visit creation, invoked only by authenticated server-side API.
-- Never expose this function through an unauthenticated HTTP endpoint.
create or replace function public.create_service_visit(
  p_equipment_id uuid,
  p_service_type text,
  p_description text,
  p_next_contact_on date,
  p_measurements jsonb default '[]'::jsonb
) returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_visit_id uuid;
  v_customer_id uuid;
  v_measure jsonb;
  v_phase text;
  v_seen_phases text[] := array[]::text[];
begin
  if p_service_type is null or p_service_type not in ('higienizacao','manutencao','outro') then
    raise exception 'Tipo de serviço inválido' using errcode = '22023';
  end if;
  if p_measurements is null or jsonb_typeof(p_measurements) is distinct from 'array'
     or jsonb_array_length(p_measurements) > 2 then
    raise exception 'Informe até duas medições' using errcode = '22023';
  end if;
  select customer_id into v_customer_id from public.equipment where id = p_equipment_id;
  if v_customer_id is null then
    raise exception 'Equipamento não encontrado' using errcode = '22023';
  end if;
  insert into public.service_visits(equipment_id,service_type,description,next_contact_on)
  values(p_equipment_id,p_service_type,nullif(trim(p_description),''),p_next_contact_on)
  returning id into v_visit_id;
  for v_measure in select value from jsonb_array_elements(p_measurements)
  loop
    v_phase := v_measure->>'phase';
    if v_phase is null or v_phase not in ('antes','depois') then
      raise exception 'Fase da medição inválida' using errcode = '22023';
    end if;
    if v_phase = any(v_seen_phases) then
      raise exception 'Medição duplicada para a mesma fase' using errcode = '22023';
    end if;
    v_seen_phases := array_append(v_seen_phases,v_phase);
    insert into public.measurements(visit_id,phase,air_velocity_ms,outlet_temperature_c,test_conditions)
    values(v_visit_id,v_phase,nullif(v_measure->>'air_velocity_ms','')::numeric,
           nullif(v_measure->>'outlet_temperature_c','')::numeric,
           nullif(v_measure->>'test_conditions',''));
  end loop;
  if p_next_contact_on is not null then
    insert into public.reminders(customer_id,equipment_id,visit_id,due_on)
    values(v_customer_id,p_equipment_id,v_visit_id,p_next_contact_on);
  end if;
  return v_visit_id;
end;
$$;
revoke all on function public.create_service_visit(uuid,text,text,date,jsonb) from public;
