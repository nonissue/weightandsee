create table weighins
(
    id          serial                                 not null
        constraint weighins_pkey
            primary key,
    created_at  timestamp(3) default CURRENT_TIMESTAMP not null,
    updated_at  timestamp(3) default CURRENT_TIMESTAMP not null,
    "weighDate" timestamp(3)                           not null,
    weight      numeric(65, 30)                        not null,
    "personId"  integer
        constraint "weighins_personId_fkey"
            references people
            on update cascade on delete set null,
    "userId"    integer
        constraint "weighins_userId_fkey"
            references users
            on update cascade on delete set null
);

alter table weighins
    owner to ops;

INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (127, '2020-11-26 03:51:49.531', '2020-11-26 03:51:49.531', '2020-11-26 03:50:06.740', 107.000000000000000000000000000000, null, 27);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (82, '2020-11-08 03:19:14.049', '2020-11-08 03:19:14.049', '2020-11-06 03:19:08.479', 230.000000000000000000000000000000, 1, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (96, '2020-11-08 03:53:12.332', '2020-11-08 03:53:12.332', '2020-10-30 09:35:25.511', 232.400000000000000000000000000000, 1, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (101, '2020-11-09 00:13:44.486', '2020-11-09 00:13:44.486', '2020-11-13 00:13:37.666', 229.400000000000000000000000000000, 1, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (106, '2020-11-11 00:06:44.737', '2020-11-11 00:06:44.737', '2020-10-23 23:06:30.000', 201.200000000000000000000000000000, 1, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (109, '2020-11-15 04:12:40.784', '2020-11-15 04:12:40.784', '2020-11-10 09:35:25.511', 220.400000000000000000000000000000, 1, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (110, '2020-11-15 04:19:16.738', '2020-11-15 04:19:16.738', '2020-11-10 09:35:25.511', 220.400000000000000000000000000000, 1, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (112, '2020-11-15 04:38:15.680', '2020-11-15 04:38:15.680', '2020-11-15 04:37:58.311', 123.400000000000000000000000000000, 7, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (113, '2020-11-15 04:38:45.843', '2020-11-15 04:38:45.843', '2020-11-10 09:35:25.511', 220.400000000000000000000000000000, 1, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (121, '2020-11-26 02:17:09.190', '2020-11-26 02:17:09.190', '2020-11-26 02:15:18.098', 456.000000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (124, '2020-11-26 02:24:28.484', '2020-11-26 02:24:28.484', '2020-11-26 02:24:20.825', 123.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (134, '2020-11-26 22:41:42.460', '2020-11-26 22:41:42.460', '2020-11-26 22:41:30.429', 202.200000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (140, '2020-11-29 11:38:32.622', '2020-11-29 11:38:32.622', '2020-11-29 11:38:19.513', 202.900000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (128, '2020-11-26 03:55:37.315', '2020-11-26 03:55:37.315', '2020-11-26 03:52:31.849', 200.000000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (116, '2020-11-19 01:06:35.421', '2020-11-19 01:06:35.421', '2020-11-19 01:06:25.582', 220.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (117, '2020-11-19 01:07:20.648', '2020-11-19 01:07:20.648', '2020-11-19 01:07:16.050', 220.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (118, '2020-11-23 03:35:23.116', '2020-11-23 03:35:23.116', '2020-11-23 03:35:16.128', 211.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (120, '2020-11-26 02:17:09.190', '2020-11-26 02:17:09.190', '2020-11-26 02:15:18.098', 123.000000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (125, '2020-11-26 02:26:30.232', '2020-11-26 02:26:30.232', '2020-11-26 02:26:22.444', 123.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (126, '2020-11-26 03:36:01.826', '2020-11-26 03:36:01.826', '2020-11-26 03:35:56.672', 200.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (129, '2020-11-26 04:05:14.979', '2020-11-26 04:05:14.979', '2020-11-26 03:58:37.988', 200.000000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (130, '2020-11-26 04:23:37.831', '2020-11-26 04:23:37.832', '2020-11-26 04:22:31.728', 200.000000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (131, '2020-11-26 04:31:26.039', '2020-11-26 04:31:26.039', '2020-11-26 04:23:59.879', 200.000000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (132, '2020-11-26 04:43:52.369', '2020-11-26 04:43:52.369', '2020-11-26 04:43:42.058', 200.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (133, '2020-11-26 22:41:25.059', '2020-11-26 22:41:25.059', '2020-11-26 22:41:20.553', 201.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (135, '2020-11-26 22:41:42.460', '2020-11-26 22:41:42.460', '2020-11-26 22:41:30.429', 203.300000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (136, '2020-11-26 22:54:05.514', '2020-11-26 22:54:05.514', '2020-11-26 22:53:17.634', 201.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (137, '2020-11-26 22:56:32.887', '2020-11-26 22:56:32.887', '2020-11-26 22:55:54.288', 201.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (138, '2020-11-26 23:00:07.298', '2020-11-26 23:00:07.298', '2020-11-26 22:59:57.421', 201.100000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (139, '2020-11-29 11:38:14.083', '2020-11-29 11:38:14.083', '2020-11-29 11:35:26.633', 201.900000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (141, '2020-11-29 11:38:32.622', '2020-11-29 11:38:32.622', '2020-11-29 11:38:19.513', 203.900000000000000000000000000000, null, null);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId", "userId") VALUES (142, '2020-11-29 11:47:11.942', '2020-11-29 11:47:11.942', '2020-11-29 11:47:04.480', 199.900000000000000000000000000000, null, null);