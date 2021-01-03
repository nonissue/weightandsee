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

INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (3, '2020-11-03 21:10:35.715', '2020-11-03 21:10:35.715', 'Mish', 'Mish', 202.200000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (6, '2020-11-03 21:10:43.085', '2020-11-03 21:10:43.085', 'Diegs', 'Diegs', 246.600000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (5, '2020-11-03 21:10:36.292', '2020-11-03 21:10:36.292', 'Professor', 'Professor', 184.600000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (4, '2020-11-03 21:10:36.002', '2020-11-03 21:10:36.002', 'Sassoon', 'Sassoon', 179.500000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (2, '2020-11-03 21:10:14.224', '2020-11-03 21:10:14.224', 'Larry', 'Boitch', 214.200000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (1, '2020-11-03 21:10:08.329', '2020-11-03 21:10:08.330', 'Roker', 'Roker', 242.200000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (7, '2020-11-03 21:10:51.291', '2020-11-03 21:10:51.291', 'Raisin', 'Raisin', 179.000000000000000000000000000000);
INSERT INTO public.people (id, created_at, updated_at, name, "nickName", "currentWeight") VALUES (8, '2020-11-03 21:14:55.901', '2020-11-03 21:14:55.901', 'CrocFather', 'Crocfather', 230.800000000000000000000000000000);


-- modified inserts for new table structure
INSERT INTO public.users (id, created_at, updated_at, name, email, email_verified, role, password, "currentWeight", "startWeight", "nickName") VALUES (27, '2021-01-03 22:11:24.620', '2021-01-03 22:11:24.620', 'Andy', 'andy@nonissue.org', null, 'ADMIN', '$2a$10$cuZgeuehjQDjnpYs4AKhM.PaEmr7A1yaSpq7Wf6iQ/34S6CmCu7Wm', null, null, null);
INSERT INTO public.users (id, created_at, updated_at, name, email, email_verified, role, password, "currentWeight", "startWeight", "nickName") VALUES (3, '2020-11-03 21:10:35.715', '2020-11-03 21:10:35.715', 'Mish', 'me_mission@me.com', null, 'USER', '$2a$10$6ftBNW.xLvoqB3.wp9rqAOpdzDPJYKDQz9qXbgQopZPBAUVO3o942', 202.200000000000000000000000000000, null, 'Mish');
INSERT INTO public.users (id, created_at, updated_at, name, email, email_verified, role, password, "currentWeight", "startWeight", "nickName") VALUES (1, '2020-11-03 21:10:35.715', '2020-11-03 21:10:35.715', 'Roker', 'findalwilliams@gmail.com', null, 'ADMIN', '$2a$10$6ftBNW.xLvoqB3.wp9rqAOpdzDPJYKDQz9qXbgQopZPBAUVO3o942', 242.200000000000000000000000000000, null, 'Roker');
