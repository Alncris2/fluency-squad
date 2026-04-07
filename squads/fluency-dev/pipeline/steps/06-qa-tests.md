---
step: "06"
name: "QA Tests"
type: agent
agent: qa
depends_on:
  - step-04
  - step-05
model_tier: powerful
---

# Step 06 — QA Destrutivo (Diff-driven)

## Objetivo

Executar cadeia de QA destrutivo black-box orientado a diffs. O QA coleta evidencia de mudanca, gera matriz de testes, executa suites + checks destrutivos e produz relatorio com decisao PASS/BLOCKED.

---

## Entradas

- `output/{run_id}/backend-changes.md` — superficies implementadas no backend
- `output/{run_id}/frontend-changes.md` — superficies implementadas no frontend
- `squads/fluency-dev/schemas/change-manifest.schema.json` — schema para validacao do manifesto

**NAO** incluir `stories.md` nem `task-brief.yaml` — o QA opera black-box sem contexto de negocio.

---

## Instrucoes para o QA

O agente QA executa 5 tasks sequenciais (definidas no campo `tasks:` do agent):

1. **Collect Evidence** — gerar `change-manifest.json` a partir de git diff + superficies extraidas
2. **Build Test Matrix** — derivar casos por endpoint/rota (happy, negativos, bordas, concorrencia)
3. **Generate Tests** — criar/atualizar testes automatizados quando reduz risco futuro
4. **Execute and Stress** — rodar suites base + checks condicionados por risk_hints
5. **Triage and Report** — triagem com reproducao minima + decisao final

### Gates de bloqueio
- Backend cobertura < 80% → BLOQUEAR
- Frontend build com erro → BLOQUEAR
- Playwright fluxos criticos falhou → BLOQUEAR
- Qualquer 5xx em negativos/fuzzing/concurrency → BLOQUEAR

### Se bloqueado
- Registrar em `squad_decisions`: `result=blocked`, detalhes dos erros
- Notificar agent responsavel com arquivo:linha do erro

### Se aprovado
- Produzir artefatos finais e registrar `result=success`

---

## Saida esperada

- `output/{run_id}/change-manifest.json` — manifesto de mudancas
- `output/{run_id}/test-matrix.md` — matriz de testes
- `output/{run_id}/qa-report.md` — relatorio com decisao PASS/BLOCKED
- Pipeline avanca se TODOS os gates passarem
- Pipeline BLOQUEADO se qualquer gate falhar
