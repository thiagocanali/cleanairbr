-- Clean Air Gestão / Neon PostgreSQL 17.
-- Banco privado: NUNCA expor DATABASE_URL ao navegador.
-- A API deve validar sessão e papel admin em toda operação.
create extension if not exists pgcrypto;
create table if not exists public.app_users (
 id uuid primary key default gen_random_uuid(),
 email text not null unique,
 name text,
 role text not null default 'admin' check (role in ('admin')),
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
  label text not null check (length(trim(label)) > 0),
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
  service_type text not null default 'higienizacao' check (service_type in ('higienizacao','manutencao','outro')),
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

-- As tabelas são acessadas exclusivamente pelo backend autenticado.
-- Não criar API REST pública nem conceder permissões a papéis anônimos.
revoke all on public.app_users, public.customers, public.equipment,
 public.service_visits, public.measurements, public.reminders from public;
