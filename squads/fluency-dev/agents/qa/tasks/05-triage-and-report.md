# Task 05 — Triage and Report

## Objetivo

Gerar `output/{run_id}/qa-report.md` e registrar decisao final (PASS ou BLOCKED) com evidencias.

---

## Entrada

- Resultados de execucao (Task 04)
- `change-manifest.json` (Task 01)
- `test-matrix.md` (Task 02)

---

## Regras

- Cada falha deve ter: **passo de reproducao minimo** + **artefato** (log/trace/screenshot) + **hipotese tecnica**.
- Se flakey: registrar como `FLAKY`, sugerir estabilizacao (seletores/esperas) e rodar 1 retry.
- Nunca "dar green" se houver falhas criticas (Blocker).
- Nao interpretar regras de negocio — reportar apenas comportamento tecnico observavel.

---

## Formato obrigatorio do `output/{run_id}/qa-report.md`

```markdown
# QA Report — {run_id}

## Change Manifest Summary
- **base_ref / head_ref**: {valores}
- **Arquivos alterados**: {contagem por layer}
- **Superficie API**: {lista de METHOD PATH}
- **Superficie Frontend**: {lista de rotas/componentes}
- **Risk hints**: {flags ativas}

---

## Suites (gates)

| Suite | Resultado | Detalhes |
|-------|-----------|----------|
| Backend coverage | {X}% ({PASSOU/BLOQUEADO}) | {N} testes, {F} falhas |
| Frontend tests | {PASSOU/BLOQUEADO} | {N} testes, {F} falhas |
| Frontend build | {OK/ERRO} | {detalhes se erro} |
| E2E smoke | {PASSOU/BLOQUEADO} | {fluxos executados} |
| Browser smoke | {PASSOU/PULOU/BLOQUEADO} | {rotas verificadas, screenshots} |

---

## Destructive Findings

### Finding {N} — {categoria}
- **Superficie**: {endpoint/rota impactada}
- **Como reproduzir**: {passos minimos}
- **Evidencia**: {log/trace/screenshot/comando}
- **Gravidade**: Blocker / Major / Minor
- **Hipotese tecnica** (sem regra de negocio): {o que provavelmente causa}
- **Sugestao**: {correcao tecnica sugerida}

---

## Flaky Tests (se houver)

| Teste | Resultado original | Retry | Acao sugerida |
|-------|-------------------|-------|---------------|
| {nome} | FAIL | {PASS/FAIL} | {estabilizar seletor / adicionar wait} |

---

## Decisao final

- [ ] **PASS** — pipeline pode avancar
- [ ] **BLOCKED** — issues criticos listados acima

### Motivo (se BLOCKED)
{lista de findings com gravidade Blocker}
```

---

## Pos-decisao

- Se `BLOCKED`: registrar em `squad_decisions` com `result=blocked` e metadata incluindo findings.
- Se `PASS`: registrar em `squad_decisions` com `result=success` e metadata incluindo cobertura e contagem de testes.
