# Test Matrix — 2026-04-07-065833

> Gerada por QA Destrutivo (black-box). Sem interpretação de regras de negócio.
> Risk hints ativos: `auth_touched`, `validation_touched`

---

## API Surface

### POST /api/login

- **Smoke happy**: POST com `{"email":"valid@test.com","password":"12345678"}` → espera 200 + token no response
- **Negatives**:
  - N1: POST sem body → espera 422 (validation error)
  - N2: POST com `email` ausente → espera 422
  - N3: POST com `password` ausente → espera 422
  - N4: POST com credenciais incorretas → espera 401 ou 422 (sem token)
  - N5: POST com token Bearer inválido já no header → endpoint deve ignorar ou retornar 401
- **Edges**:
  - E1: `email` com 254+ chars → espera 422 (não crash)
  - E2: `password` com 1 char → espera 422 (client-side bloca, mas backend deve validar também)
  - E3: `password` com 1000 chars → espera 422 ou 200 (sem crash/5xx)
  - E4: `email` com unicode (ex: `teste@büro.de`) → sem 500
  - E5: body com campos extras (`{"email":"a@b.com","password":"12345678","admin":true}`) → ignorar extras, sem 500
- **Concurrency/race**: 10 requests simultâneos com mesmo body → todos devem retornar 200 ou 401, zero 5xx
- **Verb tampering**: GET /api/login → espera 405 Method Not Allowed, não 500
- **Auth edge cases** (risk: auth_touched):
  - Request com header `Authorization: Bearer expired_token` → endpoint público não deve rejeitar (ou retornar 401 limpo)
- **Failure criteria**: qualquer 5xx bloqueia pipeline; 401 em credenciais corretas bloqueia; 200 em credenciais incorretas bloqueia

---

## Frontend Surface

### /auth/log-in (LoginComponent)

- **Smoke render**: navegar para `/auth/log-in` → página carrega, formulário visível, zero erros de console
- **Negatives**:
  - N1: submit com email vazio → erro inline "Informe um e-mail válido" visível, sem request HTTP
  - N2: submit com email formato inválido (`usuario`) → erro inline visível
  - N3: submit com senha < 8 chars → erro inline "A senha deve ter ao menos 8 caracteres" visível
  - N4: submit com ambos campos inválidos → ambos erros inline visíveis simultaneamente
- **Edges**:
  - E1: email com espaços em branco no início/fim → validação deve disparar ou campo normaliza
  - E2: senha com exatamente 8 chars → deve aceitar (não mostrar erro)
  - E3: duplo-clique rápido em "Entrar" → não deve disparar 2 requests (botão desabilita no 1º click)
- **Visual/a11y**:
  - Labels associados aos inputs via `for`/`id` ou `aria-label`
  - Botão "Entrar" tem role `button`
  - Erros inline têm role `alert` ou `aria-describedby` no input
  - Header com cor `#6C63FF` não quebra layout em mobile (375px)
- **Auth edge cases** (risk: auth_touched):
  - Acessar `/auth/log-in` já autenticado → deve redirecionar para `/dashboard`, não renderizar formulário
  - Store `isLoading=true` → botão "Entrar" deve estar desabilitado
  - Store `error="Http failure..."` → banner de erro de conexão visível
- **Validation edge cases** (risk: validation_touched):
  - Formulário com `Validators.minLength(8)` — verificar que erro aparece com 7 chars e desaparece com 8
  - Erro de validação deve limpar ao corrigir o campo (updateOn: 'blur' ou 'change')
- **Failure criteria**: erros inline não aparecem ao submeter inválido → bloqueia; duplo-submit dispara 2 requests → bloqueia; auth guard não redireciona usuário logado → bloqueia

### NgRx AuthenticationReducer (auth_touched)

- **Smoke**: action `login` → estado `isLoading: true`; action `loginSuccess` → `isLoading: false, isLoggedIn: true`; action `loginFailure` → `isLoading: false, error: <string>`
- **Regression**: ações `logout` → `isLoading: false` (não deve quebrar logout existente)
- **Edge**: múltiplas ações `loginFailure` sequenciais → estado consistente, sem acúmulo de erros
- **Failure criteria**: `isLoading` não limpa após `loginSuccess`/`loginFailure` → bloqueia (spinner permanente)

---

## Risk-Conditioned Checks

### Auth Edge Cases (auth_touched = true)

- Token expirado em rota protegida → AuthGuard redireciona para `/auth/log-in`
- Logout após login bem-sucedido → `isLoggedIn: false`, redirect para `/auth/log-in`
- Store state persiste corretamente entre navegações (NgRx sem `localStorageSyncReducer` de auth)

### Validation Edge Cases (validation_touched = true)

- Payloads com campos extras no POST /api/login → sem 500
- `Validators.minLength(8)` presente no FormGroup — verificar via inspeção do componente
- Campos com `required` devem disparar erro ao blur sem submit
