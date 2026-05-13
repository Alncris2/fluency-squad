# Docs Report — [AUTH] Tela de registro Angular

## OpenAPI
- [x] Criado: `docs/openapi/auth.yaml`
- Endpoints documentados: POST /api/register (201 + 422)

## README
- [ ] Backend README — não atualizado (README atual é genérico do Laravel, feature de auth será consolidada quando sprint de auth concluir)

## ADR
- [x] Criado: `docs/adr/2026-04-07-sanctum-registration.md`
- Decisão: Laravel Sanctum ^4.3 instalado para registro com token stateless
- Nota: rate limiting recomendado para sprint futuro
- Nota: erros pré-existentes em StudentPreferencesTest documentados para correção

## Ação para o time
- **Corrigir testes pré-existentes**: `StudentPreferencesTest` (5 testes retornando 401 — falta `actingAs()`) e `ExampleTest` (MissingAppKeyException — falta .env no Docker de teste)
- Sugestão: criar issue no GitHub para tracking desses fixes
