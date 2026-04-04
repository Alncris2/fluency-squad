---
step: "03"
name: "Checkpoint Stories"
type: checkpoint
depends_on: step-02
---

# Step 03 — Checkpoint de Stories

## Objetivo

Pausar o pipeline para revisao humana das stories geradas antes de iniciar a codificacao.

---

## O que revisar

Arquivo: `output/{run_id}/stories.md`

1. **Escopo correto** — as stories cobrem o que foi pedido no issue?
2. **Criterios mensuraveis** — cada GIVEN/WHEN/THEN e testavel?
3. **APA compliance** — as 3 fases estao representadas?
4. **Complexidade realista** — maximo 5 stories por task?

---

## Opcoes

- **Aprovar** → pipeline avanca para Step 04 (Dev Backend) e Step 05 (Dev Frontend) em paralelo
- **Rejeitar + feedback** → PM Agent revisa as stories com base no feedback antes de prosseguir
- **Editar manualmente** → editar `output/{run_id}/stories.md` diretamente e aprovar

---

## Observacao

Este checkpoint BLOQUEIA o pipeline. Os steps 04 e 05 so iniciam apos aprovacao explicita.
