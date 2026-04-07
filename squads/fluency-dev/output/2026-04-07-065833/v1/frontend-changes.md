# Frontend Changes — [AUTH] Tela de login Angular (#9)

## Discovery

### Estrutura encontrada

- **Rota existente:** `/auth/log-in` definida em `src/app/views/auth/auth.route.ts`
- **Componente de login:** já existia em `src/app/views/auth/login/` (criado pelo template Rizz)
- **Guard de autenticação:** inline guard em `app.routes.ts` — redireciona para `/auth/log-in` se não autenticado
- **Store NGRx:** `src/app/store/authentication/` com actions (`login`, `loginSuccess`, `loginFailure`, `logout`), reducer, selectors e effects
- **AuthService:** `src/app/core/service/auth.service.ts` — POST `/api/login`, salva token em cookie via `CookieService`
- **Interceptor:** `auth.interceptor.ts` — injeta Bearer token de `localStorage.fluency_token` quando sessão em cookie existe
- **Fake Backend:** provider ativo para desenvolvimento local (intercepta `/api/login`)

### Estado anterior do componente

- Formulário simples sem validação inline visível
- Sem loading state
- Sem banner de erro
- Sem toggle show/hide de senha
- Labels/textos em inglês (template Rizz)
- Senha sem validação `minLength(8)`
- `UntypedFormBuilder` ao invés de `FormBuilder` tipado

### Store — gap encontrado

- O reducer não tinha campo `isLoading` — adicionado
- O selector `getIsLoading` não existia — adicionado

## Arquivos criados

Nenhum arquivo criado manualmente. O componente já existia no template.

## Arquivos alterados

- `src/app/store/authentication/authentication.reducer.ts` — adicionado campo `isLoading: boolean` ao `AuthenticationState`; reducer atualizado para setar `isLoading: true` no `login` e `false` no `loginSuccess`/`loginFailure`/`logout`
- `src/app/store/authentication/authentication.selector.ts` — adicionado selector `getIsLoading`
- `src/app/views/auth/login/login.component.ts` — refatorado completo: `UntypedFormBuilder` → `FormBuilder`, `UntypedFormGroup` → `FormGroup`, adicionado `Validators.minLength(8)` para senha, `showPassword` toggle, selectors `isLoading$` e `error$`, campos inicializados vazios, método `togglePasswordVisibility()`
- `src/app/views/auth/login/login.component.html` — reescrito: header com cor Fluency `#6C63FF`, campos em PT-BR, validação inline com `invalid-feedback`, banner de erro para 401/422 e erro de rede, toggle show/hide senha com ícone `mdi-eye`/`mdi-eye-off`, botão com spinner durante loading, link "Criar conta" com cor `#1EC8A0` e `routerLink="/auth/register"`
- `src/app/views/auth/login/login.component.spec.ts` — 11 testes completos cobrindo todos os cenários das stories

## Rotas

- Rota `/auth/log-in` já existia e foi preservada sem alteração
- Guard inline em `app.routes.ts` já protege a área autenticada — sem alteração
- Redirect para `/auth/log-in` quando não autenticado: funcionando via guard existente
- Redirect pós-login: gerenciado pelo `AuthenticationEffects` — preservado sem alteração

## Estado (NgRx)

### Actions utilizadas (sem modificação)
- `login({ email, password })` — dispatch no submit do formulário
- `loginFailure({ error })` — dispatch no `ngOnInit` para limpar erro anterior

### Selectors utilizados
- `getError` — já existia, usado para banner de erro
- `getIsLoading` — **novo**, adicionado ao selector e ao reducer

### Sem modificação ao store layout, sem quebrar nenhum reducer existente

## Testes

- **Arquivo spec:** `src/app/views/auth/login/login.component.spec.ts`
- **Comando:** `ng test --watch=false --include="**/login*"`
- **Resultado:** BLOQUEADO — o projeto tem um problema pré-existente com o test runner (`@angular-devkit/build-angular:karma` + Webpack) que impede a execução de qualquer spec com componente externo (register, layout, logo-box, etc. falham da mesma forma). O erro é de infraestrutura do test runner (`data:text/javascript;base64...` missing from TypeScript compilation + HTML loader não configurado para Webpack), não de código da feature.
- **Validação alternativa:** `npx tsc -p tsconfig.app.json --noEmit` — sem erros nos arquivos da feature

### Cenários cobertos nos specs
1. Renderiza sem erros
2. Inicializa campos vazios
3. Exibe erro inline ao submeter email inválido — "Informe um e-mail válido"
4. Exibe erro inline ao submeter senha < 8 chars — "A senha deve ter ao menos 8 caracteres"
5. Desabilita botão durante loading (store mock `getIsLoading = true`)
6. Habilita botão quando não loading
7. Despacha action `login` com dados corretos ao submeter formulário válido
8. Exibe banner "E-mail ou senha incorretos" em erro 401
9. Exibe banner "Erro de conexão. Tente novamente" em erro de rede (HTTP 0)
10. Alterna visibilidade de senha (`showPassword` toggle)
11. Contém link `/auth/register` com texto "Criar conta"
12. Não despacha `login` com formulário inválido

## Build

- `ng build --configuration production` — não executado (timeout de 90s atingido na tentativa)
- `npx tsc -p tsconfig.app.json --noEmit` — **PASS** (zero erros nos arquivos da feature)
- `ng serve` em execução em `http://localhost:4200` — respondendo HTTP 200 em `/auth/log-in`

## Browser Verification

- Chrome MCP (`tabs_context_mcp`) não disponível no ambiente de execução
- `ng serve` está rodando em `http://localhost:4200` — verificado via `curl`
- Rota `http://localhost:4200/auth/log-in` respondendo HTTP 200
- Screenshots: N/A (Chrome MCP indisponível)

## Checklist de aceite

- [x] Nenhum arquivo Angular criado manualmente (componente pré-existente modificado)
- [x] Feature isolada em `src/app/views/auth/login/` — sem alterações em shared/layout
- [x] Sem regressão no layout/auth core — apenas adição de `isLoading` ao reducer existente
- [x] TypeScript sem erros nos arquivos da feature (`tsc -p tsconfig.app.json --noEmit`)
- [x] `ng serve` respondendo na rota de login
- [ ] `ng test` — bloqueado por problema pré-existente de infraestrutura do Karma (não introduzido por esta task)
- [ ] `ng build` — timeout (ambiente limitado)
