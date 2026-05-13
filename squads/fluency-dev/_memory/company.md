# Fluency AI — Company Context

## Produto

Plataforma SaaS de ensino de ingles com professor de IA personalizado.
Metodo pedagogico exclusivo: **APA** (Adquirir 30% → Praticar 50% → Ajustar 20%).

Publico-alvo: adultos brasileiros aprendendo ingles para trabalho e viagem.
Modelo de negocio: assinatura mensal com planos free/pro.

---

## Stack tecnologica

| Camada | Tecnologia | Observacao |
|---|---|---|
| Backend | Laravel 13 + laravel/ai `^0.4.3` | NUNCA Prism |
| Frontend | Angular 21.2 + Tailwind CSS v4 | ng generate obrigatorio |
| Banco | PostgreSQL via Supabase | projeto `kyhkruedsilimzrlhkdc` |
| Cache | Redis | sessions, filas, rate limiting |
| Auth | Laravel Sanctum | tokens API + session cookie |
| IA | `claude-sonnet-4-20250514` | via laravel/ai SDK |
| Streaming | SSE nativo Laravel | `StreamedResponse` |
| Voice | STT/TTS integrado | via laravel/ai quando necessario |

---

## Repositorios

| Repo | GitHub | Path local |
|---|---|---|
| Backend | `github.com/Alncris2/fluency-ai` | `/home/friday/projects/fluency-ai/backend` |
| Frontend | `github.com/Alncris2/fluency-ai` | `/home/friday/projects/fluency-ai/frontend` |
| Project Board | `github.com/users/Alncris2/projects/4` | 60 issues, 6 sprints |

---

## Estrutura do backend Laravel

```
app/
├── Ai/
│   └── Agents/        ← agentes de IA (FluencyAgent, EnglishTeacherAgent, ...)
├── Http/
│   └── Controllers/   ← controllers finos, logic em Services
├── Models/            ← Eloquent models
├── Services/          ← regras de negocio
│   └── Squad/         ← services de orquestracao da squad
└── Providers/
```

---

## Estrutura do frontend Angular

```
src/app/
├── views/             ← features por dominio (lazy loading)
├── shared/            ← componentes e pipes reutilizaveis
├── core/              ← guards, interceptors, config global
├── store/             ← NgRx (layout, authentication, features)
└── layouts/           ← shells de layout (vertical/topbar)
```

Cores do Fluency:
- Primary: `#6C63FF`
- Secondary: `#1EC8A0`

---

## Squad no Supabase

- **Projeto**: `kyhkruedsilimzrlhkdc`
- **URL**: `https://kyhkruedsilimzrlhkdc.supabase.co`
- **Tabelas**: `squad_tasks`, `squad_agents`, `squad_decisions`, `squad_memory`, `squad_checkpoints`

Ao iniciar um run, sempre pegar a task do sprint mais baixo primeiro, e dentro do sprint, pela menor `priority`, com `status=backlog`.

---

## Issues e sprints

- **Total**: 60 issues distribuidos em 6 sprints (abril–junho 2026)
- **Sprint atual**: Sprint 1 (abril 2026, semana 1-2)
- **Selecao de task**: menor `sprint` primeiro, depois menor `priority`, com `status=backlog`
- **Maximo por sessao**: 4 tasks

---

## Regras absolutas (inviolaveis)

1. **NUNCA** usar Prism — sempre `laravel/ai`
2. **NUNCA** criar arquivos manualmente — sempre `php artisan make:*` (backend) ou `ng generate` (frontend)
3. **SEMPRE** rodar `vendor/bin/pint --dirty --format agent` apos editar qualquer arquivo PHP
4. **SEMPRE** testes passando antes de commitar (PHPUnit backend, Jest/build frontend)
5. **SEMPRE** executar `search-docs` (Laravel Boost MCP) antes de implementar feature backend
6. **Commits** no formato: `feat: descricao (closes #N)` ou `fix: descricao (closes #N)`
7. **NUNCA** alterar layout store ou auth store sem task explicita para isso

---

## Contexto da task atual

> Injetado pelo runner — run `2026-04-18-162930`

```yaml
task_id: "33002553-cee2-49df-8db6-c1f19f4c4ab9"
task_title: "[INFRA] Auth Sanctum — endpoints"
github_issue_id: 5
github_issue_url: "https://github.com/Alncris2/fluency-ai-backend/issues/5"
github_repo: "Alncris2/fluency-ai-backend"
sprint: "sprint_1_infra"
epic: "epic-01-infra"
priority: 2
scope: backend only
status: "dev_in_progress"
issue_body: |
  Implementar autenticação completa via Laravel Sanctum com tokens de API.
  - POST /api/auth/register (nome, email, senha)
  - POST /api/auth/login (email, senha) → retorna token
  - POST /api/auth/logout (invalida token)
  - GET /api/auth/me (usuário autenticado)
  - Middleware auth:sanctum protegendo rotas privadas
  - Tokens com expiração configurável
  Bloqueia: #6 | Epic: epic-01-infra | Estimativa: S (1 dia)
```
