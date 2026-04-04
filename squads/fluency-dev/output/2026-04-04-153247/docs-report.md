# Docs Report — [AGENT] Tool: send_quiz (#20)

**Run**: 2026-04-04-153247
**Agent**: Docs
**Date**: 2026-04-04

---

## OpenAPI

- [x] Criado: `docs/openapi/quiz.yaml`
- Endpoint documentado: `POST /api/v1/quiz/{id}/answer`
- Schema `Quiz` completo com todos os campos

## ADR

- [x] Criado: `docs/adr/2026-04-04-quiz-tool-strategy.md`
- Decisão documentada: persistência via banco + endpoint separado para resposta

## Commit

`d5b3516` — `feat: QuizTool send_quiz — tool, model, migration, endpoint (closes #20)`

## Arquivos entregues

| Arquivo | Tipo |
|---|---|
| `app/Ai/Tools/QuizTool.php` | Tool nova |
| `app/Models/Quiz.php` | Model |
| `database/migrations/2026_04_04_040800_create_quizzes_table.php` | Migration (atualizada) |
| `app/Http/Controllers/Api/QuizController.php` | Controller |
| `app/Http/Requests/AnswerQuizRequest.php` | Request |
| `app/Ai/Agents/EnglishTeacherAgent.php` | Agente atualizado |
| `routes/api.php` | Rota adicionada |
| `tests/Feature/QuizToolTest.php` | 8 testes |
| `tests/Feature/EnglishTeacherAgentTest.php` | Teste atualizado (3 tools) |
| `docs/openapi/quiz.yaml` | OpenAPI 3.1 |
| `docs/adr/2026-04-04-quiz-tool-strategy.md` | ADR |
