---
name: Angular Fluency
version: 1.0.0
type: knowledge
description: Guia operacional do frontend Fluency AI em Angular 21.2 + Tailwind CSS v4 com design system próprio (soft neo-brutalism). Substitui angular-rizz.
---

# Angular Fluency Skill

## Stack confirmada no projeto

```json
{
  "framework": "Angular 21.2",
  "css": "Tailwind CSS v4 (@tailwindcss/postcss)",
  "state": "NgRx Signals Store (@ngrx/signals)",
  "icons": "lucide-angular",
  "fonts": "DM Sans + JetBrains Mono (Google Fonts)",
  "testing": "Vitest (vitest ^4.x)",
  "bundler": "@angular/build (esbuild)"
}
```

Projeto real: `/home/friday/projects/fluency-ai/frontend`

Arquivos de referência obrigatória antes de qualquer implementação:
- `package.json` — dependências reais instaladas
- `angular.json` — configuração de build
- `src/styles.css` — tokens Tailwind (@theme)
- `src/app/app.routes.ts` — roteamento principal
- `src/app/app.config.ts` — providers globais

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
│   │   ├── api.interceptor.ts    (CSRF + Authorization)
│   │   └── error.interceptor.ts
│   └── nina/
│       └── nina-fab.component.ts (portal/overlay global)
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
│   │   └── nina-avatar/
│   ├── pipes/
│   └── directives/
│
├── store/
│   ├── auth/auth.store.ts
│   ├── onboarding/onboarding.store.ts
│   ├── chat/chat.store.ts
│   └── user/user.store.ts
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
    │   ├── pages/ (objetivo, nivel, interesses, horario)
    │   ├── components/onboarding-shell/
    │   └── onboarding.routes.ts
    ├── diagnostico/
    │   ├── pages/ (intro, conversa, resultado)
    │   └── diagnostico.routes.ts
    ├── dashboard/
    │   ├── pages/dashboard/
    │   ├── components/ (streak-heatmap, cefr-bar, skills-radar, continue-card, nina-observation)
    │   └── dashboard.routes.ts
    ├── chat/
    │   ├── pages/chat/
    │   ├── components/ (chat-bubble, chat-input, chat-panel, voice-overlay, chat-debrief, rich-message)
    │   ├── services/chat-sse.service.ts
    │   └── chat.routes.ts
    ├── estudos/
    │   ├── pages/ (study-plan, flashcards-home, flashcard-review)
    │   ├── components/ (deck-card, flashcard, forgetting-curve)
    │   └── estudos.routes.ts
    └── progresso/
        ├── pages/progresso/
        ├── components/ (activity-heatmap, session-timeline, nina-memories, achievement-badge)
        └── progresso.routes.ts
```

---

## Design System — Tokens Tailwind v4

### Cores (via @theme em styles.css)

| Token Tailwind | Valor OKLCH | Uso |
|---------------|-------------|-----|
| `brand-purple` | `oklch(0.62 0.22 285)` | Roxo primário (#6C63FF equiv) |
| `brand-purple-ink` | `oklch(0.36 0.18 285)` | Texto sobre roxo |
| `brand-purple-soft` | `oklch(0.94 0.05 285)` | Superfície tintada roxo |
| `brand-teal` | `oklch(0.76 0.15 175)` | Teal secundário (#1EC8A0 equiv) |
| `paper` | `oklch(0.985 0.006 80)` | Fundo do app |
| `paper-raised` | `oklch(1 0 0)` | Cards sobre o fundo |
| `surface-muted` | `oklch(0.96 0.008 80)` | Fills sutis |
| `ink` | `oklch(0.18 0.01 80)` | Texto primário |
| `ink-soft` | `oklch(0.38 0.01 80)` | Texto secundário |
| `ink-faint` | `oklch(0.58 0.01 80)` | Texto terciário |
| `line` | `oklch(0.18 0.01 80)` | Bordas firmes |
| `line-soft` | `oklch(0.88 0.01 80)` | Divisores sutis |

### Sombras neo-brutalism (offset hard drops)

```css
shadow-neo-sm    → 2px 2px 0 0 var(--color-ink)
shadow-neo-md    → 4px 4px 0 0 var(--color-ink)  ← padrão para cards
shadow-neo-lg    → 6px 6px 0 0 var(--color-ink)
shadow-neo-purple → 4px 4px 0 0 var(--color-brand-purple-ink)
shadow-neo-teal   → 4px 4px 0 0 var(--color-brand-teal-ink)
```

### Tipografia

```css
font-sans  → DM Sans (UI geral)
font-mono  → JetBrains Mono (labels, código, tags)
```

### Radii

```
rounded-sm  → 8px
rounded-md  → 12px  ← padrão para a maioria dos elementos
rounded-lg  → 16px
rounded-xl  → 20px
rounded-full → pill (999px)
```

### Dark mode

Ativado via atributo no root: `<html data-theme="dark">`.
Nunca usar `prefers-color-scheme` isolado — sempre via data-theme.

---

## Padrões de componentes

### Card padrão
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

### Input
```html
<input class="w-full bg-paper border-2 border-line rounded-md px-3 py-2
              text-ink placeholder:text-ink-faint font-sans text-sm
              focus:outline-none focus:border-brand-purple focus:shadow-neo-purple
              transition-all duration-[120ms]" />
```

---

## NgRx Signals Store — padrão

```typescript
// store/auth/auth.store.ts
import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
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

// Uso no componente:
@Component({ ... })
export class LoginComponent {
  protected auth = inject(AuthStore);
  // template: {{ auth.isLoading() }}, {{ auth.isAuthenticated() }}
}
```

---

## SSE Streaming — padrão obrigatório

```typescript
// features/chat/services/chat-sse.service.ts
@Injectable({ providedIn: 'root' })
export class ChatSseService {
  stream(sessionId: string): Observable<string> {
    return new Observable(observer => {
      const es = new EventSource(`/api/chat/${sessionId}/stream`);
      es.onmessage = e => observer.next(e.data);
      es.addEventListener('done', () => { es.close(); observer.complete(); });
      es.onerror = () => { es.close(); observer.error('SSE error'); };
      return () => es.close(); // teardown — SEMPRE fechar
    });
  }
}
```

**Regra crítica**: EventSource DEVE ser fechado no evento `done`.
Vazamento de conexão SSE causa uso excessivo de memória.

---

## Auth Sanctum — padrão

```typescript
// core/auth/auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api';

  login(credentials: LoginDTO): Observable<User> {
    // CSRF handshake obrigatório antes de qualquer mutação
    return this.http.get('/sanctum/csrf-cookie').pipe(
      switchMap(() => this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)),
      map(res => res.user)
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {});
  }
}
```

---

## Guards funcionais

```typescript
// core/auth/auth.guard.ts
export const authGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);
  return store.isAuthenticated() ? true : router.createUrlTree(['/auth/login']);
};

// core/auth/onboarding.guard.ts
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
# Sempre executar em: /home/friday/projects/fluency-ai/frontend

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

## Roteamento — padrão lazy loading

```typescript
// app.routes.ts — todas as features são lazy-loaded
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

## Anti-patterns proibidos

- Usar NgModule em qualquer arquivo
- Criar arquivos Angular manualmente (sem ng generate)
- Usar Bootstrap, Material, PrimeNG ou qualquer lib de UI externa
- Usar NgRx clássico (reducers, effects, selectors antigos)
- Hardcode de cores hex em templates (usar tokens Tailwind)
- Font Awesome, Material Icons ou qualquer icon lib diferente de Lucide
- Vazar EventSource sem fechar no unsubscribe/done
- Usar `any` em TypeScript — sempre tipar corretamente
- `document.getElementById` ou DOM manipulation direta — usar Angular refs
