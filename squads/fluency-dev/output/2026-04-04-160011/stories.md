# Stories — [INFRA] Limpeza do template Rizz para base Fluency

> Task: #61 | Sprint: sprint_1_infra | Scope: frontend only

---

## Story 1 — Inventário: mapeamento de views mantidas vs removidas

**APA Phase**: Adquirir

Como developer do Fluency AI
Quero um inventário claro de cada view/módulo do template Rizz
Para saber exatamente o que manter, remover ou adaptar antes de tocar em código

### Critérios de Aceite

**Cenário 1: inventário produzido**
Given a estrutura atual do frontend com 11 módulos de views
When o dev analisa cada módulo contra o escopo do Fluency AI
Then produz uma tabela com: módulo, status (MANTER/REMOVER/ADAPTAR), justificativa

**Decisão por módulo (baseline para implementação):**

| Módulo | Status | Justificativa |
|---|---|---|
| `auth` | MANTER | Login, registro, error pages — produto Fluency |
| `dashboards/analytics` | MANTER | Dashboard do aluno — core do produto |
| `dashboards/ecommerce` | REMOVER | E-commerce não é escopo Fluency AI |
| `applications` | REMOVER | Apps genéricos do template (chat, kanban, etc.) |
| `advance_ui` | REMOVER | Showcase de UI avançada — sem uso no produto |
| `charts` | ADAPTAR | Pode ser útil para progresso do aluno — manter mas não rotear |
| `forms` | REMOVER | Formulários genéricos do template — sem uso direto |
| `icons` | REMOVER | Showcase de ícones — sem uso no produto |
| `maps` | REMOVER | Sem uso no produto educacional |
| `email` | REMOVER | Templates de email do Rizz — sem uso no produto |
| `tables` | REMOVER | Tabelas genéricas — sem uso imediato |
| `pages` | ADAPTAR | Manter apenas pages de erro (404/500) já em auth/ |
| `ui` | REMOVER | Showcase de componentes UI — sem uso direto |

---

## Story 2 — Remoção dos módulos descartados e limpeza de rotas

**APA Phase**: Praticar

Como developer do Fluency AI
Quero remover os módulos do template que não são usados
Para reduzir a superfície do projeto e eliminar código morto

### Critérios de Aceite

**Cenário 1: módulos removidos**
Given o inventário da Story 1 aprovado
When o dev remove os módulos marcados como REMOVER
Then os diretórios são deletados: `applications/`, `advance_ui/`, `forms/`, `icons/`, `maps/`, `email/`, `tables/`, `ui/`, `dashboards/ecommerce/`, `pages/`
And nenhum import desses módulos permanece em arquivos ativos

**Cenário 2: rotas limpas**
Given os módulos foram removidos
When `views.route.ts` é atualizado
Then contém apenas as rotas: `dashboard` (analytics), `auth`
And referências removidas: apps, ui, advanced, forms, charts, tables, icons, maps, email-templates, pages

**Cenário 3: sidebar/menu atualizado**
Given as rotas foram removidas
When o layout (sidebar/topbar) é inspecionado
Then links de navegação para módulos removidos são eliminados
And apenas as rotas do Fluency (dashboard, auth) permanecem visíveis

---

## Story 3 — Validação: build, testes e sem regressão

**APA Phase**: Ajustar

Como developer do Fluency AI
Quero confirmar que a limpeza não quebrou nada
Para garantir que o produto continua funcional após o refactor

### Critérios de Aceite

**Cenário 1: build de produção limpo**
Given os módulos foram removidos e rotas limpas
When executado `ng build --configuration production`
Then build completa sem erros (0 errors, 0 warnings críticos)

**Cenário 2: testes sem regressão**
Given o build passou
When executado `ng test --watch=false`
Then todos os testes existentes continuam passando

**Cenário 3: navegação funcional**
Given build e testes passando
When a aplicação é aberta no browser
Then redireciona para `/dashboard/analytics` após login
And sidebar/topbar exibe apenas itens do Fluency AI

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | ~30% | Story 1 (inventário e decisão) |
| Praticar | ~50% | Story 2 (remoção e limpeza) |
| Ajustar  | ~20% | Story 3 (validação e verificação) |

- [x] Fase Adquirir mapeada (inventário)
- [x] Fase Praticar mapeada (remoção)
- [x] Fase Ajustar mapeada (validação)
- [x] Critérios GIVEN/WHEN/THEN precisos e verificáveis
- [x] Scope: frontend only — backend não impactado
