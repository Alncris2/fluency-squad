# Stories — #5 Auth Sanctum — endpoints
# Gerado por: PM
# Run: 2026-04-18-162930

## Contexto

Implementar os 4 endpoints de autenticação via Laravel Sanctum.
Escopo: backend only. Frontend já possui AuthService + guards prontos
(implementados no run 2026-04-18-160111).

---

## US-01 · Registro de novo usuário

**Como** visitante não autenticado,
**Quero** criar uma conta com nome, email e senha,
**Para** acessar a plataforma.

**Critérios de aceite:**

- GIVEN `POST /api/auth/register` com `{name, email, password, password_confirmation}`
- WHEN os dados são válidos
- THEN retorna `201` com `UserResource` + token Sanctum no campo `token`

- GIVEN email já cadastrado
- WHEN chamada ao endpoint
- THEN retorna `422` com mensagem `"email já está em uso"`

- GIVEN `password` < 8 caracteres
- WHEN chamada ao endpoint
- THEN retorna `422` com erro de validação no campo `password`

**Artefatos:**
- `app/Http/Requests/Auth/RegisterRequest.php`
- `app/Http/Controllers/Auth/RegisterController.php`
- `app/Http/Resources/UserResource.php`
- Rota em `routes/auth.php`

---

## US-02 · Login com credenciais

**Como** usuário cadastrado,
**Quero** fazer login com email e senha,
**Para** obter um token de acesso.

**Critérios de aceite:**

- GIVEN `POST /api/auth/login` com `{email, password}`
- WHEN as credenciais são válidas
- THEN retorna `200` com `UserResource` + `token`

- GIVEN credenciais inválidas
- WHEN chamada ao endpoint
- THEN retorna `401` com mensagem `"Credenciais inválidas"`

- GIVEN campos obrigatórios ausentes
- WHEN chamada ao endpoint
- THEN retorna `422` com erros de validação

**Artefatos:**
- `app/Http/Requests/Auth/LoginRequest.php`
- `app/Http/Controllers/Auth/LoginController.php`

---

## US-03 · Logout

**Como** usuário autenticado,
**Quero** encerrar minha sessão,
**Para** invalidar meu token de acesso.

**Critérios de aceite:**

- GIVEN `POST /api/auth/logout` com token válido no header `Authorization: Bearer {token}`
- WHEN chamada ao endpoint
- THEN retorna `200` com `{message: "Logout realizado com sucesso"}`
- AND o token é removido do banco (`personal_access_tokens`)

- GIVEN chamada sem token
- WHEN chamada ao endpoint
- THEN retorna `401`

**Artefatos:**
- `app/Http/Controllers/Auth/LogoutController.php`

---

## US-04 · Perfil do usuário autenticado

**Como** usuário autenticado,
**Quero** consultar meus dados de perfil,
**Para** que o frontend possa exibir informações personalizadas.

**Critérios de aceite:**

- GIVEN `GET /api/auth/me` com token válido
- WHEN chamada ao endpoint
- THEN retorna `200` com `UserResource` (id, name, email, onboarding_completed, created_at)

- GIVEN chamada sem token
- WHEN chamada ao endpoint
- THEN retorna `401`

**Artefatos:**
- `app/Http/Controllers/Auth/MeController.php`

---

## Rota de grupo

```php
// routes/auth.php
Route::prefix('auth')->group(function () {
    Route::post('register', RegisterController::class);
    Route::post('login', LoginController::class);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', LogoutController::class);
        Route::get('me', MeController::class);
    });
});
```

---

## Testes obrigatórios (PHPUnit)

| Teste | Cenário |
|-------|---------|
| `RegisterTest` | registro válido retorna 201 + token |
| `RegisterTest` | email duplicado retorna 422 |
| `RegisterTest` | senha curta retorna 422 |
| `LoginTest` | login válido retorna 200 + token |
| `LoginTest` | credenciais erradas retorna 401 |
| `LogoutTest` | logout com token válido retorna 200 + token removido |
| `LogoutTest` | logout sem token retorna 401 |
| `MeTest` | me com token válido retorna user |
| `MeTest` | me sem token retorna 401 |

**Critério de done:** `php artisan test --filter=Auth` passando 100%.

---

_Aprovação requerida antes do Dev Backend implementar._
