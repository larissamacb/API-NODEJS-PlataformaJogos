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
-- Name: genero; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genero (
    id integer NOT NULL,
    nome character varying(30) NOT NULL
);


ALTER TABLE public.genero OWNER TO postgres;

--
-- Name: genero_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genero_id_seq OWNER TO postgres;

--
-- Name: genero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genero_id_seq OWNED BY public.genero.id;


--
-- Name: jogo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jogo (
    id integer NOT NULL,
    nome character varying(50) NOT NULL,
    data_lancamento date NOT NULL,
    classificacao_etaria integer NOT NULL,
    descricao text,
    avaliacao_media numeric(2,1)
);


ALTER TABLE public.jogo OWNER TO postgres;

--
-- Name: jogo_genero; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jogo_genero (
    id_jogo integer NOT NULL,
    id_genero integer NOT NULL
);


ALTER TABLE public.jogo_genero OWNER TO postgres;

--
-- Name: jogo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jogo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.jogo_id_seq OWNER TO postgres;

--
-- Name: jogo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jogo_id_seq OWNED BY public.jogo.id;


--
-- Name: midia_jogo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.midia_jogo (
    id integer NOT NULL,
    id_jogo integer,
    tipo character varying(5),
    url text NOT NULL,
    CONSTRAINT midia_jogo_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['foto'::character varying, 'video'::character varying])::text[])))
);


ALTER TABLE public.midia_jogo OWNER TO postgres;

--
-- Name: midia_jogo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.midia_jogo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.midia_jogo_id_seq OWNER TO postgres;

--
-- Name: midia_jogo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.midia_jogo_id_seq OWNED BY public.midia_jogo.id;


--
-- Name: genero id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genero ALTER COLUMN id SET DEFAULT nextval('public.genero_id_seq'::regclass);


--
-- Name: jogo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo ALTER COLUMN id SET DEFAULT nextval('public.jogo_id_seq'::regclass);


--
-- Name: midia_jogo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.midia_jogo ALTER COLUMN id SET DEFAULT nextval('public.midia_jogo_id_seq'::regclass);


--
-- Data for Name: genero; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genero (id, nome) FROM stdin;
1	Ação
2	Aventura
3	Estratégia
\.


--
-- Data for Name: jogo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jogo (id, nome, data_lancamento, classificacao_etaria, descricao, avaliacao_media) FROM stdin;
1	Jogo A	2022-03-15	18	Um jogo de ação	4.5
2	Jogo B	2021-11-10	12	Um jogo de aventura	4.0
3	Jogo C	2023-06-25	16	Um jogo de estratégia	3.8
\.


--
-- Data for Name: jogo_genero; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jogo_genero (id_jogo, id_genero) FROM stdin;
1	1
2	2
3	3
\.


--
-- Data for Name: midia_jogo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.midia_jogo (id, id_jogo, tipo, url) FROM stdin;
1	1	foto	https://example.com/jogoA-foto1.jpg
2	2	video	https://example.com/jogoB-video1.mp4
3	3	foto	https://example.com/jogoC-foto1.jpg
\.


--
-- Name: genero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genero_id_seq', 3, true);


--
-- Name: jogo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jogo_id_seq', 3, true);


--
-- Name: midia_jogo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.midia_jogo_id_seq', 3, true);


--
-- Name: genero genero_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genero
    ADD CONSTRAINT genero_pkey PRIMARY KEY (id);


--
-- Name: jogo_genero jogo_genero_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo_genero
    ADD CONSTRAINT jogo_genero_pkey PRIMARY KEY (id_jogo, id_genero);


--
-- Name: jogo jogo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo
    ADD CONSTRAINT jogo_pkey PRIMARY KEY (id);


--
-- Name: midia_jogo midia_jogo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.midia_jogo
    ADD CONSTRAINT midia_jogo_pkey PRIMARY KEY (id);


--
-- Name: jogo_genero jogo_genero_id_genero_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo_genero
    ADD CONSTRAINT jogo_genero_id_genero_fkey FOREIGN KEY (id_genero) REFERENCES public.genero(id);


--
-- Name: jogo_genero jogo_genero_id_jogo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo_genero
    ADD CONSTRAINT jogo_genero_id_jogo_fkey FOREIGN KEY (id_jogo) REFERENCES public.jogo(id);


--
-- Name: midia_jogo midia_jogo_id_jogo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.midia_jogo
    ADD CONSTRAINT midia_jogo_id_jogo_fkey FOREIGN KEY (id_jogo) REFERENCES public.jogo(id);


--
-- PostgreSQL database dump complete
--

