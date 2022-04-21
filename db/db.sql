-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2
-- PostgreSQL version: 12.0
-- Project Site: pgmodeler.io
-- Model Author: ---


-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: postgres | type: DATABASE --
-- -- DROP DATABASE IF EXISTS postgres;
-- CREATE DATABASE postgres
-- 	ENCODING = 'UTF8'
-- 	LC_COLLATE = 'Russian_Russia.1251'
-- 	LC_CTYPE = 'Russian_Russia.1251'
-- 	TABLESPACE = pg_default
-- 	OWNER = postgres;
-- -- ddl-end --
-- COMMENT ON DATABASE postgres IS 'default administrative connection database';
-- -- ddl-end --
-- 

-- object: tm | type: SCHEMA --
-- DROP SCHEMA IF EXISTS tm CASCADE;
CREATE SCHEMA tm;
-- ddl-end --
-- ALTER SCHEMA tm OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,tm;
-- ddl-end --

-- object: adminpack | type: EXTENSION --
-- DROP EXTENSION IF EXISTS adminpack CASCADE;
CREATE EXTENSION adminpack
WITH SCHEMA pg_catalog
VERSION '2.1';
-- ddl-end --
COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
-- ddl-end --

-- object: tm.article_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tm.article_id_seq CASCADE;
CREATE SEQUENCE tm.article_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE tm.article_id_seq OWNER TO postgres;
-- ddl-end --

-- object: tm.article | type: TABLE --
-- DROP TABLE IF EXISTS tm.article CASCADE;
CREATE TABLE tm.article (
	id integer NOT NULL DEFAULT nextval('tm.article_id_seq'::regclass),
	title character varying,
	text text,
	article_type_id integer,
	CONSTRAINT article_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE tm.article OWNER TO postgres;
-- ddl-end --

-- object: tm.tm_result_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tm.tm_result_id_seq CASCADE;
CREATE SEQUENCE tm.tm_result_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE tm.tm_result_id_seq OWNER TO postgres;
-- ddl-end --

-- object: tm.tm_result | type: TABLE --
-- DROP TABLE IF EXISTS tm.tm_result CASCADE;
CREATE TABLE tm.tm_result (
	id integer NOT NULL DEFAULT nextval('tm.tm_result_id_seq'::regclass),
	article_id integer NOT NULL,
	topic character varying NOT NULL,
	CONSTRAINT tm_result_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE tm.tm_result OWNER TO postgres;
-- ddl-end --

-- object: tm.clean_article_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tm.clean_article_id_seq CASCADE;
CREATE SEQUENCE tm.clean_article_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE tm.clean_article_id_seq OWNER TO postgres;
-- ddl-end --

-- object: tm.clean_article | type: TABLE --
-- DROP TABLE IF EXISTS tm.clean_article CASCADE;
CREATE TABLE tm.clean_article (
	id integer NOT NULL DEFAULT nextval('tm.clean_article_id_seq'::regclass),
	article_id integer,
	text text,
	CONSTRAINT clean_article_pk PRIMARY KEY (id),
	CONSTRAINT clean_article_un UNIQUE (article_id)

);
-- ddl-end --
-- ALTER TABLE tm.clean_article OWNER TO postgres;
-- ddl-end --

-- object: tm.article_type | type: TABLE --
-- DROP TABLE IF EXISTS tm.article_type CASCADE;
CREATE TABLE tm.article_type (
	id smallint NOT NULL,
	name character varying NOT NULL,
	CONSTRAINT article_type_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE tm.article_type OWNER TO postgres;
-- ddl-end --

-- object: tm_result_article_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS tm.tm_result_article_id_idx CASCADE;
CREATE UNIQUE INDEX tm_result_article_id_idx ON tm.tm_result
	USING btree
	(
	  article_id,
	  topic
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: tm.monitoring_status | type: TABLE --
-- DROP TABLE IF EXISTS tm.monitoring_status CASCADE;
CREATE TABLE tm.monitoring_status (
	id integer NOT NULL,
	name character varying,
	CONSTRAINT monitoring_status_pk PRIMARY KEY (id),
	CONSTRAINT monitoring_status_un UNIQUE (id,name)

);
-- ddl-end --
-- ALTER TABLE tm.monitoring_status OWNER TO postgres;
-- ddl-end --

-- object: tm.monitoring_result_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tm.monitoring_result_id_seq CASCADE;
CREATE SEQUENCE tm.monitoring_result_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE tm.monitoring_result_id_seq OWNER TO postgres;
-- ddl-end --

-- object: tm.monitoring | type: TABLE --
-- DROP TABLE IF EXISTS tm.monitoring CASCADE;
CREATE TABLE tm.monitoring (
	id integer NOT NULL DEFAULT nextval('tm.monitoring_result_id_seq'::regclass),
	status_id integer,
	topic character varying,
	CONSTRAINT monitoring_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE tm.monitoring OWNER TO postgres;
-- ddl-end --

-- object: tm.monitoring_result_id_seq1 | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tm.monitoring_result_id_seq1 CASCADE;
CREATE SEQUENCE tm.monitoring_result_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;
-- ddl-end --
-- ALTER SEQUENCE tm.monitoring_result_id_seq1 OWNER TO postgres;
-- ddl-end --

-- object: tm.monitoring_result | type: TABLE --
-- DROP TABLE IF EXISTS tm.monitoring_result CASCADE;
CREATE TABLE tm.monitoring_result (
	id integer NOT NULL DEFAULT nextval('tm.monitoring_result_id_seq1'::regclass),
	monitoring_id integer,
	article_id integer,
	CONSTRAINT monitoring_result_pk PRIMARY KEY (id)

);
-- ddl-end --
-- ALTER TABLE tm.monitoring_result OWNER TO postgres;
-- ddl-end --

-- object: article_fk | type: CONSTRAINT --
-- ALTER TABLE tm.article DROP CONSTRAINT IF EXISTS article_fk CASCADE;
ALTER TABLE tm.article ADD CONSTRAINT article_fk FOREIGN KEY (article_type_id)
REFERENCES tm.article_type (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: article_fk | type: CONSTRAINT --
-- ALTER TABLE tm.tm_result DROP CONSTRAINT IF EXISTS article_fk CASCADE;
ALTER TABLE tm.tm_result ADD CONSTRAINT article_fk FOREIGN KEY (article_id)
REFERENCES tm.article (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: cleand_text_fk | type: CONSTRAINT --
-- ALTER TABLE tm.clean_article DROP CONSTRAINT IF EXISTS cleand_text_fk CASCADE;
ALTER TABLE tm.clean_article ADD CONSTRAINT cleand_text_fk FOREIGN KEY (article_id)
REFERENCES tm.article (id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: monitoring_status_fk | type: CONSTRAINT --
-- ALTER TABLE tm.monitoring DROP CONSTRAINT IF EXISTS monitoring_status_fk CASCADE;
ALTER TABLE tm.monitoring ADD CONSTRAINT monitoring_status_fk FOREIGN KEY (status_id)
REFERENCES tm.monitoring_status (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: monitoring_result_article_fk | type: CONSTRAINT --
-- ALTER TABLE tm.monitoring_result DROP CONSTRAINT IF EXISTS monitoring_result_article_fk CASCADE;
ALTER TABLE tm.monitoring_result ADD CONSTRAINT monitoring_result_article_fk FOREIGN KEY (article_id)
REFERENCES tm.article (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: monitoring_result_fk | type: CONSTRAINT --
-- ALTER TABLE tm.monitoring_result DROP CONSTRAINT IF EXISTS monitoring_result_fk CASCADE;
ALTER TABLE tm.monitoring_result ADD CONSTRAINT monitoring_result_fk FOREIGN KEY (monitoring_id)
REFERENCES tm.monitoring (id) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


