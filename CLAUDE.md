# Fluency Squad - Project Instructions

Este repositorio e um fork do Opensquad adaptado para desenvolvimento de software
do Fluency AI (Laravel 13 + Angular 19).

## Comandos principais

- `/opensquad run fluency-dev` - executa o pipeline principal de desenvolvimento
- `/opensquad status fluency-dev` - consulta status da proxima task
- `/opensquad runs fluency-dev` - lista historico de execucoes
- `/opensquad dashboard` - ativa virtual office

## Regras absolutas do projeto

1. Nunca usar Prism no backend; sempre `laravel/ai`.
2. Nunca criar arquivos manualmente quando existir gerador oficial:
   - backend: `php artisan make:*`
   - frontend: `ng generate`
3. Sempre rodar `vendor/bin/pint --dirty --format agent` apos alteracoes PHP.
4. Sempre rodar testes antes de commitar.
5. Sempre consultar `search-docs` (Laravel Boost MCP) antes de implementar backend.
6. Commits no formato: `feat: descricao (closes #N)`.

## Stack e integracoes

- Supabase: backlog, decisoes, memoria de squad
- GitHub: issues, PRs e fechamento automatico por commit
- Laravel Boost MCP: docs e assistencia backend
- Playwright MCP: testes de fluxo critico

## Estrutura critica

- `skills/` - skills de dominio e integracao
- `squads/fluency-dev/` - squad principal (agentes, pipeline, memoria)
- `_opensquad/core/runner.pipeline.md` - runner com hooks de integracao dev
- `_opensquad/core/best-practices/` - guias de codigo (Laravel, Angular, commits)
