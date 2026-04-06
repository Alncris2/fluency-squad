# PM Stories — [AGENT] MemoryService: contexto e persistência (#16)

**Run**: 2026-04-04-162118
**Agent**: PM
**Sprint**: sprint_2_ai_core | Epic: epic-03-agente-ia

---

## Story 1 — MemoryService: estrutura e buildContext()

**Como** o EnglishTeacherAgent,
**Quero** um MemoryService que monte o contexto do aluno em formato string,
**Para** que o agente receba contexto completo antes de cada conversa.

### Critérios de Aceite
- [ ] `MemoryService` criado em `app/Services/MemoryService.php`
- [ ] `buildContext(Student $student): string` retorna string com:
  - Seção `## Perfil` com nome, nível, objetivo do aluno
  - Seção `## Plano` com plano de estudos ativo (se existir)
  - Seção `## Memórias Recentes` com até 15 memórias relevantes formatadas
- [ ] Método delega para `getRelevantMemories()` internamente
- [ ] Retorna string vazia segura se Student não tiver dados relacionados

### Notas técnicas
- Service em `app/Services/MemoryService.php` (sem gerador `make:service` no Laravel padrão — criar via `make:class`)
- `Student` model via Eloquent com relacionamentos `learningPlan`, `memories`
- Tabela `memories` já existe (migration `create_memories_table`)

---

## Story 2 — Session History: Redis + persistConversation()

**Como** o EnglishTeacherAgent,
**Quero** ler e gravar o histórico de mensagens da sessão no Redis,
**Para** que conversas longas sejam retomadas sem reprocessamento.

### Critérios de Aceite
- [ ] `getSessionHistory(int $studentId, string $sessionId): array` lê array de mensagens do Redis
- [ ] `saveSessionHistory(int $studentId, string $sessionId, array $messages): void` persiste no Redis com TTL de 24h
- [ ] Chave Redis no padrão: `fluency:chat:{student_id}:{session_id}`
- [ ] `persistConversation(Student $student, string $sessionId, array $messages): void` salva na tabela `conversations` (ou `agent_conversations`) no PostgreSQL
- [ ] JSON serialization/deserialization correta das mensagens

### Notas técnicas
- Usar `Redis` facade do Laravel
- TTL: 86400 segundos (24h)
- Tabelas `conversations` e `agent_conversations` já existem
- Persistir em `agent_conversations` (mais específica para o agente IA)

---

## Story 3 — AI Summary: summarizeAndSave() + getRelevantMemories()

**Como** o sistema Fluency AI,
**Quero** gerar resumos de sessão com IA e recuperar memórias relevantes por importância,
**Para** que o aluno tenha memória de longo prazo personalizada.

### Critérios de Aceite
- [ ] `summarizeAndSave(Student $student, string $sessionId): void`:
  - Lê histórico da sessão via `getSessionHistory()`
  - Chama `EnglishTeacherAgent` com prompt de resumo
  - Salva resultado como registro em `memories` com `importance` calculada
- [ ] `getRelevantMemories(Student $student, int $limit = 15): Collection`:
  - Ordena por `importance DESC, created_at DESC`
  - Aplica `LIMIT $limit`
  - Retorna `Collection` de `Memory` models
- [ ] Testes feature cobrindo todos os métodos públicos (cobertura >= 80%)

### Notas técnicas
- `EnglishTeacherAgent` disponível em `app/Ai/Agents/EnglishTeacherAgent.php` (DONE, commit 971688f)
- `Memory` model a ser criado (tabela já existe)
- `importance` como float/decimal no schema da tabela

---

## Estimativa e Sequência

| Story | Tamanho | Dependência |
|-------|---------|-------------|
| Story 1 — buildContext() | S | Memory model |
| Story 2 — Redis + persistConversation() | M | Story 1 |
| Story 3 — summarizeAndSave() + getRelevantMemories() | M | Story 2 + EnglishTeacherAgent |

**Total estimado**: M (3 dias conforme issue)

---

*Gerado pelo agente PM — fluency-squad run 2026-04-04-162118*
