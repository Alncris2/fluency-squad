# Stories — #17 [AGENT] Tool: save_memory
# Gerado por: PM
# Run: 2026-04-19-202001

## Contexto

Implementar o tool `save_memory` para o `EnglishTeacherAgent`, permitindo ao agente
persistir observações relevantes sobre o aluno durante a sessão. A infra (modelo,
migration, MemoryService) já existe. O `SaveLearningNoteTool` já está implementado e
injetado. O gap é: garantir que memórias de importance >= 4 **sempre** sejam
incluídas no contexto, independente do limite padrão de 15.

---

## US-01 · save_memory persiste com parâmetros corretos

**Como** agente EnglishTeacher,
**Quero** chamar `save_memory(type, content, importance)`,
**Para** registrar observações importantes sobre o aluno.

**Critérios de aceite:**

- GIVEN o agente chama `save_memory` com `{type: "mistake", content: "...", importance: 3}`
- WHEN a tool é executada
- THEN persiste em `memories` com `student_id`, `type`, `content`, `importance`, `created_at`

- GIVEN `importance` não enviado
- WHEN a tool é executada
- THEN persiste com `importance = 2` (default)

- GIVEN `content` com mais de 200 chars
- WHEN a tool é executada
- THEN trunca para 200 chars

- GIVEN `type` inválido (não está no enum)
- WHEN a tool é executada
- THEN schema validation rejeita antes de chegar ao handle

**Artefatos:** `app/Ai/Tools/SaveLearningNoteTool.php` ✅ (já implementado)

---

## US-02 · Memórias de importance >= 4 sempre no contexto

**Como** agente EnglishTeacher,
**Quero** que todas as memórias de importance >= 4 estejam sempre no meu contexto,
**Para** nunca ignorar padrões críticos do aluno.

**Critérios de aceite:**

- GIVEN um aluno com 20 memórias de importâncias variadas, 6 delas com importance >= 4
- WHEN `MemoryService::getRelevantMemories()` é chamado com limit=5
- THEN as 6 memórias importance >= 4 são retornadas (garantia > limite)

- GIVEN um aluno com 3 memórias importance >= 4 e 10 memórias importance < 4
- WHEN `getRelevantMemories()` é chamado com limit=15
- THEN retorna as 3 com importance >= 4 + as melhores 12 demais (total 15)

**Artefatos:** `app/Services/MemoryService.php` — método `getRelevantMemories`

---

## US-03 · Tool está injetada no agente

**Como** dev,
**Quero** confirmar que `SaveLearningNoteTool` está na lista de tools do `EnglishTeacherAgent`,
**Para** que o LLM possa chamá-la.

**Critérios de aceite:**

- GIVEN `new EnglishTeacherAgent($student, $sessionId)->tools()`
- WHEN iterado
- THEN contém instância de `SaveLearningNoteTool`

**Artefatos:** `app/Ai/Agents/EnglishTeacherAgent.php` ✅ (já implementado)

---

## Testes obrigatórios (PHPUnit)

| Teste | Cenário | Status |
|-------|---------|--------|
| `SaveLearningNoteTool` | persiste com parâmetros válidos → DB has | ✅ já existe |
| `SaveLearningNoteTool` | default importance = 2 | a adicionar |
| `SaveLearningNoteTool` | trunca content > 200 chars | a adicionar |
| `MemoryService` | importance >= 4 sempre incluídas mesmo acima do limit | a adicionar |
| `MemoryService` | preenche com lower-importance até o limit | a adicionar |
| `EnglishTeacherAgent` | tools() contém SaveLearningNoteTool | ✅ já existe |

**Critério de done:** `php artisan test` passando 100% (suite completa).

---

_Aprovação implícita — escopo backend only, sem checkpoint bloqueante._
