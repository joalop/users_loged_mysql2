drop database if exists users;
create database users charset utf8mb4;
use users;

create table usuarios( id int primary key auto_increment, name varchar(40), email varchar(100), passwd varchar(100) );

insert into user (id, name, email, passwd)
values (null,'joan','joan1998bocairent@gmail.com','$2b$10$LPTgAMDpKFitn96QSgRZXOj7ExL8nkrjh53uds/fZFKcbPboTtEba');