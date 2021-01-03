create table users
(
    id         serial                                 not null
        constraint users_pkey
            primary key,
    created_at timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at timestamp(3) default CURRENT_TIMESTAMP not null,
    name       text,
    role       text                                   not null,
    email      text
);

alter table users
    owner to ops;

create unique index "users.email_unique"
    on users (email);

