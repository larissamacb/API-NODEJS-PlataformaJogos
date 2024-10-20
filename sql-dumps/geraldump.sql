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

--
-- Name: adicionar_amizade_apos_aceite(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.adicionar_amizade_apos_aceite() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.status = 'aceito' THEN
    INSERT INTO amizade (id_usuario1, id_usuario2, data_adicao)
    VALUES (NEW.id_usuario_solicitante, NEW.id_usuario_destinatario, CURRENT_TIMESTAMP);
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.adicionar_amizade_apos_aceite() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: amizade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.amizade (
    id_usuario1 integer NOT NULL,
    id_usuario2 integer NOT NULL,
    data_adicao timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.amizade OWNER TO postgres;

--
-- Name: avaliacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.avaliacao (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    id_jogo integer NOT NULL,
    nota integer,
    comentario text,
    data_avaliacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT avaliacao_nota_check CHECK (((nota >= 0) AND (nota <= 5)))
);


ALTER TABLE public.avaliacao OWNER TO postgres;

--
-- Name: avaliacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.avaliacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.avaliacao_id_seq OWNER TO postgres;

--
-- Name: avaliacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.avaliacao_id_seq OWNED BY public.avaliacao.id;


--
-- Name: dispositivo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dispositivo (
    id integer NOT NULL,
    tipo character varying(50)
);


ALTER TABLE public.dispositivo OWNER TO postgres;

--
-- Name: dispositivo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dispositivo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dispositivo_id_seq OWNER TO postgres;

--
-- Name: dispositivo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dispositivo_id_seq OWNED BY public.dispositivo.id;


--
-- Name: dispositivo_plano; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dispositivo_plano (
    id_dispositivo integer NOT NULL,
    id_plano integer NOT NULL
);


ALTER TABLE public.dispositivo_plano OWNER TO postgres;

--
-- Name: forma_pagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forma_pagamento (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    id_tipo_pagamento integer,
    numero_cartao character varying(16),
    nome_no_cartao character varying(50),
    cvv character varying(3)
);


ALTER TABLE public.forma_pagamento OWNER TO postgres;

--
-- Name: forma_pagamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forma_pagamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.forma_pagamento_id_seq OWNER TO postgres;

--
-- Name: forma_pagamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forma_pagamento_id_seq OWNED BY public.forma_pagamento.id;


--
-- Name: jogo_plano; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jogo_plano (
    id_plano integer NOT NULL,
    id_jogo integer NOT NULL,
    data_adicao timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.jogo_plano OWNER TO postgres;

--
-- Name: pagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pagamento (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    id_tipo_pagamento integer,
    id_forma_pagamento integer,
    data_pagamento timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.pagamento OWNER TO postgres;

--
-- Name: pagamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pagamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pagamento_id_seq OWNER TO postgres;

--
-- Name: pagamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pagamento_id_seq OWNED BY public.pagamento.id;


--
-- Name: plano; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plano (
    id integer NOT NULL,
    nome character varying(15) NOT NULL,
    descricao text
);


ALTER TABLE public.plano OWNER TO postgres;

--
-- Name: plano_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plano_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plano_id_seq OWNER TO postgres;

--
-- Name: plano_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plano_id_seq OWNED BY public.plano.id;


--
-- Name: solicitacao_amizade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitacao_amizade (
    id integer NOT NULL,
    id_usuario_solicitante integer NOT NULL,
    id_usuario_destinatario integer NOT NULL,
    data_solicitacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(9) DEFAULT 'pendente'::character varying
);


ALTER TABLE public.solicitacao_amizade OWNER TO postgres;

--
-- Name: solicitacao_amizade_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitacao_amizade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.solicitacao_amizade_id_seq OWNER TO postgres;

--
-- Name: solicitacao_amizade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitacao_amizade_id_seq OWNED BY public.solicitacao_amizade.id;


--
-- Name: tipo_pagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_pagamento (
    id integer NOT NULL,
    tipo character varying(30)
);


ALTER TABLE public.tipo_pagamento OWNER TO postgres;

--
-- Name: tipo_pagamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_pagamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_pagamento_id_seq OWNER TO postgres;

--
-- Name: tipo_pagamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_pagamento_id_seq OWNED BY public.tipo_pagamento.id;


--
-- Name: avaliacao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avaliacao ALTER COLUMN id SET DEFAULT nextval('public.avaliacao_id_seq'::regclass);


--
-- Name: dispositivo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dispositivo ALTER COLUMN id SET DEFAULT nextval('public.dispositivo_id_seq'::regclass);


--
-- Name: forma_pagamento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma_pagamento ALTER COLUMN id SET DEFAULT nextval('public.forma_pagamento_id_seq'::regclass);


--
-- Name: pagamento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamento ALTER COLUMN id SET DEFAULT nextval('public.pagamento_id_seq'::regclass);


--
-- Name: plano id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plano ALTER COLUMN id SET DEFAULT nextval('public.plano_id_seq'::regclass);


--
-- Name: solicitacao_amizade id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacao_amizade ALTER COLUMN id SET DEFAULT nextval('public.solicitacao_amizade_id_seq'::regclass);


--
-- Name: tipo_pagamento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_pagamento ALTER COLUMN id SET DEFAULT nextval('public.tipo_pagamento_id_seq'::regclass);


--
-- Data for Name: amizade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.amizade (id_usuario1, id_usuario2, data_adicao) FROM stdin;
1	3	2024-10-20 23:19:04.53005
\.


--
-- Data for Name: avaliacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.avaliacao (id, id_usuario, id_jogo, nota, comentario, data_avaliacao) FROM stdin;
1	1	1	5	Excelente jogo!	2024-10-15 20:52:15.969201
2	2	2	4	Divertido, mas poderia ser melhor	2024-10-15 20:52:15.969201
3	3	3	3	Jogo razoável, mas interessante	2024-10-15 20:52:15.969201
\.


--
-- Data for Name: dispositivo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dispositivo (id, tipo) FROM stdin;
1	PC
2	Smartphone
3	Console
\.


--
-- Data for Name: dispositivo_plano; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dispositivo_plano (id_dispositivo, id_plano) FROM stdin;
1	1
2	2
3	3
\.


--
-- Data for Name: forma_pagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forma_pagamento (id, id_usuario, id_tipo_pagamento, numero_cartao, nome_no_cartao, cvv) FROM stdin;
1	1	1	1234567812345678	Carlos Silva	123
2	2	2	8765432187654321	Ana Souza	321
3	3	1	1122334455667788	João Oliveira	456
\.


--
-- Data for Name: jogo_plano; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jogo_plano (id_plano, id_jogo, data_adicao) FROM stdin;
1	1	2024-10-15 20:51:33.744215
2	2	2024-10-15 20:51:33.744215
3	3	2024-10-15 20:51:33.744215
\.


--
-- Data for Name: pagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pagamento (id, id_usuario, id_tipo_pagamento, id_forma_pagamento, data_pagamento) FROM stdin;
1	1	1	1	2024-10-15 20:52:50.014309
2	2	2	2	2024-10-15 20:52:50.014309
3	3	1	3	2024-10-15 20:52:50.014309
\.


--
-- Data for Name: plano; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plano (id, nome, descricao) FROM stdin;
1	Básico	Plano básico com acesso a 10 jogos
2	Premium	Plano premium com acesso ilimitado a todos os jogos
3	Família	Plano para até 4 usuários com acesso a 20 jogos por mês
\.


--
-- Data for Name: solicitacao_amizade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitacao_amizade (id, id_usuario_solicitante, id_usuario_destinatario, data_solicitacao, status) FROM stdin;
1	1	2	2024-10-20 22:47:05.204	rejeitado
2	1	2	2024-10-20 22:49:47.121	aceito
3	1	3	2024-10-20 22:50:59.051	aceito
\.


--
-- Data for Name: tipo_pagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_pagamento (id, tipo) FROM stdin;
1	Cartão de Crédito
2	Débito
3	PIX
\.


--
-- Name: avaliacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.avaliacao_id_seq', 3, true);


--
-- Name: dispositivo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dispositivo_id_seq', 3, true);


--
-- Name: forma_pagamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forma_pagamento_id_seq', 3, true);


--
-- Name: pagamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pagamento_id_seq', 3, true);


--
-- Name: plano_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plano_id_seq', 3, true);


--
-- Name: solicitacao_amizade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitacao_amizade_id_seq', 3, true);


--
-- Name: tipo_pagamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_pagamento_id_seq', 3, true);


--
-- Name: amizade amizade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amizade
    ADD CONSTRAINT amizade_pkey PRIMARY KEY (id_usuario1, id_usuario2);


--
-- Name: avaliacao avaliacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avaliacao
    ADD CONSTRAINT avaliacao_pkey PRIMARY KEY (id);


--
-- Name: dispositivo dispositivo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dispositivo
    ADD CONSTRAINT dispositivo_pkey PRIMARY KEY (id);


--
-- Name: dispositivo_plano dispositivo_plano_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dispositivo_plano
    ADD CONSTRAINT dispositivo_plano_pkey PRIMARY KEY (id_dispositivo, id_plano);


--
-- Name: forma_pagamento forma_pagamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma_pagamento
    ADD CONSTRAINT forma_pagamento_pkey PRIMARY KEY (id);


--
-- Name: jogo_plano jogo_plano_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo_plano
    ADD CONSTRAINT jogo_plano_pkey PRIMARY KEY (id_plano, id_jogo);


--
-- Name: pagamento pagamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamento
    ADD CONSTRAINT pagamento_pkey PRIMARY KEY (id);


--
-- Name: plano plano_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plano
    ADD CONSTRAINT plano_pkey PRIMARY KEY (id);


--
-- Name: solicitacao_amizade solicitacao_amizade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitacao_amizade
    ADD CONSTRAINT solicitacao_amizade_pkey PRIMARY KEY (id);


--
-- Name: tipo_pagamento tipo_pagamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_pagamento
    ADD CONSTRAINT tipo_pagamento_pkey PRIMARY KEY (id);


--
-- Name: solicitacao_amizade trigger_adicionar_amizade; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_adicionar_amizade AFTER UPDATE ON public.solicitacao_amizade FOR EACH ROW WHEN (((new.status)::text = 'aceito'::text)) EXECUTE FUNCTION public.adicionar_amizade_apos_aceite();


--
-- Name: dispositivo_plano dispositivo_plano_id_dispositivo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dispositivo_plano
    ADD CONSTRAINT dispositivo_plano_id_dispositivo_fkey FOREIGN KEY (id_dispositivo) REFERENCES public.dispositivo(id);


--
-- Name: dispositivo_plano dispositivo_plano_id_plano_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dispositivo_plano
    ADD CONSTRAINT dispositivo_plano_id_plano_fkey FOREIGN KEY (id_plano) REFERENCES public.plano(id);


--
-- Name: forma_pagamento forma_pagamento_id_tipo_pagamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma_pagamento
    ADD CONSTRAINT forma_pagamento_id_tipo_pagamento_fkey FOREIGN KEY (id_tipo_pagamento) REFERENCES public.tipo_pagamento(id);


--
-- Name: jogo_plano jogo_plano_id_plano_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo_plano
    ADD CONSTRAINT jogo_plano_id_plano_fkey FOREIGN KEY (id_plano) REFERENCES public.plano(id);


--
-- Name: pagamento pagamento_id_forma_pagamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamento
    ADD CONSTRAINT pagamento_id_forma_pagamento_fkey FOREIGN KEY (id_forma_pagamento) REFERENCES public.forma_pagamento(id);


--
-- Name: pagamento pagamento_id_tipo_pagamento_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pagamento
    ADD CONSTRAINT pagamento_id_tipo_pagamento_fkey FOREIGN KEY (id_tipo_pagamento) REFERENCES public.tipo_pagamento(id);


--
-- PostgreSQL database dump complete
--

