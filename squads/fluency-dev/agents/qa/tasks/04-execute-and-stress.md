# Task 04 — Execute Suites and Destructive Checks

## Objetivo

Executar todas as suites de teste, registrar resultados e coletar artefatos.

---

## Entrada

- Lista de testes gerados (Task 03)
- `test-matrix.md` (Task 02)
- `change-manifest.json` (Task 01)

---

## Execucao base (SEMPRE rodar)

### Backend
```bash
cd /home/friday/projects/fluency-ai/backend
php artisan test --coverage --min=80
```

### Frontend
```bash
cd /home/friday/projects/fluency-ai/frontend
ng test --watch=false --code-coverage
ng build --configuration production
```

### E2E (smoke focado na superficie impactada)
```bash
npx playwright test --reporter=list
```

---

## Execucao condicionada (por risk_hints do change-manifest)

### Se `validation_touched` ou `auth_touched`
- Reforcar testes negativos: payloads invalidos, headers ausentes, verb tampering (ex: PUT onde so aceita POST)
- Testar 401/403 em endpoints protegidos com token ausente/expirado

### Se `db_schema_touched`
- Executar migrate up/down em ambiente de teste:
  ```bash
  php artisan migrate:fresh --seed
  php artisan migrate:rollback --step=1
  php artisan migrate
  ```
- Verificar consistencia de dados apos rollback+re-migrate

### Se endpoints novos e existir OpenAPI/Swagger
- Rodar Schemathesis contra endpoints impactados:
  ```bash
  schemathesis run --base-url=http://localhost:8000 openapi.yaml --endpoint=/api/v1/impacted
  ```

### Se superficie critica (high_risk_paths nao vazio)
- Rodar k6 com thresholds basicos:
  ```bash
  k6 run --out json=output/{run_id}/perf-k6.json stress-test.js
  ```
  Thresholds: p95 < 500ms, error rate < 1%

---

## Browser Verification (via Chrome MCP)

> Prerequisito: executar preflight check (`tabs_context_mcp`). Se Chrome indisponivel, pular esta secao e registrar warning.

### Sempre rodar (se frontend changes existem no change-manifest):
1. Navegar a cada rota Angular impactada (`navigate`)
2. Verificar que carrega sem erros de console (`read_console_messages`)
3. Capturar screenshot do estado final
4. Checar network requests por 4xx/5xx inesperados (`read_network_requests`)

### Se mudancas em formularios/inputs:
1. Testar CRUD completo no browser (criar, editar, excluir)
2. Testar com dados invalidos (validacao client-side)
3. Gravar GIF do fluxo (`gif_creator`)

### Se mudancas visuais/UI:
1. Testar viewports mobile (375x667) e desktop (1280x720) via `resize_window`
2. Capturar screenshots em ambos
3. Verificar que nao ha quebra de layout

### Saidas de browser:
- `output/{run_id}/browser/` — screenshots, GIFs, logs de console/network

---

## Saidas

- `output/{run_id}/test-runs.log` — log consolidado de todas as execucoes
- `output/{run_id}/playwright-report/` — relatorio Playwright (ou link)
- `output/{run_id}/perf-k6.json` — resultados k6 (se executou)
- `output/{run_id}/api-fuzz-report.*` — resultados Schemathesis (se executou)

---

## Criterio de bloqueio

- Qualquer **5xx** em testes negativos/fuzzing/concurrency **bloqueia** (exceto endpoints explicitamente marcados como "error endpoints" no manifest)
- Backend coverage abaixo de 80% **bloqueia**
- Frontend build com erro **bloqueia**
- Playwright fluxos criticos (login, chat) falhando **bloqueia**
- k6 thresholds ultrapassados: **warn** (nao bloqueia, mas registrar no report)
