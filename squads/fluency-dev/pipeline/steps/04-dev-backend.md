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
3. Ler estrutura atual de app/ para evitar duplicatas

Implementacao:
4. Usar php artisan make:* para TODOS os artefatos
5. Implementar seguindo padroes PHP 8.4 (constructor promotion, type hints)
6. Nunca usar Prism — sempre laravel/ai
7. Controllers finos; logic em Services/Actions

Qualidade:
8. vendor/bin/pint --dirty --format agent
9. php artisan test (cobertura >= 80% na feature nova)

Relatorio:
10. Produzir output/{run_id}/backend-changes.md
11. Registrar decisao em squad_decisions
```

---

## Saida esperada

- Arquivos criados/alterados em `/home/friday/projects/fluency-ai/backend`
- `output/{run_id}/backend-changes.md` preenchido
- Testes passando com cobertura >= 80%

## Nota sobre paralelismo

Este step roda em PARALELO com Step 05 (Dev Frontend). Ambos dependem apenas do checkpoint Step 03.
