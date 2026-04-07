# Stories — [AUTH] Wizard de onboarding (4 passos)

> Task: #11 | Sprint: sprint_1_infra | Scope: frontend + backend

---

## Story 1 — Wizard com progresso visual e 4 passos navegáveis

**APA Phase**: Adquirir

Como aluno recém-registrado
Quero percorrer um wizard de 4 passos antes de começar
Para personalizar minha experiência de aprendizado desde o início

### Critérios de Aceite

**Cenário 1: Wizard renderiza no passo 1**
Given que o aluno acabou de se registrar (ou acessa `/auth/onboarding`)
When a página carrega
Then ele vê o Passo 1 com indicador de progresso "1 de 4", campo de nome preferido e seleção de objetivo

**Cenário 2: Navegação Próximo/Anterior**
Given que o aluno está em qualquer passo do wizard
When ele clica "Próximo" com dados válidos
Then avança para o passo seguinte e o indicador de progresso atualiza

**Cenário 3: Bloqueio de avanço sem preenchimento**
Given que o aluno está em qualquer passo
When ele clica "Próximo" sem selecionar/preencher os campos obrigatórios
Then uma mensagem de validação é exibida e o wizard não avança

### Fluxo de UI
1. Aluno acessa `/auth/onboarding` (redirect pós-registro)
2. Vê barra de progresso horizontal: `● ○ ○ ○` (passo 1 de 4)
3. Passo 1: campo de texto "Como prefere ser chamado?" + cards de seleção única para objetivo (Viagem / Trabalho / Hobby)
4. Clica "Próximo" → barra atualiza para `● ● ○ ○`, exibe Passo 2
5. "Voltar" disponível do Passo 2 em diante → retorna ao passo anterior sem perder dados
6. Passo 4 tem botão "Concluir" no lugar de "Próximo"

---

## Story 2 — Coleta de dados nos 4 passos

**APA Phase**: Praticar

Como aluno no wizard
Quero responder perguntas sobre meu perfil e interesses
Para que o professor de IA adapte as aulas ao meu contexto

### Critérios de Aceite

**Cenário 1: Passo 1 — Nome e objetivo**
Given que o aluno está no Passo 1
When ele preenche nome preferido (text, obrigatório) e seleciona objetivo (seleção única obrigatória)
Then pode avançar para o Passo 2

**Cenário 2: Passo 2 — Nível de inglês**
Given que o aluno está no Passo 2
When ele seleciona seu nível (Nunca estudei / Básico / Intermediário / Avançado — seleção única)
Then pode avançar para o Passo 3

**Cenário 3: Passo 3 — Interesses**
Given que o aluno está no Passo 3
When ele seleciona 1 ou mais interesses (Séries / Música / Esportes / Tecnologia / Viagem — multi-select)
Then pode avançar para o Passo 4

**Cenário 4: Passo 4 — Disponibilidade**
Given que o aluno está no Passo 4
When ele seleciona dias da semana e faixa de horário (manhã/tarde/noite)
Then o botão "Concluir" fica habilitado

### Fluxo de UI
1. **Passo 1**: Input text + 3 cards clicáveis (Viagem ✈️ / Trabalho 💼 / Hobby 🎯) — seleção destaca o card com cor primária `#6C63FF`
2. **Passo 2**: 4 cards de nível com descrição curta (ex: "Básico — conheço algumas palavras")
3. **Passo 3**: Grid de chips multi-select — cada chip tem ícone + label; selecionado = borda `#6C63FF`
4. **Passo 4**: Checkboxes de dias (Seg–Dom) + 3 cards de horário (Manhã / Tarde / Noite); pelo menos 1 dia + 1 horário obrigatórios

---

## Story 3 — Salvar preferences no backend

**APA Phase**: Praticar

Como sistema
Quero persistir as respostas do wizard no campo `student.preferences`
Para que o EnglishTeacherAgent acesse o perfil personalizado em todas as sessões

### Critérios de Aceite

**Cenário 1: PATCH com dados válidos**
Given que o aluno concluiu o Passo 4 e clicou "Concluir"
When o frontend envia PATCH `/api/v1/students/{student}/preferences` com o payload de preferences
Then o backend responde 200 com o student atualizado e `preferences` persistido

**Cenário 2: Estrutura do payload**
Given que o aluno completou o wizard
When o PATCH é enviado
Then o body contém `{ preferred_name, goal, english_level, interests[], availability: { days[], time_of_day[] } }`

**Cenário 3: Validação no backend**
Given que o payload está incompleto (ex: sem `goal`)
When o backend recebe a request
Then retorna 422 com mensagem de campo obrigatório

### Fluxo backend
- Endpoint: `PATCH /api/v1/students/{student}/preferences`
- Controller: `StudentController@updatePreferences`
- FormRequest: `UpdatePreferencesRequest` com regras de validação
- Salva via `$student->update(['preferences' => $validated])`
- Retorna `StudentResource` com `preferences` incluído

---

## Story 4 — Redirect pós-conclusão

**APA Phase**: Ajustar

Como aluno que concluiu o onboarding
Quero ser redirecionado automaticamente para o diagnóstico conversacional
Para começar minha jornada de aprendizado sem atrito

### Critérios de Aceite

**Cenário 1: Redirect após PATCH com sucesso**
Given que o backend retornou 200 para o PATCH de preferences
When o frontend recebe a resposta
Then redireciona para `/dashboard` (ou `/chat` quando a rota de diagnóstico existir)

**Cenário 2: Erro no PATCH**
Given que o backend retornou erro
When o frontend recebe a resposta
Then exibe banner de erro no Passo 4 sem sair do wizard; botão "Concluir" volta ao estado normal

### Fluxo de UI
1. Aluno clica "Concluir" → botão entra em loading
2. PATCH enviado → sucesso → redirect para `/dashboard`
3. Erro → banner "Erro ao salvar preferências. Tente novamente." → botão volta ao normal

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | ~30% | Story 1 (wizard + navegação + progresso visual) |
| Praticar | ~50% | Stories 2 e 3 (coleta de dados + persistência backend) |
| Ajustar  | ~20% | Story 4 (redirect + tratamento de erro pós-conclusão) |

- [x] Fase Adquirir mapeada
- [x] Fase Praticar mapeada
- [x] Fase Ajustar mapeada
- [x] Critérios GIVEN/WHEN/THEN mensuráveis
- [x] Fluxos de UI e backend descritos com precisão
