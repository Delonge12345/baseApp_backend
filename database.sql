--authUsers
create table authusers(
  user_id serial primary key,
  email varchar(255) unique not null,
  password varchar(255) not null,
  isActivated BOOLEAN DEFAULT FALSE,
  activationLink varchar(255),
  username varchar(255),
  created_at date default current_date,
  phone varchar(255) not null,
  avatar varchar(255)
);

--token
create table authtokens(
  user_id serial primary key,
  refreshToken varchar(255) not null,
  created_at date default current_date
);
