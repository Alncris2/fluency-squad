---
step: "05"
name: "Dev Frontend"
type: agent
agent: dev-frontend
depends_on: step-03
model_tier: powerful
---

# Step 05 — Dev Frontend

## Objetivo

Implementar as mudancas no frontend Angular 19 conforme as stories aprovadas no checkpoint.

---

## Entradas

- `output/{run_id}/task-brief.yaml` — escopo e contexto
- `output/{run_id}/stories.md` — stories aprovadas (criterios de aceite)
- `skills/angular-rizz/SKILL.md` — padroes do Rizz e Angular 19
- Projeto real: `/home/friday/projects/fluency-ai/frontend`

---

## Instrucoes para o Dev Frontend

```
Discovery obrigatorio:
1. Ler stories.md e identificar componentes/rotas impactadas
2. Ler skills/angular-rizz/SKILL.md para baseline do Rizz
3. Inspecionar src/app/views/ para evitar duplicatas
4. Mapear impacto em: rotas, views, shared, estado, estilos

Implementacao:
5. ng generate component views/<feature>/<nome> --standalone
6. ng generate service views/<feature>/<nome>
7. ng generate interface views/<feature>/models/<nome>
8. Nunca criar arquivos Angular manualmente
9. Nunca quebrar layout/auth stores do Rizz
10. Features em src/app/views/; shared em src/app/shared/
11. Cores: primary #6C63FF, secondary #1EC8A0

Validacao:
12. ng build --configuration production
13. ng test --watch=false (escopo da feature)

Browser Verification (apos build passar):
14. Iniciar ng serve se nao estiver rodando
15. Usar Chrome MCP para navegar e testar cada fluxo descrito nas stories
16. Clicar, preencher formularios, verificar modais, toasts, tabelas
17. Se algo nao funciona: corrigir e re-testar ate funcionar
18. Se inconsistencia no plano do PM: registrar no frontend-changes.md
19. Capturar screenshots e GIF do fluxo principal

Relatorio:
20. Produzir output/{run_id}/frontend-changes.md (inclui resultado do browser)
```

---

## Saida esperada

- Arquivos criados/alterados em `/home/friday/projects/fluency-ai/frontend`
- `output/{run_id}/frontend-changes.md` preenchido
- Build de producao sem erros

## Nota sobre paralelismo

Este step roda em PARALELO com Step 04 (Dev Backend). Ambos dependem apenas do checkpoint Step 03.
