# Stories — MemoryService: contexto e persistência

> Task: #16 | Sprint: 2 | Scope: backend only

---

## Story 1 — Construção do contexto de memória do aluno

**APA Phase**: Ajustar

Como professor IA  
Quero receber o contexto completo de memória do aluno (perfil, plano, memórias recentes)  
Para personalizar cada sessão com base no histórico individual

### Critérios de Aceite

**Cenário 1: Aluno com plano e memórias**  
Given um aluno com `level`, `subscription_plan`, plano de estudos e memórias registradas  
When `buildContext($student)` é chamado  
Then retorna string com seções `## Perfil`, `## Plano de Estudos` e `## Memórias Recentes`

**Cenário 2: Aluno sem plano ou memórias**  
Given um aluno sem learningPlan e sem memórias  
When `buildContext($student)` é chamado  
Then retorna apenas a seção `## Perfil` sem sections vazias

---

## Story 2 — Histórico de sessão via Redis

**APA Phase**: Ajustar

Como sistema  
Quero persistir e recuperar o histórico de mensagens de uma sessão via Redis  
Para manter contexto de conversa com TTL de 24 horas

### Critérios de Aceite

**Cenário 1: Salvar e recuperar histórico**  
Given um array de mensagens válidas  
When `saveSessionHistory($studentId, $sessionId, $messages)` é chamado  
Then os dados são serializados e armazenados no Redis com TTL de 86400 segundos  
And `getSessionHistory($studentId, $sessionId)` retorna o mesmo array

**Cenário 2: Sessão inexistente**  
Given um `sessionId` que não existe no Redis  
When `getSessionHistory($studentId, $sessionId)` é chamado  
Then retorna array vazio `[]`

---

## Story 3 — Persistência de conversa no PostgreSQL

**APA Phase**: Ajustar

Como sistema  
Quero salvar/atualizar registros de conversa no banco de dados  
Para histórico permanente e auditoria

### Critérios de Aceite

**Cenário 1: Criar conversa nova**  
Given um aluno e uma sessão sem registro prévio  
When `persistConversation($student, $sessionId, $messages)` é chamado  
Then um registro `Conversation` é criado com `session_id`, `student_id`, `messages`, `last_activity_at`

**Cenário 2: Atualizar conversa existente**  
Given uma conversa já existente com o mesmo `session_id`  
When `persistConversation()` é chamado novamente  
Then o registro existente é atualizado (updateOrCreate)

---

## Story 4 — Resumo automático de sessão com IA

**APA Phase**: Ajustar

Como sistema  
Quero gerar um resumo da sessão usando IA e salvá-lo como memória  
Para enriquecer o perfil do aluno com aprendizados identificados automaticamente

### Critérios de Aceite

**Cenário 1: Sessão com histórico**  
Given uma sessão com mensagens no Redis  
When `summarizeAndSave($student, $sessionId)` é chamado  
Then a IA gera um resumo tipado `[mistake/achievement/vocabulary/preference/breakthrough]`  
And um registro `Memory` é criado com o tipo extraído e `importance: 3`

**Cenário 2: Sessão vazia**  
Given uma sessão sem histórico no Redis  
When `summarizeAndSave()` é chamado  
Then retorna `null` sem criar memória

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | ~30% | — (infra/serviço, sem fase explícita de aquisição) |
| Praticar | ~50% | Story 2 (sessão Redis) |
| Ajustar | ~20% | Stories 1, 3, 4 |

- [x] Fase Ajustar mapeada em Stories 1, 3, 4 (personalização e persistência)
- [x] Critérios GIVEN/WHEN/THEN cobrem todos os métodos do MemoryService
- [x] Scope: backend only (sem frontend)
