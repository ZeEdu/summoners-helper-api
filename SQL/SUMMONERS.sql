create database SUMMONERS;

use SUMMONERS;

create table USER_PROFILE
(
    USER_ID int primary key auto_increment,
    USER_UID varchar(36) not null COLLATE utf8_bin,
    USERNAME varchar(30) not null unique COLLATE utf8_bin,
    EMAIL varchar(240) not null unique COLLATE utf8_bin,
    JOINED date not null
);

insert into USER_PROFILE (USER_STR_UID, USER_STR_NAME, USER_STR_EMAIL, USER_DATE_JOINED)
values ('H6MwDLEVxnbuSp24q1dEx5dQeAr1', 'eduardo', 'eduardo.carlos.siqueira@gmail.com', curdate());

select * from USER_PROFILE;

select USERNAME from USER_PROFILE where USERNAME = 'EDUARDO';
select USERNAME from USER_PROFILE where USERNAME = 'eduardo';
