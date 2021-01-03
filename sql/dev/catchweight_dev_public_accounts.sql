create table accounts
(
    id                   serial                                 not null
        constraint accounts_pkey
            primary key,
    compound_id          text                                   not null,
    user_id              integer                                not null,
    provider_type        text                                   not null,
    provider_id          text                                   not null,
    provider_account_id  text                                   not null,
    refresh_token        text,
    access_token         text,
    access_token_expires timestamp(3),
    created_at           timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at           timestamp(3) default CURRENT_TIMESTAMP not null
);

alter table accounts
    owner to ops;

create unique index "accounts.compound_id_unique"
    on accounts (compound_id);

create index "providerAccountId"
    on accounts (provider_account_id);

create index "providerId"
    on accounts (provider_id);

create index "userId"
    on accounts (user_id);

