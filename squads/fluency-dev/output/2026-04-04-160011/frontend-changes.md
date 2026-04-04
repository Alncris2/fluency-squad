# Frontend Changes — [INFRA] Limpeza do template Rizz (#61)

## Módulos removidos (9 views + ecommerce dashboard)

| Módulo | Arquivos |
|---|---|
| `views/applications/` | ~80 arquivos (apps genéricos do template) |
| `views/advance_ui/` | ~30 arquivos (showcase de UI avançada) |
| `views/forms/` | ~20 arquivos (formulários genéricos) |
| `views/icons/` | ~5 arquivos (showcase de ícones) |
| `views/maps/` | ~15 arquivos (Google Maps, Vector Maps) |
| `views/email/` | ~10 arquivos (templates de email) |
| `views/tables/` | ~15 arquivos (tabelas genéricas) |
| `views/pages/` | ~20 arquivos (páginas genéricas) |
| `views/ui/` | ~40 arquivos (showcase de componentes UI) |
| `views/charts/` | ~20 arquivos (charts — mantido código, removida rota) |
| `views/dashboards/ecommerce/` | ~10 arquivos (dashboard e-commerce) |

**Total removido: 464 arquivos / ~48.900 linhas deletadas**

## Store limpo

- `store/calendar/` — removido (CalendarEffects, reducer, actions, selectors)
- `store/kanban/` — removido (KanbanEffects, reducer, actions, selectors)
- `store/index.ts` — atualizado (mantidos apenas layout e authentication)
- `app.config.ts` — CalendarEffects e KanbanEffects removidos dos providers

## Components removidos

- `components/vector-maps/` — WorldVectorMapComponent removido
- `views/dashboards/analytics/components/organic-traffic/` — usava vector-maps, removido

## Rotas limpas

**views.route.ts** — mantida apenas rota `dashboard`:
```ts
export const VIEW_ROUTES: Route[] = [
  { path: 'dashboard', loadChildren: () => import('./dashboards/dashboards.route')... }
]
```

**dashboards.route.ts** — mantida apenas rota `analytics` (removida `ecommerce`).

## Analytics Component

- Removido `OrganicTrafficComponent` (dependia de vector-maps)
- Mantidos: StateComponent, AudienceComponent, VisitorsComponent, BrowserComponent, TotalVisitsComponent, TrafficSourceComponent

## Testes

- `app.component.spec.ts` — atualizado (removidos testes do template 'Rizz', mantido apenas `should create`)
- `tsconfig.spec.json` — adicionado `src/polyfills.ts` no `include`
- `tsc --noEmit` no tsconfig.spec.json: **0 erros**
- `ng build --configuration production`: **0 erros TS**

## Decisões documentadas

- **FakeBackendProvider**: mantido por ora — auth.service.ts depende de User type de fake-backend. Remoção requer task de integração real com Laravel Sanctum (issue futura).
- **Charts module**: código mantido (pode ser útil para progresso do aluno), rota removida.
- **Sidebar**: já estava usando MENU_ITEMS do Fluency AI — nenhuma alteração necessária.
