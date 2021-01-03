create table verification_requests
(
    id         serial                                 not null
        constraint verification_requests_pkey
            primary key,
    identifier text                                   not null,
    token      text                                   not null,
    expires    timestamp(3)                           not null,
    created_at timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at timestamp(3) default CURRENT_TIMESTAMP not null
);

alter table verification_requests
    owner to ops;

create unique index "verification_requests.token_unique"
    on verification_requests (token);

INSERT INTO public.verification_requests (id, identifier, token, expires, created_at, updated_at) VALUES (5, '@@', 'feb79ef5877c874eeb4ac0fd5b3429d4052d54ccab497ad632ee53986f55e3b8', '2020-11-17 02:37:08.984', '2020-11-16 02:37:08.985', '2020-11-16 02:37:08.985');
INSERT INTO public.verification_requests (id, identifier, token, expires, created_at, updated_at) VALUES (6, '@@', '3c7c5e3c45c23a6b228c95249f76c79302b298a883994423092e31a145af9deb', '2020-11-17 02:38:48.009', '2020-11-16 02:38:48.011', '2020-11-16 02:38:48.011');
INSERT INTO public.verification_requests (id, identifier, token, expires, created_at, updated_at) VALUES (10, 'andy@nonissue.org ', '90d5bbfb2325d7b8d9998e217a2055c9e83603ba227f2486543927be7651ab9a', '2020-11-17 03:15:08.846', '2020-11-16 03:15:08.848', '2020-11-16 03:15:08.848');
INSERT INTO public.verification_requests (id, identifier, token, expires, created_at, updated_at) VALUES (18, 'andy@nonissue.org', 'd57a3d6d59a72675ef112b10a6961d7cc4a2c232586d5ca82d74f55501795b4e', '2020-11-26 00:25:43.414', '2020-11-25 00:25:43.416', '2020-11-25 00:25:43.416');