# Stories — [AGENT] Tool: send_quiz

> Task: #20 | Sprint: sprint_2_ai_core | Scope: backend only

---

## Story 1 — QuizTool integrada ao EnglishTeacherAgent

**APA Phase**: Praticar

Como aluno em sessão de chat com o professor de IA
Quero receber quizzes interativos durante a conversa
Para praticar o conteúdo que estou aprendendo de forma ativa

### Critérios de Aceite

**Cenário 1: agente dispara quiz durante conversa**
Given o aluno está numa sessão de prática (fase Praticar do APA)
When o EnglishTeacherAgent decide que é hora de avaliar o entendimento
Then a QuizTool é chamada com type, topic, question, options_json, correct_answer, explanation
And um registro é inserido na tabela `quizzes` com status `pending`
And o retorno da tool contém `quiz_id` e a estrutura do quiz para o frontend renderizar

**Cenário 2: tipos suportados**
Given o agente quer criar um quiz
When a QuizTool recebe `type` como parâmetro
Then aceita os valores: `multiple_choice`, `fill_in_blank`, `translation`, `error_correction`
And rejeita tipos desconhecidos com mensagem de erro descritiva

---

## Story 2 — Endpoint de resposta ao quiz

**APA Phase**: Ajustar

Como aluno que recebeu um quiz no chat
Quero submeter minha resposta e receber feedback imediato
Para entender meu erro e consolidar o aprendizado

### Critérios de Aceite

**Cenário 1: resposta correta**
Given um quiz existe com status `pending`
When o aluno faz `POST /api/v1/quiz/{id}/answer` com `{ "answer": "..." }`
Then o sistema compara com `correct_answer`
And retorna `{ "correct": true, "score": 1.0, "explanation": "..." }`
And atualiza o quiz para `status=answered`, `student_answer`, `score`, `answered_at`

**Cenário 2: resposta incorreta**
Given um quiz existe com status `pending`
When o aluno submete resposta errada
Then retorna `{ "correct": false, "score": 0.0, "correct_answer": "...", "explanation": "..." }`
And registra o erro para uso pela SaveLearningNoteTool

**Cenário 3: quiz já respondido**
Given um quiz com `status=answered`
When o aluno tenta responder novamente
Then retorna HTTP 422 com mensagem `"Quiz já foi respondido"`

---

## Story 3 — Persistência e modelo de dados

**APA Phase**: Adquirir

Como developer implementando o sistema de quizzes
Quero uma migration e model bem definidos
Para que os dados sejam persistidos com integridade

### Critérios de Aceite

**Cenário 1: migration criada via artisan**
Given a feature está sendo implementada
When o dev executa `php artisan make:model Quiz -m`
Then a tabela `quizzes` é criada com: id (uuid), student_id, session_id, type (enum), topic, question, options_json (json nullable), correct_answer, explanation, student_answer (nullable), score (float nullable), status (enum: pending/answered), answered_at (nullable), timestamps

**Cenário 2: relação com Student**
Given um quiz é criado
When consultamos pelo student_id
Then retorna todos os quizzes daquele aluno ordenados por created_at

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | ~30% | Story 3 |
| Praticar | ~50% | Story 1 |
| Ajustar  | ~20% | Story 2 |

- [x] Fase Adquirir mapeada em pelo menos uma story
- [x] Fase Praticar mapeada em pelo menos uma story
- [x] Fase Ajustar mapeada em pelo menos uma story
- [x] Critérios GIVEN/WHEN/THEN cobrem progressão pedagógica
- [x] QuizTool mencionada explicitamente nas stories com parâmetros do issue
