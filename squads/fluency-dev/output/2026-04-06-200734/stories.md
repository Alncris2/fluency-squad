# 🧭 PM Stories — Step 02

**Issue**: #8 — "[INFRA] CI/CD base com GitHub Actions"  
**Epic**: epic-01-infra | **Sprint**: 1 — Infraestrutura base  
**Stack**: Laravel 13 + laravel/ai (backend) | Angular 19 + Rizz (frontend)  
**Repository**: Alncris2/fluency-ai  
**Estimativa Total**: S (1 dia)  
**Executor Principal**: Developer (Backend + Frontend)  
**PM**: 🧭 Squad PM  
**Gerado**: 2026-04-06 às 20:34 UTC  

---

## 📋 Mapeamento de Atores

| Ator | Responsabilidade | Artefatos |
|------|------------------|-----------|
| **Developer** (Backend) | Implementar workflow PHPUnit + Pint | `.github/workflows/backend.yml` |
| **Developer** (Frontend) | Implementar workflow ng test + eslint | `.github/workflows/frontend.yml` |
| **CI/CD System** (GitHub Actions) | Executar workflows nos eventos | Push, PR, Schedule |
| **Repository** (Alncris2/fluency-ai) | Manter código + workflows sincronizados | Main branch, PR checks |

---

## 🎯 Stories (Aplicando APA Methodology)

### Story 1 — GitHub Actions Base Infrastructure
**Fase APA**: ADQUIRIR (30%) + início PRATICAR  
**Estimativa**: S (4h)  
**Tipo**: Infrastructure Setup  

#### Descrição
Configurar repositório GitHub com estrutura base de workflows. Criar o diretório `.github/workflows/` e estabelecer convenção de nomes, triggers padrão (push, PR) e documentação de padrões compartilhados.

#### Acceptance Criteria (BDD)

**Cenário 1**: Estrutura de workflows criada
```gherkin
GIVEN o repositório Alncris2/fluency-ai sem workflows
WHEN Developer criar diretório .github/workflows/
THEN diretório existe e está pronto para backend.yml + frontend.yml
```

**Cenário 2**: Triggers configurados para push e PR
```gherkin
GIVEN documentação criada
WHEN Developer especificar triggers padrão
THEN triggers definidos: push (main, develop), pull_request (main)
AND branches excludadas, eventos de sincronização ativados
```

**Cenário 3**: README com convenções compartilhadas
```gherkin
GIVEN arquivo .github/workflows/README.md criado
WHEN Developer documentar padrões
THEN doc especifica: Node 22.x, PHP 8.4, triggers, cache strategy, artifact paths
```

#### Acceptance Criteria (Checklist)
- [ ] Diretório `.github/workflows/` criado
- [ ] Arquivo [`.github/workflows/README.md`](.github/workflows/README.md) com convenções
- [ ] Triggers padrão documentados (push main/develop, PR to main)
- [ ] Variáveis compartilhadas em comments
- [ ] Artifact paths definidos: `/test-results/`, `/coverage/`

---

### Story 2 — Backend Workflow: PHPUnit + Pint
**Fase APA**: PRATICAR (50%)  
**Estimativa**: S (4h)  
**Tipo**: Backend CI Setup  

#### Descrição
Implementar workflow `.github/workflows/backend.yml` que:
1. Checkout código
2. Configura PHP 8.4 com Composer cache
3. Instala dependências
4. Executa PHPUnit
5. Executa Pint linting
6. Salva artefatos

#### Acceptance Criteria (BDD)

**Cenário 1**: PHPUnit testa rodam no PR
```gherkin
GIVEN Developer fazer PR para main
WHEN GitHub dispara backend workflow
THEN composer install sucede com cache
AND php artisan test (ou phpunit) roda
AND report salvo em test-results/backend-junit.xml
AND workflow ✅ se testes passam, ❌ se falham
```

**Cenário 2**: Pint linting valida código
```gherkin
GIVEN código com estilo inconsistente commitado
WHEN Pint lint execution runs
THEN Pint reporta erros no PR comment
AND PR bloqueado se erros encontrados
AND workflow detecta issues com vendor/bin/pint --dirty
```

**Cenário 3**: Cache acelera execução em 60%
```gherkin
GIVEN primeira execução sem cache
WHEN Composer dependencies instaladas
THEN cache criado em GitHub Actions
AND segunda execução usa cache
AND tempo reduz: 2min (com cache) vs 5min (sem cache)
```

#### Acceptance Criteria (Checklist)
- [ ] [`.github/workflows/backend.yml`](.github/workflows/backend.yml) criado
- [ ] PHP 8.4 configurado
- [ ] `composer install` com cache strategy
- [ ] `php artisan test` (ou `vendor/bin/phpunit`) roda
- [ ] `vendor/bin/pint --dirty --format agent` linting
- [ ] Artefatos salvos: `/test-results/backend-junit.xml`
- [ ] Triggers: `push (main, develop)` | `pull_request (main)`
- [ ] Duração com cache: < 3 minutos

---

### Story 3 — Frontend Workflow: ng test + ESLint
**Fase APA**: PRATICAR (50%)  
**Estimativa**: S (4h)  
**Tipo**: Frontend CI Setup  

#### Descrição
Implementar workflow `.github/workflows/frontend.yml` que:
1. Checkout código
2. Configura Node 22.x com npm cache
3. Instala dependências
4. Executa ng test com coverage
5. Executa ESLint
6. Salva artefatos

#### Acceptance Criteria (BDD)

**Cenário 1**: ng test executa com coverage no PR
```gherkin
GIVEN Developer fazer PR para main
WHEN GitHub dispara frontend workflow
THEN npm install sucede com cache
AND ng test --watch=false --code-coverage roda
AND coverage report salvo em coverage/
AND workflow ✅ se testes passam
```

**Cenário 2**: ESLint valida TypeScript/tsx
```gherkin
GIVEN código com lint issues (unused vars, tipos errados)
WHEN ESLint executa via npm run lint
THEN ESLint reporta no PR comment
AND PR bloqueado se há errors (warnings podem passar)
```

**Cenário 3**: Cache npm acelera em 70%
```gherkin
GIVEN primeira execução sem cache
WHEN npm install roda
THEN node_modules cache criado
AND segunda execução reutiliza cache
AND tempo reduz: 1.5min (com) vs 5min (sem)
```

#### Acceptance Criteria (Checklist)
- [ ] [`.github/workflows/frontend.yml`](.github/workflows/frontend.yml) criado
- [ ] Node 22.x configurado
- [ ] `npm install` com cache strategy
- [ ] `ng test --watch=false --code-coverage` roda
- [ ] `npm run lint` (ESLint) executado
- [ ] Artefatos salvos: `/coverage/`, `/test-results/`
- [ ] Triggers: `push (main, develop)` | `pull_request (main)`
- [ ] Duração com cache: < 5 minutos

---

### Story 4 — Badges & Documentation
**Fase APA**: AJUSTAR (20%)  
**Estimativa**: S (2h)  
**Tipo**: Documentation + Polish  

#### Descrição
Adicionar badges de status CI/CD ao README.md. Implementar estratégia de cache multinível para máxima performance. Documentar troubleshooting comum.

#### Acceptance Criteria (BDD)

**Cenário 1**: README mostra badges de status
```gherkin
GIVEN README.md sem badges
WHEN Developer adicionar badges dinâmicas
THEN README mostra: Backend Build Status, Frontend Build Status
AND badges linham para Actions page
AND clique em badge mostra atual run
```

**Cenário 2**: Cache strategy multinível implementada
```gherkin
GIVEN workflows sem cache optimization
WHEN implementar actions/setup-php cache, strategy.cache-npm
THEN Composer cache reconhecido se composer.lock igual
AND npm cache reconhecido se package-lock.json igual
AND cache hit rate >= 90% (em runs subsequentes)
```

**Cenário 3**: Documentação de troubleshooting
```gherkin
GIVEN workflows documentados
WHEN Developer criar .github/workflows/README.md
THEN doc contém: como limpar cache, como debugar PRs, workflows triggers
```

#### Acceptance Criteria (Checklist)
- [ ] README.md com 3+ badges de status
- [ ] Badges linkam para GitHub Actions
- [ ] Cache configurado em ambos workflows
- [ ] `.github/workflows/README.md` com troubleshooting
- [ ] Documentação com: cache invalidation, local testing hints
- [ ] Cache hit rate validado em 5 execuções
- [ ] Badges funcionam (status atualiza em tempo real)

---

## 📊 APA Compliance Mapping

| Fase | Tipo | Stories | Horas | % Total | Target |
|------|------|---------|-------|---------|--------|
| **ADQUIRIR** | Setup & Learn | Story 1 (4h) | 4h | 28% | 25–35% |
| **PRATICAR** | Implement | Story 2 (4h) + Story 3 (4h) | 8h | 57% | 45–60% |
| **AJUSTAR** | Optimize | Story 4 (2h) | 2h | 14% | 15–25% |
| | | **TOTAL** | **14h** | **100%** | ✅ Balanceado |

**Análise**:
- ✅ Adquirir 28% — Acima do baseline (setup infrastructure é crítico)
- ✅ Praticar 57% — Dentro do target (implementação de workflows)
- ✅ Ajustar 14% — Próximo ao target (documentação + polish)

---

## 🚀 Sequência de Execução Recomendada

| # | Story | Tipo | Duração | Dependência |
|---|-------|------|---------|------------|
| 1 | Story 1 | Setup | 4h | Base para tudo |
| 2a | Story 2 | Backend | 4h | Paralelo com 2b |
| 2b | Story 3 | Frontend | 4h | Paralelo com 2a |
| 3 | Story 4 | Docs | 2h | Após 2a + 2b |

**Paralelismo**:
- Dev 1: Story 1 (2h setup) → Story 2 (4h backend)  
- Dev 2: Story 1 (2h setup) → Story 3 (4h frontend)  
- Ambos: Story 4 (2h final) juntos

**Tempo crítico**: 10h em série, 8h com paralelismo (dentro de 1 dia com urgência)

---

## 📝 Acceptance Criteria da Issue #8 — Cobertura Completa

| AC Critério | Story | Validação |
|-------------|-------|-----------|
| Workflow backend: PHPUnit no push/PR | Story 2 | ✅ Cenário 1 |
| Workflow frontend: ng test no push | Story 3 | ✅ Cenário 1 |
| Lint (pint + eslint) | Story 2 + 3 | ✅ Cenários 2 em ambas |
| Badge de status no README | Story 4 | ✅ Cenário 1 |
| Cache de dependências | Story 2 + 3 | ✅ Cenários 3 em ambas, Story 4 expand |

**Status**: ✅ **TODOS OS ACs COBERTOS**

---

## ✅ Checkpoint — Pronto para Aprovação?

- ✅ 4 stories bem-definidas, realistas
- ✅ Respeita proporção APA (28/57/14 vs target 30/50/20)
- ✅ Critérios BDD completos (GIVEN/WHEN/THEN)
- ✅ Todos 5 ACs da Issue #8 mapeados
- ✅ Sequência lógica com paralelismo
- ✅ Duração: 1 dia com paralelismo ✅

**Status**: 🟢 **PRONTO PARA STEP 03 — Developer Implementation**
