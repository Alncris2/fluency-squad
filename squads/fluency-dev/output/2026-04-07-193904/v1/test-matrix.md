# Test Matrix — [FIX] Corrigir testes pré-existentes

## Backend (php artisan test)

| Suite | Testes | Status | Assertions |
|-------|--------|--------|------------|
| Unit\ExampleTest | 1 | ✅ pass | 1 |
| Feature\AiSdkTest | 3 | ⚠️ warn (.env) | — |
| Feature\Api\RegisterControllerTest | 5 | ⚠️ warn (.env) | 5 |
| Feature\Api\StudentPreferencesTest | 5 | ⚠️ warn (.env) | 11 |
| Feature\EnglishTeacherAgentTest | 12 | ⚠️ warn (.env) | — |
| Feature\ExampleTest | 1 | ⚠️ warn (.env) | 1 |
| Feature\QuizToolTest | 8 | ⚠️ warn (.env) | — |

**Totais**: 35 testes, 0 failures, 34 warnings, 101 assertions

## Pint (linter)

| Check | Status |
|-------|--------|
| `vendor/bin/pint --dirty` | ✅ 0 arquivos alterados |

## Notas

- Warnings são todos `file_get_contents(/var/www/.env): Failed to open stream` — `.env` ausente no container Docker. Não impactam funcionalidade.
- Nenhum teste falha. Suite estável.
