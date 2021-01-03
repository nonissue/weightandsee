create table users
(
    id              serial                                 not null
        constraint users_pkey
            primary key,
    created_at      timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at      timestamp(3) default CURRENT_TIMESTAMP not null,
    name            text                                   not null,
    email           text,
    email_verified  timestamp(3),
    role            "Role"       default 'USER'::"Role"    not null,
    password        text,
    "currentWeight" numeric(65, 30),
    "startWeight"   numeric(65, 30),
    "nickName"      text
);

alter table users
    owner to ops;

create unique index "users.email_unique"
    on users (email);

create unique index "users.name_unique"
    on users (name);

create unique index "users.nickName_unique"
    on users ("nickName");

INSERT INTO public.users (id, created_at, updated_at, name, email, email_verified, role, password, "currentWeight", "startWeight", "nickName") VALUES (27, '2021-01-03 22:11:24.620', '2021-01-03 22:11:24.620', 'Andy', 'andy@nonissue.org', null, 'ADMIN', '$2a$10$cuZgeuehjQDjnpYs4AKhM.PaEmr7A1yaSpq7Wf6iQ/34S6CmCu7Wm', null, null, null);