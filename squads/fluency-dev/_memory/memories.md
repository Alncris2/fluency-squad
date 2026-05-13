# Squad Memory: Fluency Dev

## Estilo de Escrita
- Objetivo, tecnico e orientado a entrega.

## Design Visual
- Design system proprio: DM Sans + JetBrains Mono, tokens OKLCH, soft neo-brutalism (2px borders, offset shadows 4px, radii 12-16px).
- Paleta: brand-purple oklch(0.62 0.22 285) + brand-teal oklch(0.76 0.15 175) + paper oklch(0.985 0.006 80).
- Icones: Lucide Angular (exclusivo — sem Material Icons, Font Awesome).
- Dark mode via atributo [data-theme="dark"] no html raiz.

## Estrutura de Conteudo
- Priorizar entregas pequenas com checkpoints claros.

## Proibicoes Explicitas
- Nao usar Prism.
- Nao criar arquivos manualmente quando houver geradores oficiais.

## Tecnico (especifico do squad)
- Rodar Pint e testes antes de finalizar.
- Registrar decisoes no Supabase por step.
- Frontend: Angular 21.2 standalone components (sem NgModule). Sempre ng generate.
- CSS: Tailwind v4 com @theme — tokens via --color-* e --shadow-neo-*.
- Estado: NgRx Signals Store (signalStore, withState, withMethods, withComputed).
- SSE streaming: EventSource fechado no evento "done" — nunca vazar conexao aberta.
- Auth: CSRF handshake /sanctum/csrf-cookie obrigatorio antes de login/register.
- MemoryService: 2-query strategy garante importance >= 4 sempre no contexto (critico primeiro, supplementary depois).
- gh CLI nao disponivel no WSL — usar curl com GITHUB_TOKEN para operacoes de issue.
- PHP roda via Docker: `docker compose exec backend-app php artisan test`.
- Backend monorepo path: /home/friday/projects/fluency-ai/backend.

## Historico de issues
- #5 Auth Sanctum endpoints — CONCLUIDO (63 testes, backend-only)
- #17 save_memory tool — CONCLUIDO (68 testes, MemoryService guarantee)
- #18 advance_lesson tool — CONCLUIDO (80 testes, curriculum-aware, advances unit)
- #19 flag_weak_area tool — CONCLUIDO (96 testes, dedup, top-3)
- #21 send_activity tool — CONCLUIDO (104 testes, activities table, strict cast fix)
- #22 add_to_dictionary tool — CONCLUIDO (case-insensitive dedup, times_seen increment)
- #23 Resumo automatico de sessao — CONCLUIDO (structured prompt, importance=5)
- SPRINT-2 CONCLUIDO: todos os 6 agent tools implementados

## Bug pattern descoberto
- `Request::string()` retorna Stringable, nao string pura — usar (string) cast antes de in_array com strict mode
