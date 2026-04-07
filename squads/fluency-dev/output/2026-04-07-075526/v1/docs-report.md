# Docs Report — [AUTH] Wizard de onboarding (4 passos) (#11)

## OpenAPI

- [x] Criado: `docs/openapi/student.yaml`
- Endpoint documentado: `PATCH /api/v1/students/{student}/preferences`
- Schemas: `OnboardingPreferences`, `StudentResource`, `ValidationError`
- Security: `sanctum` bearer

## README

- [x] Backend `README.md` reescrito — tabela de endpoints atualizada com PATCH preferences
- [x] Frontend `README.md` atualizado — wizard de onboarding adicionado à tabela de features

## ADR

- Nenhum ADR necessário neste ciclo (sem mudança de padrão arquitetural — endpoint segue o padrão existente de `students/{student}/...`)

## Fix de segurança incluído

- `routes/api.php`: adicionado `middleware('auth:sanctum')` ao `PATCH preferences` (finding do QA corrigido antes do commit)

## Checklist de aceite

- [x] OpenAPI criado para endpoint novo
- [x] Backend README atualizado com tabela de endpoints
- [x] Frontend README atualizado com nova feature
- [x] Fix auth:sanctum aplicado e Pint executado
- [x] `docs-report.md` produzido
