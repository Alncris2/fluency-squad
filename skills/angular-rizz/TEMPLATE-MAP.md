# Fluency Frontend Template Map (Angular 19)

Baseline oficial para desenvolvimento:
- `/home/friday/projects/fluency-ai/frontend`

Referencia secundaria (origem do template):
- `/home/friday/projects/rizz-angular`

## 1) Root
- `angular.json`
- `package.json`
- `tsconfig*.json`
- `public/`
- `src/`

## 2) Runtime e bootstrap
- `src/main.ts`
- `src/app/app.config.ts`
- `src/app/app.component.ts`
- `src/app/app.routes.ts`

## 3) Layout shell
- `src/app/layouts/layout/layout.component.ts`
- `src/app/layouts/vertical/vertical.component.ts`
- `src/app/layouts/sidebar/sidebar.component.ts`
- `src/app/layouts/topbar/topbar.component.ts`
- `src/app/layouts/footer/footer.component.ts`

## 4) Navigation data
- `src/app/common/menu-items.ts`
- `src/app/common/constants.ts`

## 5) Store (NgRx)
- Root: `src/app/store/index.ts`
- `src/app/store/layout/*`
- `src/app/store/authentication/*`
- `src/app/store/calendar/*`
- `src/app/store/kanban/*`

## 6) Core
- Diretrizes/helpers/services em `src/app/core/**`
- Interceptors (Fluency):
  - `src/app/core/interceptors/auth.interceptor.ts`

## 7) Views domains
- `src/app/views/views.route.ts` agrega dominios.
- Dominios:
  - `advance_ui/`
  - `applications/`
  - `auth/`
  - `charts/`
  - `dashboards/`
  - `email/`
  - `forms/`
  - `icons/`
  - `maps/`
  - `pages/`
  - `tables/`
  - `ui/`

## 8) Route files
- `views.route.ts`
- `advance_ui/advance-ui.route.ts`
- `applications/apps.route.ts`
- `applications/analytics/analytics.route.ts`
- `applications/ecommerce/ecommerce.route.ts`
- `applications/projects/projects.route.ts`
- `auth/auth.route.ts`
- `charts/charts.route.ts`
- `dashboards/dashboards.route.ts`
- `email/email.route.ts`
- `forms/forms.route.ts`
- `icons/icons.route.ts`
- `maps/maps.route.ts`
- `pages/pages.route.ts`
- `tables/tables.route.ts`
- `ui/ui.route.ts`

## 9) Components shared do template
- `src/app/components/card-title.component.ts`
- `src/app/components/logo-box/*`
- `src/app/components/table/table-header/*`
- `src/app/components/table/table-footer/*`
- `src/app/components/toasts-container.component.ts`
- `src/app/components/vector-maps/*`

## 10) Theme / SCSS
Entrypoint global:
- `src/styles.scss`

SCSS do template:
- `public/assets/scss/bootstrap.scss`
- `public/assets/scss/app.scss`
- `public/assets/scss/config/_variables.scss`
- `public/assets/scss/config/_variables-dark.scss`
- `public/assets/scss/componets/*`
- `public/assets/scss/structure/*`
- `public/assets/scss/plugins/*`
- `public/assets/scss/pages/*`

## 11) Dependencias e scripts
- Dependencias e scripts sao definidos no `package.json` do Fluency frontend.
- Para alteracoes de stack, revisar tambem `skills/angular-rizz/ANGULAR19-DELTA.md`.

## 12) Regras de adaptacao para squad
- Nao quebrar shell/layout/store base.
- Criar features novas em `views/` e reuso em `shared/`.
- Nao introduzir nova lib UI sem validar stack atual.
- Preservar padrao standalone e lazy routes por dominio.
