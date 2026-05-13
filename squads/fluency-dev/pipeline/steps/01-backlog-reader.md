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
- GitHub Project `Alncris2/4` — backlog priorizado por epic
- `gh` CLI — conectado com credenciais GitHub

---

## Instrucoes para o Orchestrator

```
1. Buscar task do sprint mais baixo com status=backlog, ordenando por sprint ASC e priority ASC:
   - Via Supabase: SELECT ... FROM squad_tasks WHERE status='backlog' ORDER BY sprint ASC, priority ASC LIMIT 1
   - Ou via gh CLI filtrando pelo milestone do sprint atual primeiro

2. Se sprint atual sem tasks backlog:
   → Avançar para o próximo sprint (sprint 2, 3, etc)
   → Se encontrar, usar essa task

3. Se nenhuma issue encontrada em nenhum epic:
   → Informar usuario: "Backlog vazio. Nenhuma issue aberta no projeto."
   → PARAR pipeline

4. Ler detalhes completos da issue encontrada:
   gh issue view <ISSUE_NUMBER> --json body,labels,milestone,author

5. Preencher contexto em company.md:
   Seção "Contexto da task atual": issue_number, titulo, epic, milestone

6. Produzir output/{run_id}/task-brief.yaml usando dados do GitHub
```

---

## Saida esperada

- `output/{run_id}/task-brief.yaml` com issue_number, title, body, labels, epic, milestone
- Seção "Contexto da task atual" em `company.md` atualizada com issue e epic selecionados
- DECISION log mostrando qual epic foi consultado e qual issue foi selecionada
