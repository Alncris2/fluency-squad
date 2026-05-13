---
step: "04"
name: "Dev Backend"
type: agent
agent: dev-backend
depends_on: step-03
model_tier: powerful
---

# Step 04 — Dev Backend

## Objetivo

Implementar as mudancas no backend Laravel 13 conforme as stories aprovadas no checkpoint.

---

## Entradas

- `output/{run_id}/task-brief.yaml` — escopo e contexto
- `output/{run_id}/stories.md` — stories aprovadas (criterios de aceite)
- `skills/laravel-ai-sdk/SKILL.md` — padroes do laravel/ai
- `skills/laravel-boost-mcp/SKILL.md` — protocolo de docs e schema

---

## Instrucoes para o Dev Backend

```
Protocolo obrigatorio antes de implementar:
1. search-docs("<topico da feature>") via Laravel Boost MCP
2. database-schema("<tabelas impactadas>")
3. Ler estrutura atual de app/ para evitar duplicatas:
   ls app/Core/          ← mapear entidades ja existentes
   ls app/Http/Controllers/
   ls app/Ai/Agents/

Implementacao — Core Architecture (obrigatoria):
4. Toda entidade nova vive em app/Core/{Entity}/
   - app/Core/{Entity}/Repositories/{Entity}Repository.php  extends AbstractRepository
   - app/Core/{Entity}/Services/{Entity}Service.php         extends AbstractService
   - app/Core/{Entity}/DTOs/{Entity}DTO.php                 extends AbstractDTO (se necessario)
5. Models sao acessados SOMENTE pelos Repositories (nunca Model:: em Services/Controllers)
6. Regras de negocio SOMENTE nos Services (hooks beforeSave, afterSave, beforeUpdate, etc.)
7. Usar php artisan make:* para TODOS os artefatos; mover/ajustar namespace para app/Core/{Entity}/
8. Implementar seguindo padroes PHP 8.4 (constructor promotion, type hints)
9. Nunca usar Prism — sempre laravel/ai
10. Controllers finos; delegam ao Service

Qualidade:
11. vendor/bin/pint --dirty --format agent
12. php artisan test (cobertura >= 80% na feature nova)

Verificacao via Tinker:
13. php artisan tinker — testar CRUD real de cada model/endpoint via Service (nao model direto)
14. Se algo falhar no tinker, corrigir antes de reportar
15. Se encontrar inconsistencia nas stories, registrar no backend-changes.md para o PM

Relatorio:
16. Produzir output/{run_id}/backend-changes.md (inclui resultado do tinker)
17. Registrar decisao em squad_decisions
```

---

## Saida esperada

- Arquivos criados/alterados em `/home/friday/projects/fluency-ai/backend`
- `output/{run_id}/backend-changes.md` preenchido
- Testes passando com cobertura >= 80%

## Nota sobre paralelismo

Este step roda em PARALELO com Step 05 (Dev Frontend). Ambos dependem apenas do checkpoint Step 03.
