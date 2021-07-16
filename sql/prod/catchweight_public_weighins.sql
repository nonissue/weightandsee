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
            on update cascade on delete set null
);

alter table weighins
    owner to ops;

INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (6, '2020-11-03 22:26:24.214', '2020-11-03 22:26:24.214', '2020-11-03 22:25:53.465', 170.000000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (7, '2020-11-03 22:26:24.214', '2020-11-03 22:26:24.214', '2020-11-03 22:25:53.465', 249.000000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (8, '2020-11-03 22:26:24.214', '2020-11-03 22:26:24.214', '2020-11-03 22:25:53.465', 233.000000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (9, '2020-11-03 22:26:49.441', '2020-11-03 22:26:49.441', '2020-11-03 22:26:32.941', 232.000000000000000000000000000000, 8);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (10, '2020-11-03 23:19:46.691', '2020-11-03 23:19:46.691', '2020-11-03 23:19:36.993', 185.000000000000000000000000000000, 4);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (11, '2020-11-04 20:02:58.790', '2020-11-04 20:02:58.790', '2020-11-04 20:02:47.423', 215.000000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (12, '2020-11-07 23:59:00.195', '2020-11-07 23:59:00.195', '2020-11-07 23:58:49.812', 237.000000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (13, '2020-11-07 23:59:21.211', '2020-11-07 23:59:21.211', '2020-11-07 23:59:05.989', 234.000000000000000000000000000000, 8);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (14, '2020-11-08 00:57:41.672', '2020-11-08 00:57:41.672', '2020-11-08 00:57:27.136', 215.000000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (19, '2020-11-10 21:59:58.815', '2020-11-10 21:59:58.815', '2020-11-10 21:59:45.095', 238.000000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (20, '2020-11-12 15:35:42.058', '2020-11-12 15:35:42.059', '2020-11-12 15:35:30.003', 172.000000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (21, '2020-11-13 12:58:19.135', '2020-11-13 12:58:19.135', '2020-11-06 12:57:58.000', 245.000000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (22, '2020-11-13 12:58:19.970', '2020-11-13 12:58:19.970', '2020-11-06 12:57:58.000', 245.000000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (23, '2020-11-13 12:59:09.747', '2020-11-13 12:59:09.747', '2020-11-13 12:58:58.835', 246.000000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (24, '2020-11-13 13:00:42.824', '2020-11-13 13:00:42.824', '2020-11-13 13:00:29.877', 215.200000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (25, '2020-11-14 19:09:11.568', '2020-11-14 19:09:11.568', '2020-11-14 19:08:53.164', 231.400000000000000000000000000000, 8);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (26, '2020-11-14 19:10:46.131', '2020-11-14 19:10:46.131', '2020-11-14 19:10:28.541', 188.600000000000000000000000000000, 5);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (27, '2020-11-14 19:11:08.172', '2020-11-14 19:11:08.172', '2020-11-14 19:10:58.200', 246.000000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (28, '2020-11-14 19:11:37.069', '2020-11-14 19:11:37.069', '2020-11-14 19:11:26.334', 215.200000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (29, '2020-11-14 19:12:29.947', '2020-11-14 19:12:29.947', '2020-11-14 19:12:22.529', 195.200000000000000000000000000000, 3);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (30, '2020-11-14 19:13:00.621', '2020-11-14 19:13:00.621', '2020-11-14 19:12:48.042', 182.000000000000000000000000000000, 4);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (31, '2020-11-14 20:50:30.814', '2020-11-14 20:50:30.814', '2020-11-14 20:46:08.779', 170.400000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (32, '2020-11-15 16:49:08.673', '2020-11-15 16:49:08.673', '2020-11-14 16:48:55.000', 239.200000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (33, '2020-11-21 15:12:04.426', '2020-11-21 15:12:04.426', '2020-11-20 15:11:37.000', 238.000000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (34, '2020-11-21 15:12:04.426', '2020-11-21 15:12:04.426', '2020-11-20 15:11:37.000', 171.600000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (35, '2020-11-21 15:17:27.055', '2020-11-21 15:17:27.055', '2020-11-20 15:17:07.000', 245.000000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (37, '2020-11-21 15:26:45.711', '2020-11-21 15:26:45.711', '2020-11-20 15:26:34.000', 196.400000000000000000000000000000, 3);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (38, '2020-11-21 15:28:38.253', '2020-11-21 15:28:38.253', '2020-11-20 15:28:17.000', 214.700000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (39, '2020-11-27 12:51:26.086', '2020-11-27 12:51:26.086', '2020-11-20 12:50:46.000', 187.400000000000000000000000000000, 5);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (40, '2020-11-27 12:52:01.926', '2020-11-27 12:52:01.926', '2020-11-27 12:51:34.899', 186.400000000000000000000000000000, 5);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (41, '2020-11-27 12:52:37.450', '2020-11-27 12:52:37.450', '2020-11-27 12:52:18.127', 230.400000000000000000000000000000, 8);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (42, '2020-11-27 13:10:02.356', '2020-11-27 13:10:02.356', '2020-11-27 13:09:48.952', 246.500000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (43, '2020-11-27 15:21:17.141', '2020-11-27 15:21:17.141', '2020-11-27 15:21:02.461', 213.800000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (44, '2020-11-27 15:21:18.554', '2020-11-27 15:21:18.554', '2020-11-27 15:21:02.461', 213.800000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (45, '2020-11-30 14:48:05.950', '2020-11-30 14:48:05.950', '2020-11-27 14:47:35.000', 173.600000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (46, '2020-11-30 14:48:06.866', '2020-11-30 14:48:06.866', '2020-11-27 14:47:35.000', 173.600000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (47, '2020-12-03 03:30:47.203', '2020-12-03 03:30:47.203', '2020-11-28 03:30:33.000', 240.200000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (48, '2020-12-03 05:59:12.909', '2020-12-03 05:59:12.909', '2020-11-28 05:58:59.000', 201.000000000000000000000000000000, 3);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (49, '2020-12-04 14:18:54.541', '2020-12-04 14:18:54.541', '2020-12-04 14:18:41.333', 229.400000000000000000000000000000, 8);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (50, '2020-12-04 14:19:24.981', '2020-12-04 14:19:24.981', '2020-12-04 14:19:15.438', 244.500000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (51, '2020-12-04 14:19:59.365', '2020-12-04 14:19:59.365', '2020-12-04 14:19:48.927', 186.800000000000000000000000000000, 5);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (52, '2020-12-04 15:21:03.583', '2020-12-04 15:21:03.583', '2020-12-04 15:20:52.949', 173.000000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (53, '2020-12-04 15:21:05.271', '2020-12-04 15:21:05.271', '2020-12-04 15:20:52.949', 173.000000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (54, '2020-12-04 15:25:19.177', '2020-12-04 15:25:19.177', '2020-12-04 15:25:11.215', 239.400000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (55, '2020-12-04 16:16:50.176', '2020-12-04 16:16:50.176', '2020-12-04 16:16:41.173', 197.000000000000000000000000000000, 3);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (56, '2020-12-04 23:39:24.898', '2020-12-04 23:39:24.898', '2020-12-04 23:39:11.338', 212.800000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (57, '2020-12-11 11:46:06.193', '2020-12-11 11:46:06.193', '2020-12-11 11:45:53.041', 185.000000000000000000000000000000, 5);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (58, '2020-12-11 12:31:45.339', '2020-12-11 12:31:45.339', '2020-12-11 12:31:32.400', 211.900000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (59, '2020-12-11 14:13:01.477', '2020-12-11 14:13:01.477', '2020-12-11 14:12:41.591', 244.200000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (60, '2020-12-11 17:38:25.491', '2020-12-11 17:38:25.491', '2020-12-11 17:38:12.083', 237.200000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (61, '2020-12-11 17:38:25.971', '2020-12-11 17:38:25.971', '2020-12-11 17:38:12.083', 237.200000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (62, '2020-12-12 14:48:58.724', '2020-12-12 14:48:58.724', '2020-12-11 14:48:43.000', 172.400000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (63, '2020-12-18 10:37:11.637', '2020-12-18 10:37:11.637', '2020-12-18 10:36:58.183', 230.800000000000000000000000000000, 8);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (64, '2020-12-18 11:31:52.855', '2020-12-18 11:31:52.855', '2020-12-18 11:31:31.597', 184.600000000000000000000000000000, 5);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (65, '2020-12-18 11:31:54.223', '2020-12-18 11:31:54.223', '2020-12-18 11:31:31.597', 184.600000000000000000000000000000, 5);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (66, '2020-12-18 11:58:11.219', '2020-12-18 11:58:11.219', '2020-12-18 11:57:58.355', 210.300000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (67, '2020-12-18 18:12:25.762', '2020-12-18 18:12:25.762', '2020-12-18 18:12:04.721', 237.600000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (68, '2020-12-18 18:12:25.762', '2020-12-18 18:12:25.762', '2020-12-18 18:12:04.721', 202.200000000000000000000000000000, 3);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (69, '2020-12-18 18:12:51.707', '2020-12-18 18:12:51.707', '2020-12-18 18:12:44.953', 246.600000000000000000000000000000, 6);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (70, '2020-12-18 18:13:31.266', '2020-12-18 18:13:31.266', '2020-12-18 18:13:08.397', 184.600000000000000000000000000000, 5);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (71, '2020-12-18 18:13:31.266', '2020-12-18 18:13:31.266', '2020-12-18 18:13:08.397', 179.500000000000000000000000000000, 4);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (72, '2020-12-25 17:09:18.583', '2020-12-25 17:09:18.583', '2020-12-25 17:09:05.371', 214.200000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (73, '2020-12-25 17:09:20.218', '2020-12-25 17:09:20.218', '2020-12-25 17:09:05.371', 214.200000000000000000000000000000, 2);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (74, '2021-01-01 19:12:53.103', '2021-01-01 19:12:53.103', '2021-01-01 19:12:34.603', 242.200000000000000000000000000000, 1);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (75, '2021-01-01 22:00:48.030', '2021-01-01 22:00:48.030', '2021-01-01 22:00:32.726', 179.000000000000000000000000000000, 7);
INSERT INTO public.weighins (id, created_at, updated_at, "weighDate", weight, "personId") VALUES (76, '2021-01-01 22:00:49.288', '2021-01-01 22:00:49.288', '2021-01-01 22:00:32.726', 179.000000000000000000000000000000, 7);