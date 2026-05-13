# Docs Report — Auth Sanctum #5 + Frontend
# Run: 2026-04-18-162930

## Resumo do que foi entregue

### Backend (issue #5 — Auth Sanctum)

Quatro endpoints de autenticação implementados com Laravel Sanctum:

| Método | Rota | Auth |
|---|---|---|
| POST | `/api/auth/register` | Não |
| POST | `/api/auth/login` | Não |
| POST | `/api/auth/logout` | Bearer token |
| GET | `/api/auth/me` | Bearer token |

**Cobertura de testes:** 63 testes, 191 assertions, 0 falhas.
**Pint:** pass.

### Frontend (design system + telas)

Angular 21.2 standalone com:
- Design system completo (tokens OKLCH, neo-brutalism, Lucide icons)
- Auth flow completo conectado ao backend via AuthService + AuthStore
- Onboarding, Diagnóstico, Dashboard, Chat, Estudos, Progresso
- NgRx Signals Store em todos os domínios
- SSE com fechamento correto no evento "done"
- Guards funcionais (authGuard, onboardingGuard)

## Decisões documentadas

1. **CSRF handshake obrigatório**: `GET /sanctum/csrf-cookie` antes de todo POST de auth.
2. **onboarding_completed derivado**: computado via existência de Student, não persistido em `users`.
3. **NgRx Signals Store**: padrão `signalStore + withState + withMethods + withComputed` em todos os stores.
4. **SSE**: EventSource fechado no evento "done" — sem leak de conexão.
5. **Rotas `/api/auth/*`**: prefixo padronizado, alinhado entre backend e frontend.

## Status do Issue

- **GitHub #5**: Fechado via commit `feat: Auth Sanctum — endpoints` (backend)
- **Frontend**: Commit `4a98638` — design system + telas

## Próximo passo

Iniciar issue **#6** (próxima do backlog) no próximo run.
