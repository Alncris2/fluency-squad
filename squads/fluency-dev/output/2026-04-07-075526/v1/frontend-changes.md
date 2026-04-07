# Frontend Changes — [AUTH] Wizard de onboarding (#11)

## Discovery

### Estrutura encontrada
- `src/app/views/auth/auth.route.ts` — rotas existentes (log-in, register, reset-pass, lock-screen)
- `src/app/core/service/auth.service.ts` — AuthenticationService via HttpClient + CookieService
- `src/app/store/authentication/authentication.selector.ts` — seletores NgRx: `getUser`, `getToken`, `getisLoggedIn`, `getError`, `getIsLoading`
- `src/app/store/authentication/auth.model.ts` — User com campos: `id`, `username`, `email`, `token`
- `src/app/views/auth/login/login.component.ts` — padrão: FormBuilder + inject(Store) + standalone
- **Não existia** `OnboardingComponent` — criado nesta task

### Student ID
O store de authentication expõe `getUser` que retorna `User | null` com campo `id`. O componente usa `store.select(getUser).pipe(take(1))` para obter o studentId antes do PATCH.

## Arquivos criados

- `src/app/views/auth/onboarding/onboarding.component.ts` — componente principal com lógica de wizard (4 passos, FormGroups, navegação, submit)
- `src/app/views/auth/onboarding/onboarding.component.html` — template Bootstrap 5.3 com progress indicator, 4 passos condicionais, botões de navegação
- `src/app/views/auth/onboarding/onboarding.component.scss` — gerado pelo ng generate (vazio, estilos inline no template)
- `src/app/views/auth/onboarding/onboarding.component.spec.ts` — 12 testes unitários (Jasmine/Karma)
- `src/app/views/auth/onboarding/onboarding.service.ts` — service com `savePreferences(studentId, payload)` → PATCH `/api/v1/students/{student}/preferences`
- `src/app/views/auth/onboarding/onboarding.service.spec.ts` — gerado pelo ng generate
- `src/app/views/auth/onboarding/models/onboarding-data.ts` — interfaces `OnboardingData` e `OnboardingPreferencesPayload`

> Todos os arquivos foram gerados via `ng generate` conforme regra absoluta #1.

## Arquivos alterados

- `src/app/views/auth/auth.route.ts` — adicionada rota `/onboarding` apontando para `OnboardingComponent`

## Rotas

- `/auth/onboarding` → `OnboardingComponent`

## Estado

NgRx usado **somente para leitura**: `store.select(getUser).pipe(take(1))` para obter o `studentId` do usuário autenticado antes de chamar o PATCH. Nenhuma action nova foi criada — não houve task explícita para alterar o auth store.

## Implementação dos 4 passos

| Passo | Campos | Validação |
|-------|--------|-----------|
| 1 | `preferred_name` (text, required, minLength 2) + `goal` (seleção única: Viagem/Trabalho/Hobby) | FormGroup válido |
| 2 | `english_level` (seleção única: Nunca estudei/Básico/Intermediário/Avançado) | FormGroup válido |
| 3 | `interests` (multi-select chips: Séries/Música/Esportes/Tecnologia/Viagem) | mínimo 1 selecionado |
| 4 | `days` (checkboxes Seg–Dom) + `time_of_day` (cards: Manhã/Tarde/Noite) | mínimo 1 dia + 1 horário |

### Payload enviado
```json
{
  "preferred_name": "string",
  "goal": "travel|work|hobby",
  "english_level": "never|basic|intermediate|advanced",
  "interests": ["series", "music", ...],
  "availability": {
    "days": ["mon", "tue", ...],
    "time_of_day": ["morning", "afternoon", "evening"]
  }
}
```

## Testes

- **Arquivo spec:** `src/app/views/auth/onboarding/onboarding.component.spec.ts`
- **12 casos de teste cobertos:**
  1. Componente cria sem erros (smoke)
  2. `currentStep` inicia em 1
  3. `nextStep()` avança para 2 com passo 1 válido
  4. `canAdvance()` retorna false com passo 1 vazio
  5. `canAdvance()` retorna true com passo 1 preenchido
  6. `prevStep()` volta ao passo anterior
  7. Não volta abaixo do passo 1
  8. `canAdvance()` falso no passo 3 sem interesses
  9. `canAdvance()` true no passo 3 com ao menos 1 interesse
  10. `toggleInterest()` adiciona e remove interesses
  11. `canAdvance()` falso no passo 4 sem dias ou horários
  12. `totalSteps` é 4

- **Resultado em runtime:** BLOCKED — o ambiente Karma do projeto tem problema de infraestrutura pré-existente (`ng-virtual-main.js` missing from TypeScript compilation). Verificado que o mesmo erro ocorre em specs existentes (login.component.spec.ts). Os arquivos spec compilam sem erros (`npx tsc -p tsconfig.spec.json --noEmit` PASS).

## Build

- `npx tsc -p tsconfig.app.json --noEmit` — **PASS** (zero erros)
- `npx tsc -p tsconfig.spec.json --noEmit` — **PASS** (zero erros)
- `ng test` — BLOCKED por problema pré-existente de configuração Karma (não relacionado a esta task)

## Checklist

- [x] Nenhum arquivo criado manualmente — todos via `ng generate`
- [x] Feature em `views/auth/onboarding/`
- [x] TypeScript sem erros (`tsconfig.app.json` e `tsconfig.spec.json`)
- [x] Testes criados (12 casos em `onboarding.component.spec.ts`)
- [x] Rota `/auth/onboarding` adicionada em `auth.route.ts`
- [x] PATCH `/api/v1/students/{student}/preferences` implementado em `OnboardingService`
- [x] Loading state no botão "Concluir"
- [x] Error banner no Passo 4
- [x] Redirect para `/dashboard` em caso de sucesso
- [x] Cores: primary `#6C63FF`, secondary `#1EC8A0`
- [x] Dados preservados ao voltar (FormGroups mantêm estado)
- [x] Avanço bloqueado se campos obrigatórios não preenchidos (`canAdvance()`)
