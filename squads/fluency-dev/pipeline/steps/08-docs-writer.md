---
step: "08"
name: "Docs Writer"
type: agent
agent: docs
depends_on: step-07
model_tier: fast
---

# Step 08 — Docs Writer

## Objetivo

Documentar o que foi implementado: endpoints, decisoes arquiteturais e atualizacoes de README. Executar o post-run apos a documentacao.

---

## Entradas

- `output/{run_id}/task-brief.yaml` — escopo da task e issue_id
- `output/{run_id}/backend-changes.md` — endpoints e mudancas backend
- `output/{run_id}/frontend-changes.md` — componentes e rotas frontend
- `output/{run_id}/qa-report.md` — resultado dos testes

---

## Instrucoes para o Docs Agent

```
Documentacao:
1. Criar docs/openapi/<recurso>.yaml para cada endpoint novo
2. Atualizar README.md do repositorio afetado com descricao da feature
3. Se decisao arquitetural relevante: criar docs/adr/YYYY-MM-DD-<titulo>.md
4. Produzir output/{run_id}/docs-report.md

Post-run (executado pelo Orchestrator apos docs):
5. UPDATE squad_tasks SET status='done', completed_at=NOW() WHERE id='{task_id}'
6. INSERT squad_memory com aprendizados do run
7. git add -A && git commit -m "feat: <titulo> (closes #<github_issue_id>)"
8. POST squad_decisions: agent=orchestrator, step=post-run, result=success
```

---

## Criterios para criar ADR

Criar ADR se a implementacao envolveu:
- Mudanca de padrao de autenticacao
- Nova integracao com servico externo
- Mudanca de estrategia de streaming ou IA
- Decisao que afeta multiplos modulos

---

## Saida esperada

- `output/{run_id}/docs-report.md`
- OpenAPI criado para endpoints novos
- README atualizado
- ADR criado (se aplicavel)
- Task marcada `done` no Supabase
- Commit com `closes #N` realizado
