# Task 03 — Generate / Update Tests

## Objetivo

Gerar novos testes automatizados (ou stubs) apenas quando isso reduzir risco futuro de regressao.

Prioridade de geracao:
1. Playwright smoke por rota impactada
2. API tests negativos por endpoint impactado (Pest)
3. a11y (`@axe-core/playwright`) nas paginas impactadas
4. Visual snapshots (apenas paginas estaveis)

---

## Entrada

- `test-matrix.md` (Task 02)
- `change-manifest.json` (Task 01)

---

## Regras

1. **Seletores resilientes**: preferir `getByRole`, `getByLabel`, `getByText`. Usar `data-testid` + `getByTestId` apenas como escape hatch quando role/text nao forem suficientes.
2. **1 hipotese por teste**: cada teste valida uma unica condicao. Nao criar testes gigantescos.
3. **Sem segredos**: nunca codificar tokens, senhas ou chaves nos testes. Usar env vars ou fixtures.
4. **Convencoes existentes**: examinar testes existentes no projeto antes de gerar novos. Seguir patterns de naming, estrutura de diretorio e helpers ja existentes.
5. **Backend (Pest)**: usar `php artisan make:test {Name} --pest` quando criar arquivo novo.
6. **Frontend (Angular)**: colocar specs junto ao componente (`*.spec.ts`).
7. **E2E (Playwright)**: colocar em `tests/` com naming descritivo.

---

## Procedimento

1. Para cada caso P0 (blocker) da test-matrix:
   - Verificar se ja existe teste cobrindo o cenario
   - Se nao: gerar teste seguindo convencoes do projeto
2. Para cada caso P1 (should pass):
   - Gerar se o custo for baixo (template simples)
   - Caso contrario, documentar como "recomendado mas nao gerado" na saida
3. Nao rodar testes nesta task — apenas gerar/atualizar arquivos.

---

## Output

Lista de arquivos de teste criados/alterados:

```markdown
## Testes gerados

| Arquivo | Tipo | Cobertura na matriz | Motivacao |
|---------|------|---------------------|-----------|
| tests/Feature/Api/MemoryControllerTest.php | Pest integration | POST /api/v1/memories negativos | Endpoint novo sem testes |
| tests/e2e/memory-page.spec.ts | Playwright | Smoke + a11y rota /memories | Rota nova impactada |

## Testes nao gerados (justificativa)
- Visual snapshot de /memories: pagina ainda em desenvolvimento, baseline instavel
```

---

## Criterio de bloqueio

Se nenhum teste for gerado E a matriz contiver casos P0 sem cobertura existente, a task falha.
