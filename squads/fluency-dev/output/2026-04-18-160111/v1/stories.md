# Stories — Planejamento Frontend Angular 21 + Tailwind
# Gerado por: PM
# Run: 2026-04-18-160111

## Contexto

Novo projeto Angular 21.2 + Tailwind CSS v4 iniciado do zero.
Design handoff completo com 9 telas definidas no Claude Design.
Esta task é de **planejamento** — o output é um documento de arquitetura,
não código. Implementação segue em tasks separadas por tela/feature.

---

## Epic: FE-INFRA — Infraestrutura e Design System

### US-01 · Configurar design system como tokens Tailwind v4

**Como** desenvolvedor frontend,
**Quero** que as variáveis do design (cores OKLCH, tipografia, sombras, bordas) estejam
mapeadas em tokens Tailwind CSS v4,
**Para** que todos os componentes compartilhem a mesma linguagem visual do protótipo.

**Critérios de aceite:**
- GIVEN o arquivo `styles.css` do projeto
- WHEN o dev system for configurado
- THEN `--brand-purple`, `--brand-teal`, `--paper`, `--ink`, `--shadow-md` etc.
  estão disponíveis como CSS custom properties via `@theme` do Tailwind v4
- AND DM Sans e JetBrains Mono estão configuradas via Google Fonts no `index.html`
- AND classes utilitárias `shadow-neo-sm/md/lg` mapeiam os offset shadows (2px/4px/6px solid ink)
- AND o dark mode funciona via `data-theme="dark"` no `<html>`

**Veto:** tokens não batem com o arquivo `tokens.css` do handoff.

---

### US-02 · Definir estrutura de pastas e módulos Angular

**Como** desenvolvedor frontend,
**Quero** uma estrutura de pastas padronizada para o projeto,
**Para** que cada feature do protótipo tenha um lugar claro e o projeto escale sem conflitos.

**Critérios de aceite:**
- GIVEN o scaffold limpo do Angular 21.2
- WHEN a estrutura for definida
- THEN existem as pastas: `core/`, `shared/`, `features/`, `layouts/`
- AND cada feature do protótipo tem sua pasta em `features/{nome}/`
- AND a rota raiz redireciona para `/dashboard` quando autenticado
- AND rotas lazy-loaded configuradas para cada feature

**Veto:** estrutura diverge do padrão Angular 21 standalone components.

---

### US-03 · Configurar roteamento principal

**Como** usuário da plataforma,
**Quero** navegar entre as seções do produto de forma fluida,
**Para** ter uma experiência SPA sem recarregamento de página.

**Critérios de aceite:**
- GIVEN que o usuário não está autenticado
- WHEN acessa qualquer rota protegida
- THEN é redirecionado para `/auth/login`

- GIVEN que o usuário completou o onboarding
- WHEN acessa `/`
- THEN é redirecionado para `/dashboard`

- GIVEN que o usuário é novo (sem diagnóstico)
- WHEN completa o registro
- THEN é redirecionado para `/onboarding/objetivo`

**Rotas definidas:**
```
/auth/login
/auth/register
/auth/forgot-password
/auth/reset-password
/onboarding/objetivo        (step 1)
/onboarding/nivel           (step 2)
/onboarding/interesses      (step 3)
/onboarding/horario         (step 4)
/diagnostico                (fluxo conversacional)
/dashboard                  (home do aluno)
/chat                       (chat com Nina)
/chat/:sessionId            (sessão específica)
/estudos/plano              (plano de estudos)
/estudos/flashcards         (deck de flashcards)
/estudos/flashcards/:deckId (sessão de revisão)
/progresso                  (progresso e memórias)
```

**Veto:** rota não coberta por AuthGuard ou OnboardingGuard conforme necessidade.

---

## Epic: FE-AUTH — Autenticação e Onboarding

### US-04 · Telas de autenticação

**Como** usuário novo ou existente,
**Quero** telas de login, registro e recuperação de senha,
**Para** acessar a plataforma com segurança.

**Critérios de aceite:**
- GIVEN o componente `LoginComponent`
- WHEN renderizado
- THEN exibe: input email, input password (com toggle show/hide), botão "Entrar",
  link "Esqueci minha senha", link "Criar conta", layout split (hero | form) no desktop
- AND versão mobile: single column com logo no topo

- GIVEN o componente `RegisterComponent`
- WHEN renderizado
- THEN exibe: nome, email, password com strength meter, botão "Criar conta"

- GIVEN o componente `ForgotPasswordComponent` e `ResetPasswordComponent`
- WHEN renderizados
- THEN seguem o fluxo do protótipo (email sent state intermediário)

**Componentes a gerar:**
```
ng generate component features/auth/pages/login
ng generate component features/auth/pages/register
ng generate component features/auth/pages/forgot-password
ng generate component features/auth/pages/reset-password
ng generate component features/auth/pages/email-sent
```

**Veto:** componente não usa o design system (tokens, soft neo-brutalism).

---

### US-05 · Onboarding wizard (4 passos)

**Como** usuário novo pós-registro,
**Quero** completar 4 passos de onboarding guiados pela Nina,
**Para** que a plataforma personalize minha experiência de aprendizado.

**Critérios de aceite:**
- GIVEN o fluxo de onboarding
- WHEN o usuário avança pelos steps
- THEN step dots mostram progresso (1/4 → 2/4 → 3/4 → 4/4)
- AND cada step salva a resposta no store antes de avançar
- AND no último step Nina aparece com mensagem de boas-vindas personalizada
- AND ao concluir redireciona para `/diagnostico`

**Steps:**
1. `OnboardingObjetivoComponent` — por que aprender inglês (cards de seleção)
2. `OnboardingNivelComponent` — nível atual (A1→C1, auto-avaliação)
3. `OnboardingInteressesComponent` — tópicos de interesse (chips multi-select)
4. `OnboardingHorarioComponent` — dias/horário preferidos + meta semanal

**Veto:** state não persiste entre steps (usuário perde seleção ao voltar).

---

## Epic: FE-DASHBOARD — Home do Aluno

### US-06 · Dashboard principal

**Como** aluno da plataforma,
**Quero** uma visão geral do meu progresso ao abrir o app,
**Para** saber imediatamente o que fazer hoje.

**Critérios de aceite:**
- GIVEN o `DashboardComponent`
- WHEN renderizado com dados do aluno
- THEN exibe: card hero "continuar de ontem", streak heatmap 14 semanas,
  barra CEFR, radar de 5 habilidades, meta semanal, palavras recentes,
  chats recentes, Nina card com observação do dia
- AND Nina FAB flutuante (canto inferior direito) sempre visível
- AND estado "Dia 1" (aluno novo) mostra empty states com call-to-action

**Veto:** dashboard carrega dados sem loading skeleton.

---

## Epic: FE-CHAT — Chat com Nina

### US-07 · Interface de chat principal

**Como** aluno,
**Quero** conversar com a Nina em diferentes modos,
**Para** praticar inglês de forma contextualizada.

**Critérios de aceite:**
- GIVEN o `ChatComponent`
- WHEN em modo "Conversa livre"
- THEN: bolhas de mensagem com avatar Nina reativo, typing dots durante streaming,
  input de texto com botão enviar, toggle para modo voz
- AND painel colapsável lateral com stats ao vivo, wordlist e memória da Nina
- AND suporte a mensagens ricas: áudio (waveform + play), vocab card,
  mini-quiz inline, tabela de conjugação, correção discreta em card dashed

- GIVEN modo "Voz"
- WHEN ativado
- THEN layout imersivo em roxo com avatar grande, transcrição live, waveform

- GIVEN fim de sessão
- WHEN debrief ativado
- THEN hero colorido com wins, pontos de melhoria, palavra da semana

**Veto:** streaming SSE não fecha EventSource no evento `done`.

---

## Epic: FE-ESTUDOS — Plano e Flashcards

### US-08 · Plano de estudos adaptativo

**Como** aluno,
**Quero** visualizar meu plano de estudos gerado pela Nina,
**Para** saber o que praticar em cada dia da semana.

**Critérios de aceite:**
- GIVEN o `StudyPlanComponent`
- WHEN renderizado
- THEN exibe plano semanal com dias, tópicos e duração estimada
- AND "hoje" é destacado com card de continuidade
- AND Nina pode ajustar o plano via chat inline

---

### US-09 · Sistema de flashcards com SRS

**Como** aluno,
**Quero** revisar vocabulário via flashcards com repetição espaçada,
**Para** memorizar palavras de forma eficiente.

**Critérios de aceite:**
- GIVEN o `FlashcardsHomeComponent`
- WHEN renderizado
- THEN lista de decks com: nome, quantidade de cards, próxima revisão, curva de esquecimento
- AND botão "Revisar agora" para decks com cards vencidos

- GIVEN o `FlashcardReviewComponent`
- WHEN em sessão de revisão
- THEN card virado com frente/verso, botão de áudio, contexto da conversa,
  botões de auto-avaliação (Fácil / Ok / Difícil / Errei)
- AND comentário da Nina após cada resposta

**Veto:** virada do card sem animação CSS transform.

---

## Epic: FE-PROGRESSO — Progresso e Memórias

### US-10 · Tela de progresso e memórias da Nina

**Como** aluno,
**Quero** ver meu histórico detalhado e o que a Nina lembra sobre mim,
**Para** acompanhar minha evolução e personalização.

**Critérios de aceite:**
- GIVEN o `ProgressComponent`
- WHEN renderizado
- THEN exibe: linha temporal de sessões, heatmap de atividade, stats acumulados
  (tempo total, flashcards revisados, palavras aprendidas)
- AND seção "Memórias da Nina": tópicos favoritos, erros recorrentes, conquistas
- AND timeline de conquistas com badges

---

## Resumo de componentes planejados

| Feature     | Componentes principais                                              |
|-------------|---------------------------------------------------------------------|
| Auth        | LoginPage, RegisterPage, ForgotPage, ResetPage, EmailSentPage      |
| Onboarding  | ObjetivoStep, NivelStep, InteressesStep, HorarioStep               |
| Diagnostico | DiagnosticoFlowComponent                                            |
| Dashboard   | DashboardPage, StreakHeatmap, CefrBar, SkillsRadar, NinaFab        |
| Chat        | ChatPage, ChatBubble, MessageRich, VoiceModeOverlay, ChatDebrief   |
| Estudos     | StudyPlanPage, FlashcardsHome, FlashcardReview, FlashcardDeck      |
| Progresso   | ProgressPage, ActivityTimeline, NinaMemories, AchievementBadge     |
| Shared      | NinaAvatar, StepDots, PasswordStrength, LoadingSkeleton, Toast     |

---

_Aprovação requerida antes de prosseguir para o planejamento técnico detalhado._
