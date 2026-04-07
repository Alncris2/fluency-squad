---
step: "02"
name: "PM Stories"
type: agent
agent: pm
depends_on: step-01
model_tier: powerful
---

# Step 02 — PM Stories

## Objetivo

Converter `output/{run_id}/task-brief.yaml` em `output/{run_id}/stories.md` com user stories mensuraveis, criterios GIVEN/WHEN/THEN e compliance com o metodo APA.

---

## Entradas

- `output/{run_id}/task-brief.yaml`
- `skills/apa-method/SKILL.md` — referencia do metodo APA
- `squads/fluency-dev/_memory/company.md` — contexto do produto

---

## Instrucoes para o PM

```
1. Ler task-brief.yaml completamente
2. Identificar atores: aluno, professor (IA), admin
3. Mapear cada story em uma das 3 fases APA:
   - Adquirir (30%): apresentacao e contexto
   - Praticar (50%): exercicios e interacao
   - Ajustar (20%): correcao e personalizacao
4. Escrever maximo 5 stories com criterios GIVEN/WHEN/THEN
5. Preencher tabela de APA Compliance
6. Produzir output/{run_id}/stories.md
7. Para stories com frontend: descrever fluxo de UI detalhado
   (navegacao, elementos, modais, formularios, feedback, CRUD completo)
   Isso e CRITICO — os devs usarao essa descricao para implementar E validar no browser
```

---

## Saida esperada

- `output/{run_id}/stories.md` no formato padrao com:
  - Todas as stories com fase APA identificada
  - Criterios GIVEN/WHEN/THEN mensuraveis
  - Tabela de APA Compliance preenchida
