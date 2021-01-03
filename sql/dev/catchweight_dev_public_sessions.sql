create table sessions
(
    id            serial                                 not null
        constraint sessions_pkey
            primary key,
    user_id       integer                                not null,
    expires       timestamp(3)                           not null,
    session_token text                                   not null,
    access_token  text                                   not null,
    created_at    timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at    timestamp(3) default CURRENT_TIMESTAMP not null
);

alter table sessions
    owner to ops;

create unique index "sessions.session_token_unique"
    on sessions (session_token);

create unique index "sessions.access_token_unique"
    on sessions (access_token);

