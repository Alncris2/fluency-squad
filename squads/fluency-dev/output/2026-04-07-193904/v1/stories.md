# Stories — [FIX] Corrigir testes pré-existentes

> Task: #62 | Sprint: 1 (infra) | Scope: backend only

---

## Story 1 — Corrigir StudentPreferencesTest (401 → 200/422)

**APA Phase**: Ajustar

Como desenvolvedor
Quero que os 5 testes de StudentPreferencesTest passem autenticados
Para garantir confiabilidade da suite de CI

### Critérios de Aceite

**Cenário 1: Patch com payload válido**
Given um student autenticado via Sanctum
When PATCH /api/v1/students/{id}/preferences com payload válido
Then retorna 200 e persiste preferences

**Cenário 2: Validações retornam 422**
Given um student autenticado via Sanctum
When PATCH com campos ausentes (goal, interests, availability)
Then retorna 422 com erros de validação detalhados

**Cenário 3: Goal inválido**
Given um student autenticado via Sanctum
When PATCH com goal fora dos valores permitidos
Then retorna 422

### Fix esperado
- Adicionar `Sanctum::actingAs($user)` ou `actingAs($user)` em cada teste
- Criar user associado ao student se necessário
- Garantir que Student model tem relação com User

---

## Story 2 — Corrigir ExampleTest (MissingAppKeyException)

**APA Phase**: Ajustar

Como desenvolvedor
Quero que o ExampleTest passe sem erro de APP_KEY
Para que a suite de testes funcione corretamente no Docker

### Critérios de Aceite

**Cenário 1: App retorna resposta válida**
Given o ambiente de teste tem APP_KEY configurado
When GET / é chamado
Then retorna 200 (ou status esperado)

### Fix esperado
- Adicionar `APP_KEY` no `phpunit.xml` como env variable
- OU criar `.env.testing` no container Docker
- OU usar `CreatesApplication` trait com key generation

---

## Story 3 — Validar suite completa sem falhas

**APA Phase**: Ajustar

Como desenvolvedor
Quero rodar `php artisan test` e obter 0 failures
Para confirmar que nenhuma regressão existe

### Critérios de Aceite

**Cenário 1: Suite completa**
Given todas as correções aplicadas
When `php artisan test` é executado
Then 0 failures, 0 errors (warnings de .env são aceitáveis)

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | 0% | N/A (task de fix, não feature) |
| Praticar | 0% | N/A |
| Ajustar  | 100% | Stories 1, 2, 3 |

- [x] Task de correção — APA não se aplica diretamente
- [x] Critérios GIVEN/WHEN/THEN mensuráveis
