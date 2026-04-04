---
step: "01"
name: "Backlog Reader"
type: agent
agent: orchestrator
model_tier: fast
---

# Step 01 — Backlog Reader

## Objetivo

Selecionar a proxima task do backlog no Supabase, buscar o issue correspondente no GitHub e produzir `output/{run_id}/task-brief.yaml` com contexto tecnico completo para os proximos steps.

---

## Entradas

- `squads/fluency-dev/_memory/company.md` — contexto do projeto
- Tabela `squad_tasks` no Supabase — backlog priorizado
- Issue GitHub vinculada — corpo completo e labels

---

## Instrucoes para o Orchestrator

```
1. Executar query no Supabase:
   SELECT id, title, description, github_issue_id, github_repo, priority, sprint
   FROM squad_tasks
   WHERE status = 'backlog'
   ORDER BY priority ASC
   LIMIT 1

2. Se nenhuma task encontrada:
   → Informar usuario: "Backlog vazio. Nenhuma task disponivel."
   → PARAR pipeline

3. Ler issue GitHub:
   get_issue(owner, repo, github_issue_id)

4. Atualizar status da task:
   UPDATE squad_tasks SET status = 'dev_in_progress' WHERE id = '{task_id}'

5. Injetar contexto em company.md:
   Preencher secao "Contexto da task atual" com task_id, titulo, issue_id, sprint

6. Produzir output/{run_id}/task-brief.yaml
```

---

## Saida esperada

- `output/{run_id}/task-brief.yaml` com todos os campos preenchidos
- Task atualizada para `dev_in_progress` no Supabase
- Secao de contexto em `company.md` atualizada
