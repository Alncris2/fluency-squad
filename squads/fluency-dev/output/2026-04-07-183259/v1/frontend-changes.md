# Frontend Changes — [AUTH] Tela de registro Angular

## Arquivos modificados
- `src/app/views/auth/register/register.component.ts` — reescrito com formulário reativo, validação, loading state, integração com AuthService
- `src/app/views/auth/register/register.component.html` — template com campos de registro, mensagens de erro, botão com loading
- `src/app/views/auth/register/register.component.spec.ts` — 8 testes de componente
- `src/app/core/service/auth.service.ts` — adicionado método `register()` e interface `RegisterPayload`

## Rotas
| Rota | Componente | Descrição |
|---|---|---|
| /auth/register | RegisterComponent | Tela de registro com validação reativa (já existia) |

## Funcionalidades implementadas
- Formulário reativo com FormBuilder (name, email, password, password_confirmation)
- Validação em tempo real: nome min 2 chars, email válido, senha min 8 chars, confirmação match
- Custom validator `passwordMatchValidator` para comparar senhas
- Loading state: botão com spinner, campos desabilitados durante request
- Tratamento de erro 422 (email duplicado, validação) com mensagem inline
- Tratamento de erro de conexão com mensagem genérica
- Toggle de visibilidade de senha
- Redireciona para `/auth/onboarding` após registro com sucesso
- Token salvo via `AuthenticationService.saveSession()` + `localStorage.fluency_token`

## Estado impactado
- `localStorage.fluency_token` — salvo após registro com sucesso
- Cookie `_FLUENCY_SESSION_` — salvo via CookieService (padrão existente)
- Nenhuma alteração em layout store ou auth store do Rizz

## Resultado dos testes
- Build produção: PASS (apenas warnings de Sass @import deprecation)
- Testes de componente: 8 specs
  - `should create`
  - `should have an invalid form when empty`
  - `should require name with min 2 chars`
  - `should require a valid email`
  - `should require password with min 8 chars`
  - `should validate password confirmation matches`
  - `should be valid when all fields are correct`
  - `should not submit when form is invalid`

## Decisões técnicas
- Reutilizou RegisterComponent existente (do Rizz) em vez de criar novo
- Reutilizou AuthenticationService existente, adicionando apenas método `register()`
- Pattern de `Subject` + `takeUntil` para cleanup de subscriptions no OnDestroy
- Validação de match de senha implementada como group validator (não campo individual)
