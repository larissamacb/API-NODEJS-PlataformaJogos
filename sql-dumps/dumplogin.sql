--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: foto_perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foto_perfil (
    id integer NOT NULL,
    url text NOT NULL,
    tipo character varying(10),
    CONSTRAINT foto_perfil_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['original'::character varying, 'adicionada'::character varying])::text[])))
);


ALTER TABLE public.foto_perfil OWNER TO postgres;

--
-- Name: foto_perfil_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foto_perfil_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foto_perfil_id_seq OWNER TO postgres;

--
-- Name: foto_perfil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foto_perfil_id_seq OWNED BY public.foto_perfil.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nome character varying(40) NOT NULL,
    identificador character varying(16) NOT NULL,
    senha character varying(255) NOT NULL,
    email character varying(70) NOT NULL,
    data_nascimento date NOT NULL,
    id_plano integer NOT NULL,
    id_foto_perfil integer
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: foto_perfil id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto_perfil ALTER COLUMN id SET DEFAULT nextval('public.foto_perfil_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Data for Name: foto_perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foto_perfil (id, url, tipo) FROM stdin;
1	https://example.com/foto1.jpg	original
2	https://example.com/foto2.jpg	adicionada
3	https://example.com/foto3.jpg	adicionada
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nome, identificador, senha, email, data_nascimento, id_plano, id_foto_perfil) FROM stdin;
1	Carlos Silva	carlos123	senha123	carlos@example.com	1995-06-15	1	1
2	Ana Souza	ana_souza	senha456	ana@example.com	1990-12-03	2	2
3	João Oliveira	joao_oliv	senha789	joao@example.com	1988-07-21	3	3
\.


--
-- Name: foto_perfil_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foto_perfil_id_seq', 3, true);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 4, true);


--
-- Name: foto_perfil foto_perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto_perfil
    ADD CONSTRAINT foto_perfil_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);


--
-- Name: usuario usuario_identificador_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_identificador_key UNIQUE (identificador);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_id_foto_perfil_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_foto_perfil_fkey FOREIGN KEY (id_foto_perfil) REFERENCES public.foto_perfil(id);


--
-- PostgreSQL database dump complete
--

