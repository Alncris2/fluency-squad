---
name: Supabase Squad
version: 1.0.0
type: knowledge
description: Operacao da memoria operacional da squad no Supabase — schemas, queries REST e fluxo de status
---

# Supabase Squad

## Conexao

- **Projeto**: `kyhkruedsilimzrlhkdc`
- **URL**: `https://kyhkruedsilimzrlhkdc.supabase.co`
- **Auth**: header `apikey: ${SUPABASE_ANON_KEY}` + `Authorization: Bearer ${SUPABASE_ANON_KEY}`

Via MCP Supabase (configurado em `.mcp.json`), use as ferramentas diretamente sem HTTP manual.

---

## Schema das tabelas

### `squad_tasks`

| Coluna | Tipo | Descricao |
|---|---|---|
| `id` | uuid | PK |
| `title` | text | Titulo da task |
| `description` | text | Detalhes tecnicos |
| `status` | text | `backlog` / `dev_in_progress` / `done` / `blocked` |
| `priority` | integer | Menor numero = mais prioritario |
| `github_issue_id` | integer | ID do issue no GitHub |
| `github_repo` | text | Ex: `Alncris2/fluency-ai-backend` |
| `sprint` | integer | Sprint (1–6, abril–junho 2026) |
| `created_at` | timestamptz | |
| `completed_at` | timestamptz | Preenchido ao marcar done |
| `metadata` | jsonb | Dados extras do run |

### `squad_agents`

| Coluna | Tipo | Descricao |
|---|---|---|
| `id` | uuid | PK |
| `code` | text | Ex: `dev-backend` |
| `name` | text | Nome display |
| `skills` | text[] | Skills do agente |
| `status` | text | `idle` / `working` / `blocked` |

### `squad_decisions`

| Coluna | Tipo | Descricao |
|---|---|---|
| `id` | uuid | PK |
| `task_id` | uuid | FK → squad_tasks.id |
| `agent` | text | Codigo do agente (ex: `dev-backend`) |
| `step` | text | Ex: `step-04` |
| `action` | text | O que foi feito |
| `result` | text | `success` / `blocked` / `skipped` |
| `metadata` | jsonb | Arquivos criados, comandos rodados |
| `created_at` | timestamptz | |

### `squad_memory`

| Coluna | Tipo | Descricao |
|---|---|---|
| `id` | uuid | PK |
| `run_id` | text | ID do run (formato `YYYY-MM-DD-HHmmss`) |
| `category` | text | `learning` / `pattern` / `decision` |
| `content` | text | O aprendizado em si |
| `tags` | text[] | Ex: `['laravel', 'auth', 'sanctum']` |
| `created_at` | timestamptz | |

### `squad_checkpoints`

| Coluna | Tipo | Descricao |
|---|---|---|
| `id` | uuid | PK |
| `task_id` | uuid | FK → squad_tasks.id |
| `step` | text | Ex: `step-03` |
| `status` | text | `pending` / `approved` / `rejected` |
| `reviewer_notes` | text | Notas do revisor humano |
| `created_at` | timestamptz | |
| `resolved_at` | timestamptz | |

---

## Queries REST (via MCP `execute_sql` ou REST direto)

### 1. Ler proxima task (pre-run)

```sql
SELECT id, title, description, github_issue_id, github_repo, priority, sprint
FROM squad_tasks
WHERE status = 'backlog'
ORDER BY priority ASC
LIMIT 1;
```

Ou via REST:
```
GET /rest/v1/squad_tasks
  ?status=eq.backlog
  &order=priority.asc
  &limit=1
  &select=id,title,description,github_issue_id,github_repo,priority,sprint
```

### 2. Marcar task como dev_in_progress

```sql
UPDATE squad_tasks SET status = 'dev_in_progress' WHERE id = '{task_id}';
```

### 3. Registrar decisao (post-step)

```sql
INSERT INTO squad_decisions (task_id, agent, step, action, result, metadata)
VALUES (
  '{task_id}',
  'dev-backend',
  'step-04',
  'Criou controller e migration para autenticacao',
  'success',
  '{"files_created": ["app/Http/Controllers/AuthController.php"], "commands_run": ["php artisan make:controller AuthController"]}'
);
```

### 4. Marcar task como done (post-run)

```sql
UPDATE squad_tasks
SET status = 'done', completed_at = NOW()
WHERE id = '{task_id}';
```

### 5. Registrar aprendizado em squad_memory

```sql
INSERT INTO squad_memory (run_id, category, content, tags)
VALUES (
  '2026-04-04-103000',
  'learning',
  'Laravel Sanctum requer middleware auth:sanctum nas rotas protegidas',
  ARRAY['laravel', 'auth', 'sanctum']
);
```

---

## Fluxo minimo de um run

```
pre-run  → SELECT squad_tasks (status=backlog, priority asc, limit 1)
         → UPDATE status = dev_in_progress

step-04  → INSERT squad_decisions (agent=dev-backend, step=step-04)
step-05  → INSERT squad_decisions (agent=dev-frontend, step=step-05)
step-06  → INSERT squad_decisions (agent=qa, step=step-06)

post-run → UPDATE squad_tasks status = done, completed_at = NOW()
         → INSERT squad_memory (aprendizados do run)
```

---

## Boas praticas

- Nunca sobrescrever entradas em `squad_memory` — sempre INSERT novas
- Sempre incluir `task_id` nas decisions para rastreabilidade completa
- Nunca pular o UPDATE para `dev_in_progress` — evita selecionar a mesma task duas vezes em runs paralelos

---

## Checklist

- [ ] Task selecionada por `priority ASC` e `status=backlog`
- [ ] Status atualizado para `dev_in_progress` no inicio do run
- [ ] Decisao registrada em `squad_decisions` apos cada step relevante
- [ ] Task marcada `done` com `completed_at` no post-run
- [ ] Aprendizados inseridos em `squad_memory`
