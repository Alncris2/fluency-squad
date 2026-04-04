# Backend Changes — [INFRA] Monorepo + Docker Compose

## Arquivos criados

- `routes/api.php` — rota `/api/health` (GET, retorna status 200 + timestamp)
- `config/cors.php` — publicado via `php artisan config:publish cors`

## Arquivos alterados

- `bootstrap/app.php`
  - Adicionado `api: routes/api.php` ao routing
  - Adicionado `$middleware->statefulApi()` para Sanctum + CORS no contexto da API

- `config/cors.php`
  - `allowed_origins`: de `['*']` → `[env('FRONTEND_URL', 'http://localhost:4200')]`
  - `supports_credentials`: de `false` → `true` (necessário para Sanctum com cookies)
  - `exposed_headers`: adicionado `Content-Type` e `X-Request-Id`

## Arquivos criados no monorepo (raiz)

- `.env.example` — variáveis documentadas: APP_KEY, FRONTEND_URL, DB_*, REDIS_*, ANTHROPIC_API_KEY, SUPABASE_*
- `Makefile` — comandos: `make up/down/restart/logs/shell/test/test-coverage/migrate/migrate-fresh/pint/artisan/build/ps`
- `README.md` — instruções completas de setup: pré-requisitos, clone, .env, make up, migrate, URLs

## Resultado dos testes

```
Tests: 5 passed (5 assertions)
Duration: 0.83s

- ExampleTest: 1 passou
- AiSdkTest: 3 passaram (FluencyAgent)
- Unit/ExampleTest: 1 passou
```

Cobertura: testes existentes mantidos — nenhum teste novo necessário para este step de infra.

## Decisões técnicas

1. **CORS com `supports_credentials: true`**: necessário para o Sanctum funcionar com cookies de sessão entre `:4200` e `:8000`. A origem é configurável via `FRONTEND_URL` no `.env`.
2. **`$middleware->statefulApi()`**: habilita automaticamente `EncryptCookies`, `AddQueuedCookiesToResponse`, `StartSession`, `VerifyCsrfToken`, `SubstituteBindings` e `HandleCors` para todas as rotas de API — padrão Laravel 13 para Sanctum SPA.
3. **Makefile na raiz do monorepo**: centraliza todos os comandos de desenvolvimento independente de estar no subdiretório backend ou frontend.
