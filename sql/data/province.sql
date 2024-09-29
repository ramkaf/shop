
Data Source: @localhost Schema: shop Table: province  
-- auto-generated definition
create table province IF NOT EXISTS
(
    id         int auto_increment
        primary key,
    name       varchar(19) null,
    slug       varchar(17) null,
    tel_prefix varchar(3)  null
)
    collate = utf8mb4_unicode_ci;

INSERT INTO province(id,name,slug,tel_prefix) VALUES (2,'آذربایجان غربی','آذربایجان-غربی','044');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (3,'اردبیل','اردبیل','045');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (4,'اصفهان','اصفهان','031');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (5,'البرز','البرز','026');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (6,'ایلام','ایلام','084');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (7,'بوشهر','بوشهر','077');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (8,'تهران','تهران','021');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (9,'چهارمحال و بختیاری','چهارمحال-بختیاری','038');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (10,'خراسان جنوبی','خراسان-جنوبی','056');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (11,'خراسان رضوی','خراسان-رضوی','051');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (12,'خراسان شمالی','خراسان-شمالی','058');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (13,'خوزستان','خوزستان','061');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (14,'زنجان','زنجان','024');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (15,'سمنان','سمنان','023');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (16,'سیستان و بلوچستان','سیستان-بلوچستان','054');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (17,'فارس','فارس','071');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (18,'قزوین','قزوین','028');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (19,'قم','قم','025');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (20,'کردستان','کردستان','087');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (21,'کرمان','کرمان','034');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (22,'کرمانشاه','کرمانشاه','083');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (23,'کهگیلویه و بویراحمد','کهگیلویه-بویراحمد','074');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (24,'گلستان','گلستان','017');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (25,'لرستان','لرستان','066');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (26,'گیلان','گیلان','013');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (27,'مازندران','مازندران','011');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (28,'مرکزی','مرکزی','086');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (29,'هرمزگان','هرمزگان','076');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (30,'همدان','همدان','081');
INSERT INTO province(id,name,slug,tel_prefix) VALUES (31,'یزد','یزد','035');

