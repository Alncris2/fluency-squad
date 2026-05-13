---
name: Phyora Angular
version: 1.0.0
type: knowledge
description: Guia operacional do frontend Phyora em Angular 21 + Tailwind CSS v4 com design system soft neo-brutalism (Phyora Design System). Inclui tokens, padrões, estrutura e protocolos de desenvolvimento.
---

# Phyora Angular Skill

## Repositório Frontend

**Path obrigatório:** `/home/friday/projects/phyora/apps/web`

Todos os comandos (`ng generate`, `ng serve`, `ng test`, `ng build`) devem ser executados neste diretório.

Arquivos de referência obrigatória antes de qualquer implementação:
- `package.json` — dependências reais instaladas
- `angular.json` — configuração de build
- `src/styles.css` — tokens Tailwind (@theme)
- `src/app/app.routes.ts` — roteamento principal
- `src/app/app.config.ts` — providers globais

---

## Stack confirmada (PRD v0.5)

```json
{
  "framework": "Angular 21 (zoneless change detection, standalone default)",
  "css": "Tailwind CSS v4 (@tailwindcss/postcss) + CSS vars do design system",
  "state": "NgRx Signals Store (@ngrx/signals)",
  "icons": "lucide-angular",
  "fonts": "DM Sans + JetBrains Mono (principal) | Fraunces (display) | Manrope (clean tweak)",
  "testing": "Vitest",
  "bundler": "@angular/build (esbuild)",
  "forms": "Reactive Forms (Signal Forms quando estabilizar no Angular 22+)"
}
```

---

## Contexto do Produto — Phyora

Phyora é uma plataforma SaaS de ensino de inglês com IA (professora Nina) para adultos brasileiros. O frontend consome uma API Laravel 13 via HTTP + SSE (streaming de chat).

**Identidade visual:** Educacional maduro com **soft neo-brutalism** — Duolingo mas para adultos.

**Superfícies principais:** Auth, Onboarding (5 passos + Pacto), Diagnóstico conversacional, Dashboard, Chat (7 modos), Plano de Estudos, Flashcards (SRS), Progresso & Memórias, Missões de Imersão, Diário de Exposição.

---

## Design System — Phyora Tokens

### Diretrizes visuais fundamentais

- **Bordas firmes:** 2px (variante bold: 2.5px)
- **Sombras:** offset hard drops (2px / 4px / 6px / 8px), NUNCA blurred
- **Raios:** 8–16px, arredondados mas não infantis
- **Densidade visual:** balanceada, respira
- **Tema:** Light / Dark (via `data-theme` no `<html>`)

### Cores (Tailwind custom properties via @theme)

| Token Tailwind | Valor OKLCH | Uso |
|---------------|-------------|-----|
| `brand-purple` | `oklch(0.62 0.22 285)` | Roxo primário |
| `brand-purple-ink` | `oklch(0.36 0.18 285)` | Texto sobre roxo / sombras roxas |
| `brand-purple-soft` | `oklch(0.94 0.05 285)` | Superfície tintada roxo |
| `brand-teal` | `oklch(0.76 0.15 175)` | Teal secundário |
| `brand-teal-ink` | `oklch(0.40 0.12 175)` | Texto sobre teal / sombras teal |
| `brand-teal-soft` | `oklch(0.94 0.04 175)` | Superfície tintada teal |
| `accent-coral` | `oklch(0.76 0.14 25)` | Warmth, streaks |
| `accent-amber` | `oklch(0.76 0.14 85)` | Attention, badges |
| `accent-sky` | `oklch(0.76 0.14 230)` | Info |
| `paper` | `oklch(0.985 0.006 80)` | Fundo do app |
| `paper-raised` | `oklch(1 0 0)` | Cards sobre o fundo |
| `surface-muted` | `oklch(0.96 0.008 80)` | Fills sutis |
| `surface-sunk` | `oklch(0.93 0.01 80)` | Áreas rebaixadas |
| `ink` | `oklch(0.18 0.01 80)` | Texto primário |
| `ink-soft` | `oklch(0.38 0.01 80)` | Texto secundário |
| `ink-faint` | `oklch(0.58 0.01 80)` | Texto terciário |
| `line` | `oklch(0.18 0.01 80)` | Bordas firmes (neo-brutalism) |
| `line-soft` | `oklch(0.88 0.01 80)` | Divisores sutis |
| `success` | `oklch(0.72 0.17 150)` | Feedback positivo |
| `warning` | `oklch(0.80 0.15 85)` | Alertas |
| `danger` | `oklch(0.63 0.20 25)` | Erros |

### Sombras neo-brutalism (offset hard drops, NUNCA blur)

```css
shadow-neo-sm     → 2px 2px 0 0 var(--color-ink)
shadow-neo-md     → 4px 4px 0 0 var(--color-ink)     /* padrão para cards */
shadow-neo-lg     → 6px 6px 0 0 var(--color-ink)
shadow-neo-xl     → 8px 8px 0 0 var(--color-ink)
shadow-neo-purple → 4px 4px 0 0 var(--color-brand-purple-ink)
shadow-neo-teal   → 4px 4px 0 0 var(--color-brand-teal-ink)
```

### Tipografia

```css
font-sans    → DM Sans (UI geral, body)
font-mono    → JetBrains Mono (labels, código, tags, badges)
font-display → Fraunces (headings display, opção "Ousada")
font-clean   → Manrope (opção "Clean")
```

### Radii

```
rounded-sm   → 8px
rounded-md   → 12px   /* padrão para a maioria dos elementos */
rounded-lg   → 16px
rounded-xl   → 20px
rounded-full → pill (999px)
```

### Dark mode

Ativado via atributo: `<html data-theme="dark">`.
Nunca usar `prefers-color-scheme` isolado — sempre via `data-theme`.
Tokens se invertem automaticamente via CSS vars no `:root[data-theme="dark"]`.

### Prototico e Design System

- Sempre antes de implementar qualquer componente, verificar o protótipo detalhado do design dentro do repositório Phyora na pasta `design-system/Phyora Ai/`. O design system é inspirado no protótipo, mas pode ter adaptações para viabilizar a implementação. Em caso de dúvidas, priorizar a fidelidade ao design system e consultar o squad.
- Verificar se o componente já existe em `src/app/shared/components/` ou `src/app/features/{dominio}/components/` antes de criar um novo. Reutilizar componentes existentes sempre que possível, customizando via inputs e classes Tailwind.

---

## Padrões de Componentes

### Card padrão (neo-brutalism)
```html
<div class="bg-paper-raised border-2 border-line rounded-md shadow-neo-md p-4">
  <!-- conteúdo -->
</div>
```

### Botão primário
```html
<button class="bg-brand-purple text-white border-2 border-line rounded-md
               shadow-neo-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
               transition-all duration-[120ms] px-4 py-2 font-sans font-medium text-sm">
  Label
</button>
```

### Botão secundário (ghost)
```html
<button class="bg-transparent text-ink border-2 border-line rounded-md
               shadow-neo-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
               transition-all duration-[120ms] px-4 py-2 font-sans font-medium text-sm">
  Label
</button>
```

### Botão teal
```html
<button class="bg-brand-teal text-white border-2 border-line rounded-md
               shadow-neo-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
               transition-all duration-[120ms] px-4 py-2 font-sans font-medium text-sm">
  Label
</button>
```

### Input
```html
<input class="w-full bg-paper border-2 border-line rounded-md px-3 py-2
              text-ink placeholder:text-ink-faint font-sans text-sm
              focus:outline-none focus:border-brand-purple focus:shadow-neo-purple
              transition-all duration-[120ms]" />
```

### Chip (selecionável)
```html
<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
               border-2 border-line font-mono text-xs
               data-[selected=true]:bg-brand-purple data-[selected=true]:text-white
               data-[selected=false]:bg-paper-raised data-[selected=false]:text-ink
               transition-all duration-[120ms]">
  Label
</button>
```

### Badge
```html
<span class="inline-flex items-center px-2 py-0.5 rounded-full border-2 border-line
             bg-accent-amber text-ink font-mono text-xs font-medium">
  Badge
</span>
```

### Option Card (onboarding)
```html
<button class="w-full bg-paper-raised border-2 border-line rounded-md shadow-neo-sm p-4
               text-left hover:shadow-neo-md hover:-translate-x-[2px] hover:-translate-y-[2px]
               data-[selected=true]:border-brand-purple data-[selected=true]:shadow-neo-purple
               transition-all duration-[120ms]">
  <span class="font-sans font-medium text-ink">Title</span>
  <span class="font-sans text-sm text-ink-soft">Description</span>
</button>
```

### Chat Bubble (Nina / professor)
```html
<div class="max-w-[80%] bg-brand-purple-soft border-2 border-line rounded-lg rounded-bl-sm
            shadow-neo-sm p-3 font-sans text-sm text-ink">
  Mensagem da Nina
</div>
```

### Chat Bubble (aluno / user)
```html
<div class="max-w-[80%] bg-paper-raised border-2 border-line rounded-lg rounded-br-sm
            shadow-neo-sm p-3 font-sans text-sm text-ink ml-auto">
  Mensagem do aluno
</div>
```

### System Note (transição de fase)
```html
<div class="mx-auto px-3 py-1 rounded-full border-2 border-dashed border-line-soft
            text-ink-faint font-mono text-xs text-center">
  Fase concluída
</div>
```

---

## Estrutura de pastas (padrão aprovado)

```
src/app/
├── core/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts         (functional guard)
│   │   └── onboarding.guard.ts   (functional guard)
│   ├── http/
│   │   ├── api.interceptor.ts    (CSRF + Authorization via Sanctum)
│   │   └── error.interceptor.ts
│   └── nina/
│       └── nina-fab.component.ts (FAB global always-on)
│
├── shared/
│   ├── components/
│   │   ├── button/
│   │   ├── input/
│   │   ├── card/
│   │   ├── badge/
│   │   ├── chip/
│   │   ├── avatar/
│   │   ├── step-dots/
│   │   ├── loading-skeleton/
│   │   ├── toast/
│   │   ├── password-strength/
│   │   └── nina-avatar/         (coruja geométrica, 8 expressões)
│   ├── pipes/
│   └── directives/
│
├── store/
│   ├── auth/auth.store.ts
│   ├── onboarding/onboarding.store.ts
│   ├── chat/chat.store.ts
│   ├── user/user.store.ts
│   ├── missions/missions.store.ts
│   └── flashcards/flashcards.store.ts
│
├── layouts/
│   ├── auth-layout/auth-layout.component.ts
│   └── app-layout/app-layout.component.ts
│
└── features/
    ├── auth/
    │   ├── pages/ (login, register, forgot-password, reset-password, email-sent)
    │   └── auth.routes.ts
    ├── onboarding/
    │   ├── pages/ (objetivo, nivel, interesses, horario, pacto)
    │   ├── components/onboarding-shell/
    │   └── onboarding.routes.ts
    ├── diagnostico/
    │   ├── pages/ (intro, conversa, resultado)
    │   └── diagnostico.routes.ts
    ├── dashboard/
    │   ├── pages/dashboard/
    │   ├── components/ (streak-heatmap, cefr-bar, skills-radar, continue-card,
    │   │                nina-observation, missions-widget, diary-widget)
    │   └── dashboard.routes.ts
    ├── chat/
    │   ├── pages/chat/
    │   ├── components/ (chat-bubble, chat-input, chat-panel, voice-overlay,
    │   │                chat-debrief, rich-message, vocab-card, mini-quiz)
    │   ├── services/chat-sse.service.ts
    │   └── chat.routes.ts
    ├── estudos/
    │   ├── pages/ (study-plan, flashcards-home, flashcard-review)
    │   ├── components/ (deck-card, flashcard, forgetting-curve)
    │   └── estudos.routes.ts
    └── progresso/
        ├── pages/progresso/
        ├── components/ (activity-heatmap, session-timeline, nina-memories,
        │                achievement-badge, exposure-radar)
        └── progresso.routes.ts
```

---

## NgRx Signals Store — padrão

```typescript
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ user: null, isLoading: false, error: null }),
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => !!user()),
    needsOnboarding: computed(() => !!user() && !user()!.onboardingCompleted),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    async login(credentials: LoginDTO) {
      patchState(store, { isLoading: true, error: null });
      try {
        const user = await authService.login(credentials);
        patchState(store, { user, isLoading: false });
      } catch (err) {
        patchState(store, { error: 'Credenciais inválidas', isLoading: false });
      }
    }
  }))
);
```

---

## SSE Streaming — padrão obrigatório (Chat com Nina)

```typescript
@Injectable({ providedIn: 'root' })
export class ChatSseService {
  stream(sessionId: string): Observable<string> {
    return new Observable(observer => {
      const es = new EventSource(`/api/chat/${sessionId}/stream`);
      es.onmessage = e => observer.next(e.data);
      es.addEventListener('done', () => { es.close(); observer.complete(); });
      es.onerror = () => { es.close(); observer.error('SSE error'); };
      return () => es.close();
    });
  }
}
```

**Regra crítica**: EventSource DEVE ser fechado no evento `done`. Vazamento causa memory leak.

---

## Auth Sanctum — padrão

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: LoginDTO): Observable<User> {
    return this.http.get('/sanctum/csrf-cookie').pipe(
      switchMap(() => this.http.post<AuthResponse>('/api/auth/login', credentials)),
      map(res => res.user)
    );
  }
}
```

---

## Guards funcionais

```typescript
export const authGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);
  return store.isAuthenticated() ? true : router.createUrlTree(['/auth/login']);
};

export const onboardingGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);
  return store.needsOnboarding()
    ? router.createUrlTree(['/onboarding/objetivo'])
    : true;
};
```

---

## Protocolo de geração (ng generate)

```bash
# SEMPRE executar em: /home/friday/projects/phyora/apps/web

# Página
ng generate component features/{feature}/pages/{nome} --standalone

# Componente feature
ng generate component features/{feature}/components/{nome} --standalone

# Componente shared
ng generate component shared/components/{nome} --standalone

# Serviço
ng generate service core/{area}/{nome}
ng generate service features/{feature}/services/{nome}

# Guard funcional
ng generate guard core/auth/{nome} --functional

# Interface/model
ng generate interface core/models/{nome}
```

---

## Roteamento — lazy loading obrigatório

```typescript
// app.routes.ts
{
  path: 'chat',
  canActivate: [authGuard, onboardingGuard],
  loadChildren: () => import('./features/chat/chat.routes')
}

// features/chat/chat.routes.ts
export const chatRoutes: Routes = [
  { path: '', component: ChatComponent },
  { path: ':sessionId', component: ChatComponent }
];
export default chatRoutes;
```

---

## Tweaks do Design System (preferências do usuário)

O frontend suporta tweaks persistentes por usuário:
- **Tema:** Light / Dark (`data-theme`)
- **Cor primária:** Roxo / Teal / Neutro (`data-primary`)
- **Fonte:** Clean (Manrope) / Humanist (DM Sans) / Editorial (Fraunces) (`data-font`)
- **Densidade:** Compact / Comfortable / Spacious (`data-density`)
- **Idioma UI:** PT-BR / EN
- **Modo dados (dashboard):** Rich / Minimal

---

## Nina — Regras de integração no frontend

- **FAB always-on:** canto inferior direito, bubble hint contextual (260px)
- **Avatar reativo:** 8 expressões (neutra, feliz, curiosa, pensando, piscando, atenta, dormindo, empolgada)
- **Construção visual:** coruja geométrica (círculos, triângulos, retângulos, outline 3px)
- **Chat:** avatar muda entre estados (happy, thinking, surprised) sincronizado com tom da mensagem
- Nina NUNCA fala termos "Adquirir / Praticar / Ajustar" na UI — método APA é invisível

---

## Anti-patterns proibidos

- Usar NgModule em qualquer arquivo
- Criar arquivos Angular manualmente (sem `ng generate`)
- Usar Bootstrap, Material, PrimeNG ou qualquer lib de UI externa
- Usar NgRx clássico (reducers, effects, selectors antigos)
- Hardcode de cores hex em templates (usar tokens Tailwind)
- Font Awesome, Material Icons ou qualquer icon lib diferente de Lucide
- Vazar EventSource sem fechar no unsubscribe/done
- Usar `any` em TypeScript — sempre tipar corretamente
- `document.getElementById` ou DOM manipulation direta — usar Angular refs/signals
- Usar Zone.js (Angular 21 é zoneless por default)
- Sombras com blur (box-shadow blurred) — SEMPRE hard drops offset
- Referências ao template "Rizz" — design system é 100% próprio da Phyora
