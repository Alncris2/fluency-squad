# Frontend Changes — Auth + Design System
# Run: 2026-04-18-162930

## Escopo

Implementação completa do frontend Angular 21 (design system + todas as telas de auth,
onboarding, dashboard, chat, estudos e progresso) alinhado ao backend Auth Sanctum (#5).

---

## Arquivos criados (ng generate)

### Design System — `src/styles.css`
- Tokens OKLCH via `@theme`: `--color-brand-purple`, `--color-brand-teal`, `--color-paper`, etc.
- Classes utilitárias: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-danger`
- `.card`, `.badge`, `.chip`, `.field`, `.input-group`, `.input`, `.alert`
- `.nav-item` para sidebar ativa/inativa
- Dark mode via `[data-theme="dark"]`

### Shared Components
| Componente | Descrição |
|---|---|
| `shared/components/button/button.ts` | Variantes: primary, secondary, ghost, danger; sizes sm/md/lg; loading spinner |
| `shared/components/card/card.ts` | Card com padding opcional e elevação |
| `shared/components/badge/badge.ts` | Badge colorida para CEFR levels e status |
| `shared/components/chip/chip.ts` | Chip selecionável para onboarding |
| `shared/components/input/input.ts` | Input com label, erro, ícone e trail slot |
| `shared/components/nina-avatar/nina-avatar.ts` | SVG owl animado: happy/thinking/winking |
| `shared/components/step-dots/step-dots.ts` | Progress dots para onboarding |
| `shared/components/password-strength/password-strength.ts` | Barra de força de senha |

### Layouts
| Layout | Descrição |
|---|---|
| `layouts/auth-layout/auth-layout.ts` | Wrapper simples com `<router-outlet>` para telas de auth |
| `layouts/app-layout/app-layout.ts` | Sidebar desktop + bottom-nav mobile com Lucide icons inline |

### Auth Pages
| Página | Rota | Status |
|---|---|---|
| `auth/pages/login/login` | `/auth/login` | ✅ Conectado ao AuthStore |
| `auth/pages/register/register` | `/auth/register` | ✅ Conectado ao AuthStore |
| `auth/pages/forgot-password/forgot-password` | `/auth/forgot-password` | ✅ Chama AuthService |
| `auth/pages/reset-password/reset-password` | `/auth/reset-password` | ✅ Lê token/email via query params |
| `auth/pages/email-sent/email-sent` | `/auth/email-sent` | ✅ Tela de confirmação |

### Onboarding
| Página | Rota |
|---|---|
| `onboarding/pages/objetivo/objetivo` | `/onboarding/objetivo` |
| `onboarding/pages/nivel/nivel` | `/onboarding/nivel` |
| `onboarding/pages/interesses/interesses` | `/onboarding/interesses` |
| `onboarding/pages/horario/horario` | `/onboarding/horario` |

### Diagnóstico
| Página | Rota |
|---|---|
| `diagnostico/pages/intro/intro` | `/diagnostico/intro` |
| `diagnostico/pages/conversa/conversa` | `/diagnostico/conversa` |
| `diagnostico/pages/resultado/resultado` | `/diagnostico/resultado` |

### Dashboard
| Componente | Descrição |
|---|---|
| `dashboard/pages/dashboard/dashboard` | Home page com widgets |
| `dashboard/components/streak-heatmap` | Heatmap de atividade semanal |
| `dashboard/components/cefr-bar` | Barra de progresso CEFR |
| `dashboard/components/skills-radar` | Radar de habilidades |
| `dashboard/components/continue-card` | Card de continuação de sessão |
| `dashboard/components/nina-observation` | Observação diária da Nina |
| `dashboard/components/weekly-goal` | Meta semanal com progresso |

### Chat
| Componente | Descrição |
|---|---|
| `chat/pages/chat/chat` | Página principal de chat com Nina |
| `chat/components/chat-bubble` | Bolha de mensagem com erro highlight |
| `chat/components/chat-input` | Input com envio via Enter/Shift+Enter |
| `chat/components/chat-panel` | Container da conversa com scroll |
| `chat/components/voice-overlay` | Overlay de gravação de voz (futuro) |
| `chat/components/chat-debrief` | Resumo pós-sessão |
| `chat/components/rich-message` | Mensagem com markdown e highlights |
| `chat/services/chat-sse` | SSE service com fechamento no evento "done" |

### Estudos
| Componente | Descrição |
|---|---|
| `estudos/pages/study-plan/study-plan` | Plano de estudos diário |
| `estudos/pages/flashcards-home/flashcards-home` | Lista de decks |
| `estudos/pages/flashcard-review/flashcard-review` | Revisão com flip card |
| `estudos/components/deck-card` | Card de deck com progresso |
| `estudos/components/flashcard` | Flashcard com animação de flip |

### Progresso
| Componente | Descrição |
|---|---|
| `progresso/pages/progresso/progresso` | Página de progresso |
| `progresso/components/activity-heatmap` | Heatmap de atividade |
| `progresso/components/session-timeline` | Timeline de sessões |
| `progresso/components/nina-memories` | Memórias da Nina sobre o aluno |
| `progresso/components/achievement-badge` | Badge de conquistas |

### Stores (NgRx Signals)
| Store | Métodos |
|---|---|
| `store/auth/auth.store.ts` | `login`, `register`, `logout`, `loadProfile`, `clearError` |
| `store/onboarding/onboarding.store.ts` | State do fluxo de onboarding |
| `store/chat/chat.store.ts` | Messages, loading, session state |

### Core
| Arquivo | Descrição |
|---|---|
| `core/auth/auth.ts` | AuthService com CSRF handshake obrigatório antes de mutações |
| `core/auth/auth-guard.ts` | Guard funcional — redireciona para /auth/login |
| `core/auth/onboarding-guard.ts` | Guard — redireciona para /onboarding se necessário |
| `core/http/api-interceptor.ts` | Prefixo /api, credentials: include |
| `core/http/error-interceptor.ts` | Intercept 401 → logout + redirect |
| `core/nina/nina-fab/nina-fab.ts` | FAB flutuante da Nina |

---

## Roteamento

```
/ → /dashboard (redirect)
/auth/login, /auth/register, /auth/forgot-password, /auth/reset-password, /auth/email-sent
/onboarding/objetivo, /nivel, /interesses, /horario  [authGuard]
/diagnostico/intro, /conversa, /resultado  [authGuard]
/dashboard, /chat, /chat/:sessionId  [authGuard + onboardingGuard]
/estudos/plano, /estudos/flashcards, /estudos/flashcards/:deckId
/progresso
```

---

## Build

```
✅ Application bundle generation complete (24.6s)
34 files changed, 1461 insertions
0 erros TypeScript / template
```

## Commit

`4a98638 feat: implementar design system e todas as telas do frontend`
