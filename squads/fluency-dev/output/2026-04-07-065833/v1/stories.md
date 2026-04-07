# Stories — [AUTH] Tela de login Angular

> Task: #9 | Sprint: sprint_1_infra | Scope: frontend only

---

## Story 1 — Formulário de login com validação

**APA Phase**: Adquirir

Como aluno
Quero visualizar um formulário de login com campos de email e senha validados
Para entender quais dados preciso fornecer e receber feedback claro sobre erros de preenchimento

### Critérios de Aceite

**Cenário 1: Campos visíveis e acessíveis**
Given que o aluno acessa `/login`
When a página carrega
Then ele vê um formulário com campo "Email" (type email), campo "Senha" (type password) e botão "Entrar"

**Cenário 2: Validação de email inválido**
Given que o aluno está no formulário de login
When ele digita um email sem formato válido (ex: "usuario") e tenta submeter
Then uma mensagem de erro inline aparece abaixo do campo: "Informe um e-mail válido"

**Cenário 3: Validação de senha curta**
Given que o aluno está no formulário de login
When ele digita uma senha com menos de 8 caracteres e tenta submeter
Then uma mensagem de erro inline aparece abaixo do campo: "A senha deve ter ao menos 8 caracteres"

### Fluxo de UI
1. Aluno acessa `/login`
2. Vê layout centralizado com card de login (logo Fluency, título "Bem-vindo de volta")
3. Vê campo "Email" com placeholder "seu@email.com"
4. Vê campo "Senha" com placeholder "••••••••" e ícone toggle show/hide
5. Vê link "Esqueci minha senha" (estático por ora) e link "Criar conta" → `/register`
6. Vê botão "Entrar" (primary, full-width)
7. Ao submeter com dados inválidos → mensagens de erro aparecem abaixo de cada campo, sem request HTTP

---

## Story 2 — Autenticação e redirect pós-login

**APA Phase**: Praticar

Como aluno
Quero submeter credenciais válidas e ser redirecionado ao dashboard
Para iniciar minha sessão de estudo sem atrito

### Critérios de Aceite

**Cenário 1: Login com credenciais válidas**
Given que o aluno preencheu email e senha válidos
When ele clica em "Entrar"
Then o botão exibe spinner de loading, uma requisição POST é feita para `/api/auth/login`, e após sucesso ele é redirecionado para `/dashboard`

**Cenário 2: Credenciais inválidas**
Given que o aluno preencheu email ou senha incorretos
When ele clica em "Entrar"
Then o botão volta ao estado normal e uma mensagem de erro aparece acima do formulário: "E-mail ou senha incorretos"

**Cenário 3: Loading state**
Given que o aluno submeteu o formulário
When a requisição está em andamento
Then o botão "Entrar" fica desabilitado com spinner, e os campos ficam readonly

### Fluxo de UI
1. Aluno preenche email e senha válidos e clica "Entrar"
2. Botão muda para estado loading (spinner + texto "Entrando...")
3. Campos ficam desabilitados durante a requisição
4. Sucesso → token salvo no store → redirect para `/dashboard`
5. Erro 401/422 → botão volta ao normal → banner de erro acima do formulário com mensagem da API
6. Erro de rede → banner "Erro de conexão. Tente novamente."

---

## Story 3 — Redirect se já autenticado

**APA Phase**: Praticar

Como aluno já autenticado
Quero ser redirecionado automaticamente ao tentar acessar `/login`
Para não precisar fazer login novamente

### Critérios de Aceite

**Cenário 1: Aluno autenticado acessa /login**
Given que o aluno possui token válido no store (está logado)
When ele navega para `/login`
Then o guard redireciona imediatamente para `/dashboard` sem renderizar o formulário

### Fluxo de UI
1. Aluno autenticado tenta acessar `/login` (digitando URL ou link externo)
2. AuthGuard (já existente no projeto) detecta token válido
3. Redirect automático para `/dashboard` — formulário nunca é exibido

---

## Story 4 — Link para registro

**APA Phase**: Ajustar

Como aluno sem conta
Quero acessar a tela de registro a partir da tela de login
Para criar minha conta sem precisar navegar manualmente

### Critérios de Aceite

**Cenário 1: Link de registro visível**
Given que o aluno está na tela `/login`
When ele visualiza o formulário
Then ele vê o texto "Não tem conta? Criar conta" com link que navega para `/register`

**Cenário 2: Navegação para registro**
Given que o aluno clica em "Criar conta"
When o clique é processado
Then ele é redirecionado para `/register` via Angular Router (sem reload de página)

### Fluxo de UI
1. Link "Criar conta" aparece abaixo do botão "Entrar"
2. Clique usa `routerLink="/register"` → navegação SPA sem reload
3. Estado do formulário é descartado ao sair da rota

---

## APA Compliance

| Fase | Percentual esperado | Stories que cobrem |
|---|---|---|
| Adquirir | ~30% | Story 1 (formulário + validação visual) |
| Praticar | ~50% | Stories 2 e 3 (submit, autenticação, redirect) |
| Ajustar  | ~20% | Story 4 (link para registro, acessibilidade do fluxo) |

- [x] Fase Adquirir mapeada em pelo menos uma story
- [x] Fase Praticar mapeada em pelo menos uma story
- [x] Fase Ajustar mapeada em pelo menos uma story
- [x] Critérios GIVEN/WHEN/THEN cobrem progressão pedagógica
- [x] Fluxos de UI descritos com precisão para validação no browser
