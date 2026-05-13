# Backend Changes — Auth Sanctum #5

## Arquivos criados

| Arquivo | Tipo | Descrição |
|---|---|---|
| `app/Http/Resources/UserResource.php` | Resource | Resource padrão do User (id, name, email, created_at) |
| `app/Http/Controllers/Api/MeController.php` | Controller | GET /api/auth/me — retorna dados do usuário autenticado |
| `tests/Feature/Api/MeControllerTest.php` | Teste | 4 cenários para o endpoint GET /api/auth/me |

## Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `routes/auth.php` | Adicionado prefixo `/auth/` em todas as rotas; adicionada rota `GET auth/me`; onboarding routes movidas para grupo separado |
| `tests/Feature/Api/RegisterControllerTest.php` | URLs atualizadas para `/api/auth/register` |
| `tests/Feature/Api/LoginControllerTest.php` | URLs atualizadas para `/api/auth/login` |
| `tests/Feature/Api/LogoutControllerTest.php` | URLs atualizadas para `/api/auth/logout` |

## Endpoints adicionados/corrigidos

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Registro de usuário | Não |
| POST | `/api/auth/login` | Login com email/senha | Não |
| POST | `/api/auth/logout` | Logout (remove token) | Bearer token |
| GET | `/api/auth/me` | Dados do usuário autenticado | Bearer token |
| POST | `/api/auth/forgot-password` | Recuperação de senha | Não |
| POST | `/api/auth/reset-password` | Reset de senha com token | Não |

## Resultado dos testes

- **63 testes passando** (191 assertions)
- **Auth: 19 testes** (Register: 5, Login: 8, Logout: 2, Me: 4)
- Suite completa: 0 failures, 0 errors
- Pint: `{"result":"pass"}` — sem problemas de estilo

## Decisões técnicas

1. **Rota `/auth/` prefix**: O frontend já consumia `/api/auth/login`, `/api/auth/register` etc. As rotas antigas sem prefixo estavam incorretas. Corrigido o `routes/auth.php` para alinhar backend com frontend.

2. **MeController invokable**: Segue padrão single-action controller já usado no projeto. Consulta o Student pelo email para computar `onboarding_completed` (a flag é derivada, não persistida em `users`).

3. **UserResource**: Expõe apenas `id`, `name`, `email`, `created_at`. O campo `onboarding_completed` é retornado pelo controller na chave raiz (fora do resource), pois é computado via Student, não pertence ao modelo User.

4. **Sem migração nova**: O campo `onboarding_completed` não foi adicionado à tabela `users` pois é derivado da existência de preferências no Student. Mantida consistência com a lógica já existente no LoginController.

5. **Pint + full suite green**: Todos os 63 testes (incluindo 15 pré-existentes fora de Auth) continuam passando após as mudanças.
