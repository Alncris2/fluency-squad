# Plano Técnico — Frontend Angular 21.2 + Tailwind v4
# Gerado por: Dev Frontend
# Run: 2026-04-18-160111

---

## 1. Estrutura de Pastas

```
src/
├── app/
│   ├── core/
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   └── onboarding.guard.ts
│   │   ├── http/
│   │   │   ├── api.interceptor.ts       ← CSRF + Authorization header
│   │   │   └── error.interceptor.ts
│   │   └── nina/
│   │       └── nina-fab.component.ts    ← FAB global (portal/overlay)
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   ├── card/
│   │   │   ├── badge/
│   │   │   ├── chip/
│   │   │   ├── avatar/
│   │   │   ├── step-dots/
│   │   │   ├── loading-skeleton/
│   │   │   ├── toast/
│   │   │   ├── password-strength/
│   │   │   └── nina-avatar/             ← coruja Nina com expressões
│   │   ├── pipes/
│   │   │   └── time-ago.pipe.ts
│   │   └── directives/
│   │       └── auto-focus.directive.ts
│   │
│   ├── store/
│   │   ├── auth/
│   │   │   └── auth.store.ts            ← NgRx Signals Store
│   │   ├── onboarding/
│   │   │   └── onboarding.store.ts
│   │   ├── chat/
│   │   │   └── chat.store.ts
│   │   └── user/
│   │       └── user.store.ts
│   │
│   ├── layouts/
│   │   ├── auth-layout/
│   │   │   └── auth-layout.component.ts   ← split hero + form
│   │   └── app-layout/
│   │       └── app-layout.component.ts    ← shell pós-login com nav + Nina FAB
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── forgot-password/
│   │   │   │   ├── reset-password/
│   │   │   │   └── email-sent/
│   │   │   └── auth.routes.ts
│   │   │
│   │   ├── onboarding/
│   │   │   ├── pages/
│   │   │   │   ├── objetivo/
│   │   │   │   ├── nivel/
│   │   │   │   ├── interesses/
│   │   │   │   └── horario/
│   │   │   ├── components/
│   │   │   │   └── onboarding-shell/    ← step dots + progress header
│   │   │   └── onboarding.routes.ts
│   │   │
│   │   ├── diagnostico/
│   │   │   ├── pages/
│   │   │   │   ├── intro/
│   │   │   │   ├── conversa/
│   │   │   │   └── resultado/
│   │   │   └── diagnostico.routes.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   │   └── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── streak-heatmap/
│   │   │   │   ├── cefr-bar/
│   │   │   │   ├── skills-radar/
│   │   │   │   ├── continue-card/       ← "continuar de ontem"
│   │   │   │   ├── weekly-goal/
│   │   │   │   └── nina-observation/
│   │   │   └── dashboard.routes.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── pages/
│   │   │   │   └── chat/
│   │   │   ├── components/
│   │   │   │   ├── chat-bubble/         ← bolha com avatar Nina reativo
│   │   │   │   ├── chat-input/          ← input + toggle voz
│   │   │   │   ├── chat-panel/          ← painel colapsável lateral
│   │   │   │   ├── voice-overlay/       ← modo voz imersivo
│   │   │   │   ├── chat-debrief/        ← hero fim de sessão
│   │   │   │   └── rich-message/        ← quiz, vocab card, waveform, etc.
│   │   │   ├── services/
│   │   │   │   └── chat-sse.service.ts  ← EventSource SSE streaming
│   │   │   └── chat.routes.ts
│   │   │
│   │   ├── estudos/
│   │   │   ├── pages/
│   │   │   │   ├── study-plan/
│   │   │   │   ├── flashcards-home/
│   │   │   │   └── flashcard-review/
│   │   │   ├── components/
│   │   │   │   ├── deck-card/
│   │   │   │   ├── flashcard/           ← virada CSS 3D transform
│   │   │   │   └── forgetting-curve/
│   │   │   └── estudos.routes.ts
│   │   │
│   │   └── progresso/
│   │       ├── pages/
│   │       │   └── progresso/
│   │       ├── components/
│   │       │   ├── activity-heatmap/
│   │       │   ├── session-timeline/
│   │       │   ├── nina-memories/
│   │       │   └── achievement-badge/
│   │       └── progresso.routes.ts
│   │
│   ├── app.routes.ts
│   ├── app.config.ts
│   ├── app.ts
│   └── app.html
│
├── styles.css                           ← tokens Tailwind v4 + base
├── index.html
└── main.ts
```

---

## 2. Design System — Tailwind v4 + CSS Custom Properties

### `src/styles.css`

```css
@import "tailwindcss";

@theme {
  /* Brand */
  --color-brand-purple: oklch(0.62 0.22 285);
  --color-brand-purple-ink: oklch(0.36 0.18 285);
  --color-brand-purple-soft: oklch(0.94 0.05 285);
  --color-brand-teal: oklch(0.76 0.15 175);
  --color-brand-teal-ink: oklch(0.48 0.13 175);
  --color-brand-teal-soft: oklch(0.94 0.05 175);

  /* Neutrals warm-biased */
  --color-paper: oklch(0.985 0.006 80);
  --color-paper-raised: oklch(1 0 0);
  --color-surface-muted: oklch(0.96 0.008 80);
  --color-ink: oklch(0.18 0.01 80);
  --color-ink-soft: oklch(0.38 0.01 80);
  --color-ink-faint: oklch(0.58 0.01 80);
  --color-line: oklch(0.18 0.01 80);
  --color-line-soft: oklch(0.88 0.01 80);

  /* Accents */
  --color-accent-coral: oklch(0.76 0.14 35);
  --color-accent-amber: oklch(0.80 0.14 80);

  /* Typography */
  --font-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;

  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-pill: 999px;

  /* Neo-brutalism shadows (offset hard drops) */
  --shadow-neo-sm: 2px 2px 0 0 oklch(0.18 0.01 80);
  --shadow-neo-md: 4px 4px 0 0 oklch(0.18 0.01 80);
  --shadow-neo-lg: 6px 6px 0 0 oklch(0.18 0.01 80);
  --shadow-neo-purple: 4px 4px 0 0 oklch(0.36 0.18 285);
  --shadow-neo-teal: 4px 4px 0 0 oklch(0.48 0.13 175);
}

/* Dark mode */
[data-theme="dark"] {
  --color-paper: oklch(0.17 0.012 280);
  --color-paper-raised: oklch(0.22 0.015 280);
  --color-surface-muted: oklch(0.25 0.014 280);
  --color-ink: oklch(0.96 0.008 80);
  --color-ink-soft: oklch(0.78 0.008 80);
  --color-line-soft: oklch(0.32 0.014 280);
  --color-brand-purple: oklch(0.72 0.19 285);
}
```

### `src/index.html` — Google Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Instalar Lucide Angular
```bash
npm install lucide-angular
```

---

## 3. Roteamento Principal

### `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { onboardingGuard } from './core/auth/onboarding.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component'),
    loadChildren: () => import('./features/auth/auth.routes')
  },
  {
    path: 'onboarding',
    canActivate: [authGuard],
    loadChildren: () => import('./features/onboarding/onboarding.routes')
  },
  {
    path: 'diagnostico',
    canActivate: [authGuard],
    loadChildren: () => import('./features/diagnostico/diagnostico.routes')
  },
  {
    path: '',
    canActivate: [authGuard, onboardingGuard],
    loadComponent: () => import('./layouts/app-layout/app-layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component')
      },
      {
        path: 'chat',
        loadChildren: () => import('./features/chat/chat.routes')
      },
      {
        path: 'estudos',
        loadChildren: () => import('./features/estudos/estudos.routes')
      },
      {
        path: 'progresso',
        loadComponent: () => import('./features/progresso/pages/progresso/progresso.component')
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
```

---

## 4. Arquitetura de Estado — NgRx Signals Store

### `src/app/store/auth/auth.store.ts`

```typescript
import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({ user: null, token: null, isLoading: false, error: null }),
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => !!user()),
    needsOnboarding: computed(() => user() && !user()!.onboardingCompleted),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    // login, logout, loadProfile...
  }))
);
```

### Stores por feature

| Store | Estado gerenciado |
|-------|-------------------|
| `AuthStore` | user, token, isAuthenticated |
| `OnboardingStore` | respostas steps 1–4, currentStep |
| `ChatStore` | messages[], currentSession, isStreaming, mode |
| `UserStore` | profile, preferences, streakData, cefrLevel |

---

## 5. Serviços Principais

### `chat-sse.service.ts` — Streaming SSE
```typescript
@Injectable({ providedIn: 'root' })
export class ChatSseService {
  stream(sessionId: string): Observable<string> {
    return new Observable(observer => {
      const es = new EventSource(`/api/chat/${sessionId}/stream`);
      es.onmessage = e => observer.next(e.data);
      es.addEventListener('done', () => { es.close(); observer.complete(); });
      es.onerror = e => { es.close(); observer.error(e); };
      return () => es.close(); // teardown — sempre fecha
    });
  }
}
```

### `auth.service.ts` — Sanctum SPA
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  // CSRF handshake → /sanctum/csrf-cookie antes de login/register
  login(credentials: LoginDTO) {
    return this.http.get('/sanctum/csrf-cookie').pipe(
      switchMap(() => this.http.post<AuthResponse>('/api/auth/login', credentials))
    );
  }
}
```

---

## 6. Convenções de Nomenclatura

| Artefato | Convenção | Exemplo |
|----------|-----------|---------|
| Componente página | `{nome}.component.ts` | `login.component.ts` |
| Componente shared | `{nome}.component.ts` | `chat-bubble.component.ts` |
| Store | `{nome}.store.ts` | `auth.store.ts` |
| Service | `{nome}.service.ts` | `auth.service.ts` |
| Guard | `{nome}.guard.ts` | `auth.guard.ts` |
| Rotas | `{feature}.routes.ts` | `chat.routes.ts` |
| Interface/Type | PascalCase | `User`, `ChatMessage`, `FlashcardDeck` |
| Seletor CSS | `fl-{componente}` | `fl-bubble`, `fl-card` |

**Regra:** SEMPRE usar `ng generate` — nunca criar arquivos manualmente.

```bash
# Exemplos
ng generate component features/auth/pages/login --standalone
ng generate component shared/components/chat-bubble --standalone
ng generate service core/auth/auth
ng generate guard core/auth/auth
```

---

## 7. Ordem de Implementação Recomendada

### Sprint 1 — Infraestrutura (esta semana)
1. `styles.css` — tokens Tailwind v4 completos
2. `app.routes.ts` — roteamento principal com guards skeleton
3. `AuthStore` + `AuthService` + `AuthGuard`
4. `AuthLayout` + telas Login e Register

### Sprint 2 — Onboarding + Diagnóstico
5. `OnboardingStore` + 4 steps de onboarding
6. `OnboardingGuard`
7. Fluxo de diagnóstico conversacional

### Sprint 3 — Dashboard
8. `UserStore` com dados de perfil
9. `DashboardPage` com todos os widgets
10. `NinaFab` global (overlay/portal)

### Sprint 4 — Chat
11. `ChatSseService` (SSE streaming)
12. `ChatStore` + `ChatPage`
13. Componentes rich message (quiz, vocab, waveform)
14. Voice mode overlay

### Sprint 5 — Estudos + Progresso
15. Study plan page
16. Flashcards (home + review com SRS)
17. Progresso & Memórias

---

## 8. Dependências a Instalar

```bash
# Lucide icons
npm install lucide-angular

# NgRx Signals Store
npm install @ngrx/signals

# (Opcional) Chart.js para heatmap/radar
npm install chart.js ng2-charts
```

---

## 9. Guards — Lógica

### `auth.guard.ts`
```typescript
export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAuthenticated()) return true;
  return router.createUrlTree(['/auth/login']);
};
```

### `onboarding.guard.ts`
```typescript
export const onboardingGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.needsOnboarding()) {
    return router.createUrlTree(['/onboarding/objetivo']);
  }
  return true;
};
```

---

## 10. Checklist antes de implementar cada componente

- [ ] `ng generate component` (nunca manualmente)
- [ ] Usa tokens Tailwind do design system (`text-ink`, `bg-paper`, `shadow-neo-md`)
- [ ] Bordas: `border-2 border-line` (soft neo-brutalism)
- [ ] Raios: `rounded-md` (12px) como padrão
- [ ] Lucide para todos os ícones (sem Font Awesome, Material Icons, etc.)
- [ ] Dark mode testado via `[data-theme="dark"]` no `<html>`
- [ ] Componente é standalone (Angular 21 — sem NgModule)
