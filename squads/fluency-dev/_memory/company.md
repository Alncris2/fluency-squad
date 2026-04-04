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
| Frontend | Angular 19 + Rizz template | ng generate obrigatorio |
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
| Backend | `github.com/Alncris2/fluency-ai-backend` | `/home/friday/projects/fluency-ai/backend` |
| Frontend | `github.com/Alncris2/fluency-ai-frontend` | `/home/friday/projects/fluency-ai/frontend` |
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

Ao iniciar um run, sempre pegar a task com menor `priority` e `status=backlog`.

---

## Issues e sprints

- **Total**: 60 issues distribuidos em 6 sprints (abril–junho 2026)
- **Sprint atual**: Sprint 1 (abril 2026, semana 1-2)
- **Selecao de task**: menor `priority` com `status=backlog`
- **Maximo por sessao**: 4 tasks

---

## Regras absolutas (inviolaveis)

1. **NUNCA** usar Prism — sempre `laravel/ai`
2. **NUNCA** criar arquivos manualmente — sempre `php artisan make:*` (backend) ou `ng generate` (frontend)
3. **SEMPRE** rodar `vendor/bin/pint --dirty --format agent` apos editar qualquer arquivo PHP
4. **SEMPRE** testes passando antes de commitar (PHPUnit backend, Jest/build frontend)
5. **SEMPRE** executar `search-docs` (Laravel Boost MCP) antes de implementar feature backend
6. **Commits** no formato: `feat: descricao (closes #N)` ou `fix: descricao (closes #N)`
7. **NUNCA** alterar layout store ou auth store do Rizz sem task explicita para isso

---

## Contexto da task atual

> Injetado pelo runner — run `2026-04-04-160011`

```yaml
task_id: "128da3ee-241d-4328-bfdb-ba3552ac0d73"
task_title: "[INFRA] Limpeza do template Rizz para base Fluency"
github_issue_id: 61
github_issue_url: "https://github.com/Alncris2/fluency-ai-backend/issues/61"
sprint: "sprint_1_infra"
epic: "epic-01-infra"
priority: 2
scope: frontend (Angular + Rizz template cleanup)
issue_body: |
  Remover estruturas, dependências, componentes, rotas, estilos, páginas, configs
  e arquivos do template Rizz que não fazem parte do escopo do Fluency AI.
  Usar o template base apenas como referência de recuperação.
  Sem regressão no build frontend ou backend.
  Critérios: inventário mantido/removido, ajuste de rotas/imports/providers/layouts,
  nenhuma regressão no build, pontos de dúvida documentados.
```
