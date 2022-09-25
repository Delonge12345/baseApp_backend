-- users table
create table users(
  user_id serial primary key,
  email varchar(255) unique not null,
  password varchar(255) not null,
  created_at date default current_date
);



--authUsers
create table authUsers(
  user_id serial primary key,
  email varchar(255) unique not null,
  password varchar(255) not null,
  isActivated BOOLEAN DEFAULT FALSE,
  activationLink varchar(255) STRING,
  created_at date default current_date
  phone varchar(255) not null,
  avatar varchar(255),
);


--token
create table authTokens(
  user_id serial primary key,
  refreshToken string not null
  created_at date default current_date
);
