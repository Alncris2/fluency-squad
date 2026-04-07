# Backend Changes — [AUTH] Wizard de onboarding (#11)

## Discovery

- `routes/api.php`: rota `PATCH students/{student}/preferences` **não existia**
- `app/Models/Student.php`: campo `preferences` com `cast => 'array'` confirmado; usa `HasUuids`; `HasFactory` não estava presente (adicionado)
- `app/Http/Controllers/Api/StudentController.php`: **não existia**
- `app/Http/Resources/StudentResource.php`: **não existia**
- `database/migrations/2026_04_04_040759_create_students_table.php`: campo `level` é enum `['beginner', 'intermediate', 'advanced']` (relevante para factory)

## Arquivos criados

- `app/Http/Requests/UpdatePreferencesRequest.php` — FormRequest com todas as regras de validação do payload
- `app/Http/Controllers/Api/StudentController.php` — controller com método `updatePreferences`
- `app/Http/Resources/StudentResource.php` — resource que expõe todos os campos do Student incluindo `preferences`
- `database/factories/StudentFactory.php` — factory para uso em testes
- `tests/Feature/Api/StudentPreferencesTest.php` — 5 testes cobrindo os cenários de sucesso e validação

## Arquivos alterados

- `routes/api.php` — adicionado `use StudentController` e rota `Route::patch('preferences', ...)`
- `app/Models/Student.php` — adicionado `use HasFactory` e trait `HasFactory`

## Endpoints

| Method | Path | Auth | Status |
|--------|------|------|--------|
| PATCH | /api/v1/students/{student}/preferences | público (sem sanctum por ora) | 200/422 |

## Testes

- Arquivo: `tests/Feature/Api/StudentPreferencesTest.php`
- Comando: `php artisan test --filter=StudentPreferences`
- Resultado: **PASS — 5 testes, 14 assertions**

```
PASS  Tests\Feature\Api\StudentPreferencesTest
✓ patch com payload valido retorna 200 e persiste preferences   0.19s
✓ patch sem goal retorna 422                                    0.01s
✓ patch sem interests retorna 422                               0.01s
✓ patch com goal invalido retorna 422                           0.02s
✓ patch com availability days vazio retorna 422                 0.01s

Tests:    5 passed (14 assertions)
Duration: 0.30s
```

## Pint

- Resultado: **pass** (sem arquivos alterados na segunda execução)

## Checklist

- [x] Nenhum arquivo criado manualmente
- [x] Pint executado
- [x] Testes passando
