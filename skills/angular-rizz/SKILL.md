---
name: Angular Rizz
version: 3.0.0
type: knowledge
description: Guia operacional do Rizz adaptado ao Fluency AI em Angular 19, com baseline real do projeto e delta de dependencias
---

# Angular Rizz Skill (Fluency Angular 19)

## Objetivo
Esta skill define como implementar frontend no Fluency AI preservando a arquitetura do template Rizz.
A referencia primaria e o projeto real:
- `/home/friday/projects/fluency-ai/frontend` (Angular 19)

A referencia secundaria e o template original:
- `/home/friday/projects/rizz-angular` (Angular 18 base)

## Documentos de apoio
- `skills/angular-rizz/TEMPLATE-MAP.md`: mapa estrutural completo.
- `skills/angular-rizz/ANGULAR19-DELTA.md`: diferencas de dependencias e runtime entre Rizz base e Fluency.

## Baseline oficial para codar
Sempre validar primeiro no frontend real do Fluency:
- `package.json`
- `angular.json`
- `tsconfig.json`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `src/app/views/views.route.ts`
- `src/app/store/**`
- `src/app/layouts/**`
- `src/app/common/menu-items.ts`
- `src/app/core/interceptors/auth.interceptor.ts`
- `public/assets/scss/config/_variables.scss`

## Stack alvo (confirmada no Fluency)
- Angular `19.2.x`
- Angular CLI/Builder `19.2.x`
- TypeScript `^5.8.3`
- NgRx `19.2.x`
- ng-bootstrap `18.x`
- zone.js `~0.15.0`
- Bootstrap `5.3`

## Arquitetura e regras de integracao

### 1) App shell e roteamento
- Manter shell atual (`layout/vertical/topbar/sidebar/footer`) estavel.
- Manter lazy loading por dominio de `views/`.
- Novas features devem entrar em `src/app/views/` e integrar por rotas.

### 2) Estado global (zona protegida)
- Nao quebrar slices existentes:
  - `layout`
  - `authentication`
  - `Calendar`
  - `Task`
- Nao alterar contratos de state do layout/auth sem task especifica.
- Para feature nova, criar estado isolado por feature.

### 3) Autenticacao e HTTP
- Respeitar fluxo atual baseado em cookie de sessao + token.
- Interceptor atual (`AuthInterceptor`) injeta bearer quando:
  - cookie `_FLUENCY_SESSION_` existe
  - `localStorage.fluency_token` existe
- Nao duplicar estrategia de auth sem necessidade.

### 4) Design system e tema
- Base de tema em `public/assets/scss/config/_variables.scss` e `_variables-dark.scss`.
- Cores do Fluency:
  - primary `#6C63FF`
  - secondary `#1EC8A0`
- Preservar `Be Vietnam Pro` e tokens existentes.

### 5) Bibliotecas UI
- Nao instalar libs de UI novas sem validar stack existente.
- Reusar componentes/plugins ja presentes no projeto.

## Estrutura de implementacao obrigatoria
No frontend Fluency:
- Features: `src/app/views/`
- Shared/reuso: `src/app/shared/`
- Core tecnico: `src/app/core/`

Ao iniciar uma task:
1. Ler `task-brief.yaml` e `stories.md` aprovadas.
2. Mapear impacto em rota, view, shared, estado e tema.
3. Confirmar se exige mudanca em auth/layout/store protegido.
4. Implementar com menor superficie de risco.

## Protocolo de geracao de codigo
Use geradores Angular sempre que aplicavel:
- `ng generate component views/<feature>/<name> --standalone`
- `ng generate service views/<feature>/<name>`
- `ng generate interface views/<feature>/models/<name>`

Evitar criacao manual de arquivo quando generator cobre o caso.

## Validacao minima por entrega
1. `ng build`
2. `ng test` (ou escopo minimo relevante)
3. Smoke flow da feature no app
4. Relatorio `frontend-changes.md` com:
   - arquivos alterados
   - rotas impactadas
   - estado impactado
   - validacoes executadas

## Anti-patterns proibidos
- Quebrar shell de layout por necessidade local.
- Mexer em `layout`/`authentication` store sem task explicita.
- Introduzir dependencia de UI redundante.
- Hardcode de estrategias de auth paralelas.
- Entregar sem build/test minimamente validados.
