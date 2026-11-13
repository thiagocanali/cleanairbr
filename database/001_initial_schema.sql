-- Clean Air Gestão: esquema inicial para projeto Supabase EXCLUSIVO.
-- Não aplicar em outro projeto. Revisar e testar RLS antes de usar dados reais.
create extension if not exists pgcrypto;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (length(trim(full_name)) > 0),
  phone text,
  email text,
  address text,
  preferred_contact text not null default 'whatsapp'
    check (preferred_contact in ('whatsapp','phone','email','none')),
  contact_consent boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.equipment (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  label text not null,
  equipment_type text,
  brand text,
  model text,
  capacity_btu integer check (capacity_btu is null or capacity_btu > 0),
  notes text,
  created_at timestamptz not null default now(),
  unique (id, customer_id)
);

create table public.service_visits (
  id uuid primary key default gen_random_uuid(),
  equipment_id uuid not null references public.equipment(id) on delete cascade,
  performed_at timestamptz not null default now(),
  service_type text not null default 'higienizacao',
  description text,
  technical_notes text,
  status text not null default 'concluido' check (status in ('agendado','em_andamento','concluido','cancelado')),
  next_contact_on date,
  created_at timestamptz not null default now(),
  unique (id, equipment_id)
);

create table public.measurements (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid not null references public.service_visits(id) on delete cascade,
  phase text not null check (phase in ('antes','depois')),
  air_velocity_ms numeric(9,3) check (air_velocity_ms is null or air_velocity_ms >= 0),
  outlet_temperature_c numeric(7,2),
  test_conditions text,
  instrument text,
  notes text,
  created_at timestamptz not null default now(),
  unique (visit_id, phase)
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  equipment_id uuid not null,
  visit_id uuid,
  due_on date not null,
  status text not null default 'pendente' check (status in ('pendente','concluido','dispensado')),
  contacted_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  foreign key (equipment_id, customer_id) references public.equipment(id, customer_id) on delete cascade,
  foreign key (visit_id, equipment_id) references public.service_visits(id, equipment_id) on delete cascade
);

create index equipment_customer_idx on public.equipment(customer_id);
create index visits_equipment_date_idx on public.service_visits(equipment_id, performed_at desc);
create index reminders_due_idx on public.reminders(status, due_on);
create index reminders_customer_idx on public.reminders(customer_id);

alter table public.admin_users enable row level security;
alter table public.customers enable row level security;
alter table public.equipment enable row level security;
alter table public.service_visits enable row level security;
alter table public.measurements enable row level security;
alter table public.reminders enable row level security;

-- admin_users: usuários autenticados só podem consultar seu próprio registro.
-- Não existe policy de escrita: provisionamento apenas via operação administrativa confiável.
create policy "admin_self_read" on public.admin_users
  for select to authenticated using (user_id = (select auth.uid()));

-- Acesso a dados operacionais restrito a contas explicitamente aprovadas.
-- A tabela admin_users não permite autoinscrição via API.
grant select on public.admin_users to authenticated;
grant select, insert, update, delete on public.customers, public.equipment,
  public.service_visits, public.measurements, public.reminders to authenticated;
revoke all on public.admin_users, public.customers, public.equipment,
  public.service_visits, public.measurements, public.reminders from anon;
grant select on public.admin_users to authenticated;

create policy "customers_admin_all" on public.customers for all to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy "equipment_admin_all" on public.equipment for all to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy "visits_admin_all" on public.service_visits for all to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy "measurements_admin_all" on public.measurements for all to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy "reminders_admin_all" on public.reminders for all to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

-- Bootstrap manual (somente no SQL Editor do projeto correto, após criar conta no Auth):
-- insert into public.admin_users(user_id) values ('UUID-DO-USUARIO-AUTORIZADO');
-- Nunca executar com UUID fictício nem inserir usuário por meio do frontend.
