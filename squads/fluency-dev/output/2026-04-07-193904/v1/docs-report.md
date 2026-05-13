# Docs Report — [FIX] Corrigir testes pré-existentes

> Run: 2026-04-07-193904 | Task: #62 | Docs Agent

## Resumo

Correção de 6 testes pré-existentes que falhavam na suite do backend Laravel. Nenhuma feature nova — apenas estabilização da CI.

## Alterações documentáveis

### 1. Autenticação em testes de API

**Antes**: `StudentPreferencesTest` criava `Student::factory()->create()` sem autenticar, resultando em 401 em rotas protegidas por `auth:sanctum`.

**Depois**: Helper `authenticatedStudent()` centraliza:
1. Criação de `User` via factory
2. Autenticação via `Sanctum::actingAs($user)`
3. Criação e retorno do `Student`

**Padrão a seguir**: Qualquer teste que acesse rota protegida deve usar `Sanctum::actingAs()` ou pattern similar.

### 2. APP_KEY no phpunit.xml

**Antes**: `phpunit.xml` não definia `APP_KEY`, causando `MissingAppKeyException` em testes que usam encryption.

**Depois**: `APP_KEY` de 32 bytes em base64 adicionada como `<env>` no `phpunit.xml`.

**Nota**: Esta key é exclusiva para testes. Não é a key de produção.

## Documentação impactada

- Nenhum ADR necessário (correção de testes, não decisão arquitetural)
- Nenhum OpenAPI impactado (sem alteração de endpoints)
- Nenhuma documentação de usuário impactada

## Recomendações

1. Considerar criar `.env.testing` no Docker para eliminar os 34 warnings de `.env` ausente
2. Manter o padrão `authenticatedStudent()` para futuros testes de API autenticada
