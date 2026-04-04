---
name: APA Method
version: 1.0.0
type: knowledge
description: Metodo pedagogico APA aplicado a historias, implementacao e validacao do Fluency AI
---

# APA Method

## Definicao das 3 fases

| Fase | Percentual | Descricao |
|---|---|---|
| **Adquirir** | 30% | Apresentacao do conceito, contexto e teoria |
| **Praticar** | 50% | Execucao guiada, exercicios interativos com feedback |
| **Ajustar** | 20% | Correcao de lacunas, refinamento adaptativo por progresso |

---

## Como se manifesta no codigo do Fluency AI

### Fase Adquirir (30%)

- O `EnglishTeacherAgent` apresenta o topico com explicacao clara antes de pedir qualquer producao
- Endpoints que retornam conteudo introdutorio (vocabulario, gramatica, contexto cultural)
- UI: tela de "hoje vamos aprender X" antes das atividades
- Agent instruction: `"Start by explaining the concept clearly before asking the student to practice."`

Exemplo no `instructions()` do agent:
```
First, introduce the grammar point with 2-3 clear examples.
Use simple language. Do not ask the student to produce language yet.
```

### Fase Praticar (50%)

- Fluxos interativos: fill-in-the-blank, dialogue practice, pronunciation feedback
- O agent monitora erros e oferece dicas graduais
- Endpoints com POST de respostas do aluno e validacao
- UI: exercicios com feedback imediato (verde/vermelho, hint disponivel)

Exemplo no `instructions()` do agent:
```
Now guide the student through 3-5 practice exercises.
Give immediate feedback after each answer.
Use positive reinforcement. Offer hints only if they struggle twice.
```

### Fase Ajustar (20%)

- Personalizacao baseada nos erros recorrentes detectados no historico
- O agent adapta proxima sessao com base no `squad_memory` de progresso
- Endpoints de progresso que retornam areas fracas do aluno
- UI: resumo de "voce errou muito X, vamos praticar mais"

Exemplo no `instructions()` do agent:
```
Review the student's errors from this session.
Identify the top 1-2 recurring mistakes.
Explain why the error happens and provide a targeted mini-exercise.
```

---

## Proporcao funcional esperada

Para validar que uma feature respeita APA, o QA deve verificar que:

- ~30% das interacoes/telas sao dedicadas a apresentacao/contexto
- ~50% das interacoes/telas sao exercicios e pratica ativa
- ~20% das interacoes/telas sao correcao/adaptacao personalizada

Nao precisa ser exato, mas o desbalanco grave (ex: 100% exercicios sem explicacao) invalida a feature.

---

## Compliance checklist

Para o PM ao escrever stories:
- [ ] Story mapeia explicitamente em qual fase APA se encaixa (Adquirir / Praticar / Ajustar)
- [ ] Criterios GIVEN/WHEN/THEN cobrem a progressao pedagogica da fase
- [ ] Aceite inclui validacao de que o agent nao pula etapas (ex: pede producao antes de explicar)

Para o QA ao validar:
- [ ] Proporcao funcional aproximada 30/50/20 respeitada na feature
- [ ] Agent nao produz exercicios sem contexto previo
- [ ] Feedback do agent e construtivo em cada fase
- [ ] Ajuste adapta baseado em historico — nao e generico

Para decisoes arquiteturais relevantes:
- [ ] Decisao registrada em `squad_decisions` com impacto no metodo APA descrito
