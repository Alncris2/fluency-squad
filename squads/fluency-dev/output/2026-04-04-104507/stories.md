# Stories — [AGENT] EnglishTeacherAgent core

> Task: #15 | Sprint: sprint_2_ai_core | Scope: backend only
> ⚠️ Issue original mencionava Prism — implementar com `laravel/ai ^0.4.3`

---

## Story 1 — Chat multi-turn com system prompt APA

**APA Phase**: Todas (Adquirir + Praticar + Ajustar — o agent orquestra as 3)

Como aluno do Fluency AI
Quero enviar uma mensagem e receber uma resposta do professor de IA
Para aprender inglês de forma progressiva seguindo o método APA

### Critérios de Aceite

**Cenário 1: Chat básico funciona**
Given que o aluno está autenticado e tem uma sessão ativa
When o aluno envia `POST /api/v1/chat` com `{ "message": "How do I use present simple?", "session_id": "abc123" }`
Then o `EnglishTeacherAgent` responde seguindo a fase APA correta para o contexto do aluno
And a resposta é retornada como JSON com `{ "message": "...", "phase": "acquire|practice|adjust" }`

**Cenário 2: System prompt segue APA**
Given que o `instructions()` do agent está configurado
When o agent processa uma mensagem
Then o system prompt inclui as 3 fases APA com suas proporções (30/50/20)
And instrui o modelo a identificar em qual fase o aluno está antes de responder

**Cenário 3: Multi-turn preserva contexto**
Given que o aluno já enviou 3 mensagens na sessão "abc123"
When o aluno envia uma 4ª mensagem
Then o agent inclui o histórico da sessão no contexto (`messages()` retorna histórico do Redis)
And a resposta é coerente com o que foi discutido anteriormente

---

## Story 2 — Streaming SSE para respostas em tempo real

**APA Phase**: Praticar (50%) — fluxo interativo precisa de feedback imediato

Como aluno
Quero ver a resposta do professor aparecer progressivamente (token a token)
Para uma experiência de conversa fluida e natural

### Critérios de Aceite

**Cenário 1: Endpoint de streaming funciona**
Given que o aluno faz `POST /api/v1/chat/stream` com uma mensagem válida
When o agent gera a resposta
Then o backend retorna `Content-Type: text/event-stream`
And cada token é enviado como `data: {token}\n\n`
And o stream termina com `data: [DONE]\n\n`

**Cenário 2: Nginx não bloqueia o stream**
Given que a resposta usa SSE
When o stream está ativo
Then o nginx não faz buffer da resposta (configuração `fastcgi_buffering off` já existe)

---

## Story 3 — Voice chat com system prompt adaptado

**APA Phase**: Praticar (50%) — conversação oral é prática ativa

Como aluno usando o modo de voz
Quero que o professor responda de forma mais conversacional e concisa
Para praticar inglês falado (não escrito)

### Critérios de Aceite

**Cenário 1: voiceChat() usa prompt diferente**
Given que o aluno usa o endpoint de voz
When `voiceChat(Student $student, string $sessionId, string $transcript)` é chamado
Then o system prompt instrui o modelo a responder em no máximo 2 frases curtas
And usa linguagem falada natural (contrações, ritmo conversacional)
And evita listas e markdown (texto puro para TTS)

**Cenário 2: getVoiceGreeting() personaliza a saudação**
Given que o aluno inicia uma sessão de voz
When `getVoiceGreeting(Student $student)` é chamado
Then retorna uma saudação em inglês com o nome do aluno
And menciona o progresso recente se disponível (ex: "Great job last time with phrasal verbs!")

---

## Story 4 — Tools registradas e funcionais

**APA Phase**: Ajustar (20%) — tools permitem personalização adaptativa

Como sistema
Quero que o `EnglishTeacherAgent` tenha tools para acessar dados do aluno
Para personalizar o ensino com base no progresso e histórico

### Critérios de Aceite

**Cenário 1: Tool GetStudentProgress disponível**
Given que o agent está processando uma mensagem
When precisa saber o progresso do aluno
Then pode chamar a tool `get_student_progress` que retorna nível, tópicos dominados e áreas fracas

**Cenário 2: Tool SaveLearningNote disponível**
Given que o professor identificou um padrão de erro recorrente
When quer registrar para sessões futuras
Then pode chamar `save_learning_note` com `{ "student_id": N, "note": "..." }`

**Cenário 3: Tool use encadeado funciona**
Given que o agent pode usar múltiplas tools
When o agente chama tools em sequência para montar contexto completo
Then processa até 5 steps (`withMaxSteps(5)` ou equivalente em laravel/ai)

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | ~30% | Story 1 (system prompt APA guia a fase) |
| Praticar | ~50% | Stories 2, 3 (chat interativo + voz) |
| Ajustar  | ~20% | Story 4 (tools de progresso e adaptação) |

- [x] `instructions()` inclui as 3 fases APA explicitamente
- [x] Multi-turn preserva contexto para continuidade pedagógica
- [x] Voice chat adaptado para prática oral (fase Praticar)
- [x] Tools permitem personalização (fase Ajustar)
- [x] ⚠️ NUNCA Prism — implementar com `laravel/ai` contratos nativos
