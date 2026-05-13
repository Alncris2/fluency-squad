# Test Matrix — [AUTH] Tela de registro Angular

## Backend: POST /api/register

| # | Categoria | Caso | Input | Expected | Prioridade |
|---|-----------|------|-------|----------|------------|
| B1 | Happy | Registro válido | `{name, email, password, password_confirmation}` válidos | 201 + user + token | P0 |
| B2 | Negativo | Email duplicado | email já existente | 422 + validation error | P0 |
| B3 | Negativo | Campos ausentes | `{}` | 422 + errors para name, email, password | P0 |
| B4 | Negativo | Senha curta | password < 8 chars | 422 + password error | P1 |
| B5 | Negativo | Confirmação mismatch | password != password_confirmation | 422 + password error | P1 |
| B6 | Borda | Email formato inválido | "not-an-email" | 422 | P1 |
| B7 | Borda | Nome vazio string | `{name: ""}` | 422 | P1 |
| B8 | Borda | Nome com 256 chars | string de 256 chars | 422 (max:255) | P2 |
| B9 | Segurança | SQL injection no email | `'; DROP TABLE users; --` | 422 (email inválido) | P1 |
| B10 | Segurança | XSS no nome | `<script>alert(1)</script>` | 201 mas sanitizado ou sem execução | P2 |

## Frontend: /auth/register

| # | Categoria | Caso | Ação | Expected | Prioridade |
|---|-----------|------|------|----------|------------|
| F1 | Happy | Form completo válido | Preencher todos os campos corretamente | Botão habilitado | P0 |
| F2 | Happy | Submit com sucesso | Clicar "Criar conta" com dados válidos | Redirect para /onboarding | P0 |
| F3 | Validação | Nome < 2 chars | Digitar 1 char no nome | Mensagem de erro visível | P0 |
| F4 | Validação | Email inválido | Digitar "abc" no email | Mensagem de erro visível | P0 |
| F5 | Validação | Senha < 8 chars | Digitar 7 chars | Mensagem de erro visível | P0 |
| F6 | Validação | Confirmação diferente | Senha != confirmação | Mensagem "senhas não coincidem" | P0 |
| F7 | Estado | Loading state | Submeter form | Botão com spinner, campos disabled | P1 |
| F8 | Erro | Backend 422 | Email já existente | Mensagem de erro exibida | P1 |
| F9 | Erro | Rede offline | Timeout/erro de conexão | Toast de erro de conexão | P2 |
| F10 | Spec tests | Todos passando | `ng test --watch=false` | 8 specs passando | P0 |
| F11 | Build | Prod build | `ng build --configuration production` | Build sem erros | P0 |
