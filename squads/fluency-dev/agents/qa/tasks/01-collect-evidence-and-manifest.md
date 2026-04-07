# Task 01 — Collect Evidence and Manifest

## Objetivo

Gerar:
1. `output/{run_id}/diff.patch`
2. `output/{run_id}/files.changed.json`
3. `output/{run_id}/change-manifest.json` (validavel pelo schema em `schemas/change-manifest.schema.json`)

---

## Entradas permitidas

- `git diff` / `git status` / `git log` nos repositorios backend e frontend
- `output/{run_id}/backend-changes.md` e `output/{run_id}/frontend-changes.md` (SEM interpretar semantica de negocio — usar apenas para extrair superficies: arquivos, rotas, endpoints, componentes)
- Comandos utilitarios para extrair rotas/endpoints (`php artisan route:list --json`, etc.)
- `database-schema` via Laravel Boost MCP (leitura)

## Entradas PROIBIDAS

- `output/{run_id}/stories.md`
- `output/{run_id}/task-brief.yaml`
- `_memory/company.md` (secao de contexto de produto)

---

## Procedimento

1. Definir `base_ref` (ex: `origin/main`) e `head_ref` (`HEAD`). Registrar no manifesto.
2. Gerar `diff.patch`:
   ```bash
   cd /home/friday/projects/fluency-ai/backend && git diff origin/main...HEAD > /tmp/backend.patch
   cd /home/friday/projects/fluency-ai/frontend && git diff origin/main...HEAD > /tmp/frontend.patch
   ```
3. Gerar `files.changed.json`:
   ```bash
   git diff --name-status origin/main...HEAD
   ```
   Classificar cada arquivo por `layer`: backend (`*.php`, `routes/`, `database/migrations/`), frontend (`src/app/`, `*.ts`, `*.html`, `*.scss`), infra (`.github/`, `docker/`), docs (`*.md` fora de `app/`).
4. Extrair superficies de API:
   - Executar `php artisan route:list --json` no backend
   - Filtrar rotas cujo controller/arquivo esta na lista de arquivos alterados
   - Para cada rota: registrar method, path, auth (middleware), handler_hint
5. Extrair superficies de frontend:
   - Identificar rotas Angular impactadas (arquivos de routing + componentes alterados)
   - Listar componentes alterados com selector_hint
   - Listar `data-testid` existentes nos templates alterados
6. Gerar `risk_hints`:
   - `auth_touched`: algum path inclui `auth`, `middleware`, `sanctum`, `guard`
   - `validation_touched`: algum FormRequest ou arquivo com `rules` alterado
   - `db_schema_touched`: alguma migration alterada ou criada
   - `streaming_touched`: algum arquivo menciona `SSE`, `StreamedResponse`, `EventSource`
   - `high_risk_paths`: listar paths que combinam 2+ flags acima
7. Preencher `evidence.commands_run` e `evidence.git_diff_paths`.
8. Validar JSON contra o schema.

---

## Output (formato obrigatorio)

- `change-manifest.json` (JSON valido, conforme schema)
- `diff.patch` (texto)
- `files.changed.json` (JSON array)

---

## Criterio de bloqueio imediato

Se nao conseguir extrair endpoints/rotas de forma deterministica:
- Registrar a limitacao em `risk_hints.high_risk_paths`
- Aumentar a matriz de smoke E2E (Task 02) para cobrir mais rotas candidatas
