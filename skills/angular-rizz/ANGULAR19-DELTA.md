# Angular 19 Delta (Fluency vs Rizz Base)

Comparacao:
- Base antiga: `/home/friday/projects/rizz-angular` (Angular 18)
- Baseline atual: `/home/friday/projects/fluency-ai/frontend` (Angular 19)

## 1) Upgrade principal de plataforma

### Core Angular
- `@angular/*`: `^18.0.x` -> `^19.2.20`
- `@angular/cli`: `^18.0.5` -> `^19.2.23`
- `@angular-devkit/build-angular`: `^18.0.5` -> `^19.2.23`
- `@angular/compiler-cli`: `^18.0.4` -> `^19.2.20`
- `@angular/localize`: `^18.0.4` -> `^19.2.20`
- `typescript`: `5.4.2` -> `^5.8.3`
- `zone.js`: `0.14.7` -> `~0.15.0`

### Estado e UI framework
- `@ngrx/store`: `^18.0.0` -> `^19.2.1`
- `@ngrx/effects`: `^18.0.0` -> `^19.2.1`
- `@ngrx/store-devtools`: `^18.0.0` -> `^19.2.1`
- `@ng-bootstrap/ng-bootstrap`: `^17.0.0` -> `^18.0.0`
- `@angular/cdk`: adicionado (`^19.2.19`)

## 2) Bibliotecas com salto de versao relevante
- `@uppy/angular`: `^0.6.1` -> `^1.1.0`
- `@uppy/core`: `^3.13.0` -> `^5.2.0`
- `@uppy/dashboard`: `^3.9.0` -> `^5.1.1`
- `@uppy/drag-drop`: `^3.1.0` -> `^5.1.0`
- `@uppy/tus`: `^3.5.5` -> `^5.1.1`
- `apexcharts`: `^3.49.1` -> `^5.10.4`
- `ng-apexcharts`: `^1.11.0` -> `1.15.0`
- `ng2-dragula`: `^5.1.0` -> `^6.0.0`
- `ngx-cookie-service`: `^18.0.0` -> `^19.1.2`
- `ngx-quill`: `^26.0.4` -> `^27.1.2`
- `ngrx-store-localstorage`: `^18.0.0` -> `^19.0.2`

## 3) Mudancas estruturais observadas no frontend Fluency
- Nova pasta: `src/app/core/interceptors/`
- Novo arquivo: `src/app/core/interceptors/auth.interceptor.ts`
- `app.config.ts` registra interceptor HTTP DI com `HTTP_INTERCEPTORS`.
- Auth service usa chave de sessao `_FLUENCY_SESSION_` (antes `_RIZZ_AUTH_SESSION_KEY_`).

## 4) Implicacoes para a squad de frontend
1. Qualquer implementacao nova deve assumir Angular 19 como baseline.
2. Nao usar snippets de Angular 18 sem validar compatibilidade.
3. Para chamadas HTTP autenticadas, respeitar interceptor e sessao atuais.
4. Manter NgRx 19 e padrao de store existente.
5. Evitar mudancas em layout/auth sem task explicita.

## 5) Checklist rapido antes de codar
- [ ] Task mapeada no projeto Angular 19 real (`/home/friday/projects/fluency-ai/frontend`)
- [ ] Dependencias necessarias ja existem no `package.json` atual
- [ ] Nenhuma sugestao baseada em versao 18 sem adaptacao
- [ ] Impacto em auth interceptor avaliado
- [ ] Build/test planejados para validar regressao
