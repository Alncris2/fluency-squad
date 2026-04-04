---
step: "07"
name: "Checkpoint Code"
type: checkpoint
depends_on: step-06
---

# Step 07 — Checkpoint de Codigo

## Objetivo

Pausar o pipeline para revisao humana do codigo implementado e do relatorio QA antes de liberar a etapa de documentacao e fechamento do ciclo.

---

## O que revisar

1. `output/{run_id}/backend-changes.md` — arquivos criados, endpoints, testes
2. `output/{run_id}/frontend-changes.md` — componentes, rotas, estado
3. `output/{run_id}/qa-report.md` — resultado completo de todas as suites

---

## Opcoes

- **Aprovar** → pipeline avanca para Step 08 (Docs Writer) e inicia post-run
- **Rejeitar + feedback** → Dev Backend ou Dev Frontend revisam com base no feedback
- **Aprovar parcialmente** → aprovar um lado (backend ou frontend) e rejeitar o outro

---

## Observacao

Este checkpoint BLOQUEIA o post-run (commit, fechamento de issue, atualizacao do Supabase). So apos aprovacao explicita o ciclo sera finalizado.
