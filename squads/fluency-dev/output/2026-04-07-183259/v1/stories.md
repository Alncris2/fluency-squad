# Stories — [AUTH] Tela de registro Angular

> Task: #10 | Sprint: 1 (infra) | Scope: backend + frontend

---

## Story 1 — Formulário de registro com validação reativa

**APA Phase**: Adquirir

Como aluno
Quero criar minha conta informando nome, email, senha e confirmação
Para começar minha jornada de aprendizado de inglês no Fluency AI

### Critérios de Aceite

**Cenário 1: Exibição do formulário de registro**
Given o usuário acessa `/register`
When a página carrega
Then vê um formulário com campos: nome (text), email (email), senha (password), confirmação de senha (password) e botão "Criar conta" desabilitado

**Cenário 2: Validação reativa em tempo real**
Given o formulário está visível
When o usuário digita em qualquer campo
Then validações aparecem em tempo real:
  - Nome: mínimo 2 caracteres
  - Email: formato válido (regex)
  - Senha: mínimo 8 caracteres
  - Confirmação: deve ser igual à senha

**Cenário 3: Formulário válido habilita submit**
Given todos os campos preenchidos e válidos
When o formulário passa validação
Then o botão "Criar conta" fica habilitado

### Fluxo de UI
1. Usuário acessa `/register`
2. Vê formulário centralizado com logo Fluency AI no topo
3. Campos: Nome (text, placeholder "Seu nome"), Email (email, placeholder "seu@email.com"), Senha (password, placeholder "Mínimo 8 caracteres"), Confirmar senha (password, placeholder "Repita sua senha")
4. Abaixo de cada campo, mensagens de erro aparecem em vermelho conforme o usuário digita (validação reativa)
5. Botão "Criar conta" desabilitado até formulário válido
6. Link "Já tem conta? Entrar" abaixo do botão, redireciona para `/login`

---

## Story 2 — Endpoint de registro no backend

**APA Phase**: Adquirir

Como sistema
Quero um endpoint POST /api/register que crie o usuário e retorne token Sanctum
Para autenticar o aluno imediatamente após o registro

### Critérios de Aceite

**Cenário 1: Registro com sucesso**
Given um payload válido `{ name, email, password, password_confirmation }`
When POST /api/register é chamado
Then usuário é criado no banco, token Sanctum é gerado e retornado com status 201

**Cenário 2: Email já existente**
Given um email que já existe no banco
When POST /api/register é chamado
Then retorna 422 com mensagem "The email has already been taken."

**Cenário 3: Validação de campos obrigatórios**
Given payload com campos ausentes ou inválidos
When POST /api/register é chamado
Then retorna 422 com erros de validação detalhados por campo

---

## Story 3 — Integração frontend-backend no submit

**APA Phase**: Praticar

Como aluno
Quero que ao clicar "Criar conta" o sistema crie minha conta e me redirecione
Para acessar o onboarding sem etapas adicionais

### Critérios de Aceite

**Cenário 1: Submit com sucesso**
Given formulário preenchido com dados válidos
When o usuário clica "Criar conta"
Then o frontend envia POST /api/register, recebe token, salva no auth store e redireciona para `/onboarding`

**Cenário 2: Loading state durante request**
Given formulário submetido
When a request está em andamento
Then botão mostra spinner/loading e campos ficam desabilitados

**Cenário 3: Erro do backend exibido no formulário**
Given o backend retorna 422 (ex: email já existe)
When a resposta chega ao frontend
Then mensagem de erro é exibida acima do formulário ou abaixo do campo email

### Fluxo de UI
1. Usuário preenche todos os campos corretamente
2. Clica "Criar conta" → botão mostra spinner, campos desabilitam
3. **Sucesso**: redireciona para `/onboarding`
4. **Erro 422**: botão volta ao normal, mensagem de erro aparece (toast ou inline)
5. **Erro de rede**: toast com "Erro de conexão. Tente novamente."

---

## Story 4 — Tratamento de erros e edge cases

**APA Phase**: Ajustar

Como aluno
Quero ver mensagens de erro claras quando algo dá errado no registro
Para entender o que corrigir e completar meu cadastro

### Critérios de Aceite

**Cenário 1: Senha fraca**
Given senha com menos de 8 caracteres
When o usuário tenta submeter
Then vê mensagem "Senha deve ter no mínimo 8 caracteres"

**Cenário 2: Confirmação diferente da senha**
Given confirmação de senha diferente do campo senha
When o campo perde foco
Then vê mensagem "As senhas não coincidem"

**Cenário 3: Timeout de rede**
Given a conexão com o backend falha
When POST /api/register dá timeout
Then toast "Erro de conexão. Tente novamente." e formulário volta ao estado editável

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | ~30% | Story 1 (formulário), Story 2 (endpoint) |
| Praticar | ~50% | Story 3 (integração completa) |
| Ajustar  | ~20% | Story 4 (erros e edge cases) |

- [x] Fase Adquirir mapeada em pelo menos uma story
- [x] Fase Praticar mapeada em pelo menos uma story
- [x] Fase Ajustar mapeada em pelo menos uma story
- [x] Critérios GIVEN/WHEN/THEN cobrem progressão pedagógica
