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

> Injetado pelo runner — run `2026-04-04-153247`

```yaml
task_id: "e04e9b79-96e5-4fc1-ae82-356e36b55822"
task_title: "[AGENT] Tool: send_quiz"
github_issue_id: 20
github_issue_url: "https://github.com/Alncris2/fluency-ai-backend/issues/20"
sprint: "sprint_2_ai_core"
epic: "epic-03-agente-ia"
priority: 1
issue_body: |
  Ferramenta que cria e envia quiz interativo durante a conversa.
  Tipos: multiple_choice, fill_in_blank, translation, error_correction
  Parâmetros: type, topic, question, options_json, correct_answer, explanation
  Persiste quiz em tabela quizzes
  Retorna quiz_id para o frontend renderizar card interativo
  POST /api/quiz/{id}/answer processa resposta e retorna feedback
  Depende de: #015 (EnglishTeacherAgent core — DONE)
```
