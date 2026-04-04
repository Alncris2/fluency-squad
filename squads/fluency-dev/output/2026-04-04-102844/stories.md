# Stories — [INFRA] Monorepo + Docker Compose

> Task: #1 | Sprint: sprint_1_infra | Scope: backend + frontend + infra

---

## Story 1 — Ambiente sobe com um comando

**APA Phase**: N/A (Infraestrutura — habilita as fases APA)

Como desenvolvedor do Fluency AI
Quero executar `docker compose up` e ter backend + frontend + banco + cache rodando
Para que o ambiente de desenvolvimento seja reproduzível em qualquer máquina

### Critérios de Aceite

**Cenário 1: Subida completa do ambiente**
Given que o repositório está clonado e o `.env` preenchido
When o desenvolvedor executa `docker compose up`
Then Laravel responde em `http://localhost:8000/api/health` com status 200
And Angular responde em `http://localhost:4200` com a homepage carregada
And PostgreSQL aceita conexões na porta 5432
And Redis aceita conexões na porta 6379

**Cenário 2: Variáveis de ambiente documentadas**
Given que o `.env.example` existe na raiz do monorepo
When o desenvolvedor o abre
Then todos os serviços (DB, Redis, API URL, Angular URL) têm variáveis documentadas com valores de exemplo válidos

---

## Story 2 — Hot-reload funciona em desenvolvimento

**APA Phase**: N/A (Developer Experience)

Como desenvolvedor
Quero que mudanças em arquivos PHP e TypeScript sejam refletidas automaticamente
Para não precisar reiniciar containers manualmente durante o desenvolvimento

### Critérios de Aceite

**Cenário 1: Hot-reload no backend Laravel**
Given que o ambiente está rodando com `docker compose up`
When o desenvolvedor edita um arquivo PHP em `backend/app/`
Then a mudança é refletida na próxima request sem reiniciar o container

**Cenário 2: Hot-reload no frontend Angular**
Given que o ambiente está rodando
When o desenvolvedor edita um arquivo TypeScript ou SCSS em `frontend/src/`
Then o Angular rebuilda e o browser atualiza automaticamente (HMR)

---

## Story 3 — CORS configurado entre backend e frontend

**APA Phase**: N/A (Integração)

Como desenvolvedor
Quero que o Angular em `:4200` consiga fazer requests para o Laravel em `:8000`
Para que a integração frontend-backend funcione localmente sem bloqueios de CORS

### Critérios de Aceite

**Cenário 1: Request cross-origin permitida**
Given que Angular está em `http://localhost:4200`
And Laravel está em `http://localhost:8000`
When Angular faz um `GET /api/health`
Then a response chega com status 200 sem erro de CORS no console do browser

**Cenário 2: Credenciais (cookies/tokens) no CORS**
Given que Sanctum usa cookies de sessão
When Angular faz uma request com `withCredentials: true`
Then Laravel aceita e responde corretamente (headers CORS com `Access-Control-Allow-Credentials: true`)

---

## Story 4 — README com instruções de setup

**APA Phase**: Adquirir (documentação que introduz o projeto)

Como desenvolvedor novo no projeto
Quero encontrar no README instruções claras de como configurar o ambiente local
Para começar a desenvolver sem precisar perguntar para a equipe

### Critérios de Aceite

**Cenário 1: Setup completo documentado**
Given que o README.md existe na raiz do monorepo
When o desenvolvedor o lê
Then encontra: pré-requisitos (Docker, Node, PHP), passo-a-passo de clone + `.env` + `docker compose up`, e URL de acesso de cada serviço

**Cenário 2: Makefile com comandos úteis**
Given que o Makefile existe na raiz
When o desenvolvedor executa `make help`
Then lista os comandos disponíveis: `make up`, `make down`, `make test`, `make migrate`, `make pint`

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | N/A (infra) | Story 4 — documentação |
| Praticar | N/A (infra) | — |
| Ajustar  | N/A (infra) | — |

> **Nota:** Esta task é infraestrutura base, anterior às fases pedagógicas APA. O compliance APA será exigido a partir das tasks de feature (chat, lições, voz).

- [x] Task identificada como infra pré-pedagógica — APA não aplicável neste ciclo
- [x] Critérios GIVEN/WHEN/THEN mensuráveis e testáveis
- [x] Scope bem definido: docker-compose + hot-reload + CORS + README + Makefile
