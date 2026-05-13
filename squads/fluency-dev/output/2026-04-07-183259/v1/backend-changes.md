# Backend Changes — [AUTH] Tela de registro Angular

## Arquivos criados
- `app/Http/Controllers/Api/RegisterController.php` — controller com método store
- `app/Http/Requests/RegisterRequest.php` — form request com validação
- `tests/Feature/Api/RegisterControllerTest.php` — 5 testes de integração
- `config/sanctum.php` — configuração do Sanctum (publicada)
- `database/migrations/*_create_personal_access_tokens_table.php` — migration do Sanctum

## Arquivos modificados
- `app/Models/User.php` — adicionado trait `HasApiTokens`
- `routes/api.php` — adicionada rota POST /api/register
- `composer.json` / `composer.lock` — adicionado `laravel/sanctum ^4.3`

## Endpoints adicionados
| Método | Rota | Descrição |
|---|---|---|
| POST | /api/register | Cria usuário e retorna token Sanctum (201) |

## Validações do endpoint
| Campo | Regras |
|---|---|
| name | required, string, max:255 |
| email | required, string, email, max:255, unique:users |
| password | required, string, min:8, confirmed |

## Resultado dos testes
- RegisterControllerTest: 5 testes passando (21 assertions)
  - `test_successful_registration_returns_201_with_token`
  - `test_duplicate_email_returns_422`
  - `test_missing_required_fields_returns_422`
  - `test_password_too_short_returns_422`
  - `test_password_confirmation_mismatch_returns_422`
- Pint: pass (sem erros de estilo)

## Decisões técnicas
- Instalou `laravel/sanctum ^4.3` (não estava presente no projeto)
- Publicou migrations e config do Sanctum
- User model recebeu trait `HasApiTokens` para gerar tokens
- Controller fino: validação no FormRequest, criação + token no controller
- Rota pública (sem middleware auth) em `/api/register`
