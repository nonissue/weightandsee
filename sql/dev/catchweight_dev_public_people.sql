create table people
(
    id              serial                                 not null
        constraint people_pkey
            primary key,
    created_at      timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at      timestamp(3) default CURRENT_TIMESTAMP not null,
    name            text                                   not null,
    "nickName"      text                                   not null,
    "currentWeight" numeric(65, 30)
);

alter table people
    owner to ops;

create unique index "people.name_unique"
    on people (name);

create unique index "people.nickName_unique"
    on people ("nickName");

INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (9, '2020-10-27 00:31:40.800', '2020-10-27 00:31:40.800', 'Crocfather', 'Crocfather', null);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (14, '2020-10-27 00:32:37.074', '2020-10-27 00:32:37.074', 'Deigs', 'Deigs', null);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (3, '2020-10-25 07:24:30.769', '2020-10-25 07:24:30.769', 'Larry', 'Boich', 200.000000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (8, '2020-10-27 00:31:40.460', '2020-10-27 00:31:40.460', 'Mish', 'Mish', 190.000000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (10, '2020-10-27 00:31:41.085', '2020-10-27 00:31:41.085', 'Sassoon', 'Sassoon', 181.000000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (15, '2020-10-27 01:59:52.690', '2020-10-27 01:59:52.690', 'Professor', 'Professor', 210.000000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (7, '2020-10-27 00:31:40.036', '2020-10-27 00:31:40.036', 'Raisins', 'Raisins', 123.400000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (1, '2020-10-25 07:24:14.026', '2020-10-25 07:24:14.026', 'Roker', 'Roker', 666.000000000000000000000000000000);