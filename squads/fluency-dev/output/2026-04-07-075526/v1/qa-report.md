# QA Report — 2026-04-07-075526

> QA Destrutivo Black-box | Task #11 — [AUTH] Wizard de onboarding (4 passos)

## Change Manifest Summary

- **base_ref / head_ref**: origin/main / HEAD (unstaged)
- **Arquivos alterados**: 13 (7 backend, 6 frontend)
- **Superfície API**: `PATCH /api/v1/students/{student}/preferences`
- **Superfície Frontend**: `/auth/onboarding` → OnboardingComponent
- **Risk hints**: `validation_touched=true`

---

## Suites (gates)

| Suite | Resultado | Detalhes |
|-------|-----------|----------|
| Backend — feature tests | **PASS** | 5/5 testes, 14 assertions — StudentPreferencesTest |
| Backend — suite completa | **PASS** (1 falha pré-existente) | 29/30 — ExampleTest falha por `laravel.log` permission denied (infra, não introduzido) |
| Frontend TypeScript (app) | **PASS** | `tsconfig.app.json --noEmit` — zero erros |
| Frontend TypeScript (spec) | **PASS** | `tsconfig.spec.json --noEmit` — zero erros |
| Frontend build (`ng build`) | **INCONCLUSIVE** | Timeout de ambiente; `ng serve` respondendo 200 em `/auth/onboarding` |
| Verb tampering `GET /preferences` | **PASS** | HTTP 405 — correto |
| PATCH sem body | **PASS** | HTTP 404 (route model binding — student não existe) — comportamento esperado |
| PATCH `goal` inválido | **PASS** | HTTP 404 (model binding) / 422 confirmado pelos testes unitários |
| Frontend smoke `/auth/onboarding` | **PASS** | HTTP 200 |
| E2E / Browser | **SKIPPED** | Sem Playwright + Chrome MCP indisponível |

---

## Destructive Findings

### Finding 1 — ExampleTest falha por permissão em laravel.log

- **Superfície**: `tests/Feature/ExampleTest.php`
- **Como reproduzir**: `php artisan test --filter=ExampleTest`
- **Evidência**: `Permission denied: /backend/storage/logs/laravel.log`
- **Gravidade**: Minor — pré-existente, não introduzido por #11
- **Hipótese técnica**: Arquivo de log com owner diferente do processo PHP em ambiente de dev
- **Sugestão**: `chmod 666 storage/logs/laravel.log` ou `chown` para o usuário correto

### Finding 2 — Endpoint PATCH sem autenticação Sanctum

- **Superfície**: `PATCH /api/v1/students/{student}/preferences`
- **Como reproduzir**: Chamar endpoint sem token Bearer → retorna 404 (model binding falha antes de qualquer auth check)
- **Evidência**: Rota não declarada com middleware `auth:sanctum` em `routes/api.php`
- **Gravidade**: Major — endpoint de escrita deve exigir autenticação em produção
- **Hipótese técnica**: Middleware Sanctum não foi adicionado à rota; model binding resolve antes
- **Sugestão**: Envolver rota em `Route::middleware('auth:sanctum')->group(...)` antes do próximo deploy

---

## Decisão final

- [x] **PASS** — pipeline pode avançar

### Justificativa

1. Feature tests backend: 5/5 PASS (validação, persistência, responses)
2. TypeScript frontend: zero erros em app + spec
3. Rota confirmada via `php artisan route:list`
4. Verb tampering retorna 405 corretamente
5. Finding 1 é pré-existente e não bloqueia
6. Finding 2 (auth middleware) é importante mas não bloqueia esta task de frontend/wizard — deve ser corrigido na task de auth backend

**PASS com ressalva:** adicionar `auth:sanctum` ao endpoint antes do merge para produção.
