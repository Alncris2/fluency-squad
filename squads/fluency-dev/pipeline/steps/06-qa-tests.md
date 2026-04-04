---
step: "06"
name: "QA Tests"
type: agent
agent: qa
depends_on: step-05
model_tier: powerful
---

# Step 06 — QA Tests

## Objetivo

Executar todas as suites de testes e validar o gate de qualidade minimo antes do checkpoint de codigo.

---

## Entradas

- `output/{run_id}/backend-changes.md` — o que foi implementado no backend
- `output/{run_id}/frontend-changes.md` — o que foi implementado no frontend
- `output/{run_id}/stories.md` — criterios de aceite para validacao manual

---

## Instrucoes para o QA

```
Suite Backend:
1. cd /home/friday/projects/fluency-ai/backend
2. php artisan test --coverage --min=80
3. Registrar resultado: X testes, Y cobertura%

Suite Frontend:
4. cd /home/friday/projects/fluency-ai/frontend
5. ng test --watch=false --code-coverage
6. ng build --configuration production
7. Registrar resultado: X testes, build OK/ERRO

Suite E2E (Playwright):
8. npx playwright test tests/login.spec.ts
9. npx playwright test tests/chat.spec.ts
10. Se feature de voz impactada: npx playwright test tests/voice.spec.ts
11. Registrar resultado por fluxo

Gate de qualidade:
- Backend cobertura < 80%  → BLOQUEAR
- Frontend build com erro  → BLOQUEAR
- Playwright login falhou  → BLOQUEAR
- Playwright chat falhou   → BLOQUEAR

Se bloqueado:
12. Registrar em squad_decisions: result=blocked, detalhes dos erros
13. Notificar agent responsavel com arquivo:linha do erro

Se aprovado:
14. Produzir output/{run_id}/qa-report.md com resultado completo
```

---

## Saida esperada

- `output/{run_id}/qa-report.md` com resultado de cada suite
- Pipeline avanca se TODOS os gates passarem
- Pipeline BLOQUEADO se qualquer gate falhar
