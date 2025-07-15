-- Enable uuid extension (only needs to be done once per project)
create extension if not exists "uuid-ossp";

-- Create contacts table
create table if not exists contacts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  created_at timestamptz default now()
);
