# Docs Report — [INFRA] Limpeza do template Rizz (#61)

**Run**: 2026-04-04-160011
**Agent**: Docs
**Date**: 2026-04-04

---

## ADR

- [x] Criado: `frontend/docs/adr/2026-04-04-rizz-template-cleanup.md`
- Documenta: o que foi mantido, removido, e decisão pendente sobre FakeBackendProvider

## Commit

`087ed73` — `feat: limpeza do template Rizz — remove 9 módulos, calendar/kanban store, vector-maps (closes #61)`

## Arquivos entregues

| Arquivo | Tipo |
|---|---|
| `src/app/views/views.route.ts` | Rota limpa (só dashboard) |
| `src/app/views/dashboards/dashboards.route.ts` | Rota limpa (só analytics) |
| `src/app/views/dashboards/analytics/analytics.component.ts` | Sem organic-traffic |
| `src/app/store/index.ts` | Sem calendar/kanban |
| `src/app/app.config.ts` | Sem CalendarEffects/KanbanEffects |
| `src/app/app.component.spec.ts` | Teste limpo (sem referência a 'Rizz') |
| `tsconfig.spec.json` | polyfills.ts adicionado ao include |
| 464 arquivos deletados | views, store, components |
| `frontend/docs/adr/2026-04-04-rizz-template-cleanup.md` | ADR |

## Próximos passos sugeridos

1. **Nova task**: `[AUTH] Integração real com Laravel Sanctum` — remove FakeBackendProvider
2. **Nova task**: `[DASHBOARD] Substituir dados demo por dados reais do aluno` — usa API do backend
