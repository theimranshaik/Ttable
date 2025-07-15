create table contacts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  created_at timestamptz default now()
);