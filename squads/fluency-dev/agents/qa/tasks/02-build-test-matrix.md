# Task 02 — Build Test Matrix

## Objetivo

Produzir `output/{run_id}/test-matrix.md` contendo:
- Uma secao por endpoint (API) e por rota/pagina (Frontend)
- Casos: happy, negative, edge, concurrency/race, fuzzing, stress, visual regression, a11y
- Criterios de falha (o que bloqueia)

---

## Entrada

- `change-manifest.json` (Task 01)

---

## Regras

- Voce NAO valida regra de negocio; valida robustez e regressao tecnica.
- Para cada endpoint/rota, gere no minimo:
  - 1 happy smoke
  - 3 negativos (incluindo auth/validation)
  - 2 bordas (limites de input)
  - 1 concorrencia/double-submit
- Se `risk_hints.db_schema_touched=true`: adicionar checks de reversibilidade e consistencia pos-migracao.
- Se `risk_hints.auth_touched=true`: reforcar testes de acesso negado, token expirado, role errado.
- Se `risk_hints.streaming_touched=true`: testar desconexao abrupta, reconexao, timeout de SSE.
- Se `risk_hints.validation_touched=true`: testar payloads vazios, tipos errados, campos extras, unicode, strings enormes.

---

## Output (formato obrigatorio)

```markdown
# Test Matrix — {run_id}

## API Surface

### {METHOD} {PATH}
- **Smoke happy**: {descricao do caso}
- **Negatives**:
  - N1: {descricao} — espera {status_code}
  - N2: {descricao} — espera {status_code}
  - N3: {descricao} — espera {status_code}
- **Edges**:
  - E1: {descricao}
  - E2: {descricao}
- **Concurrency/race**: {descricao do cenario}
- **Fuzzing**: {descricao se aplicavel}
- **Failure criteria**: {o que bloqueia se falhar}

## Frontend Surface

### {ROUTE}
- **Smoke render**: {descricao}
- **Negatives**:
  - N1: {descricao}
- **Edges**:
  - E1: {descricao}
- **Visual/a11y**: {descricao}
- **Failure criteria**: {o que bloqueia se falhar}

## Risk-Conditioned Checks

### Migration Reversibility (se db_schema_touched)
- migrate up → verify schema → migrate down → verify rollback

### Auth Edge Cases (se auth_touched)
- Token expirado, role insuficiente, header ausente

### Streaming Resilience (se streaming_touched)
- Desconexao abrupta, reconexao, timeout
```

---

## Criterio de bloqueio

Se a matriz nao contiver NENHUM caso destrutivo (negativo/edge/concurrency), a task falha — o proposito inteiro do QA e teste destrutivo.
