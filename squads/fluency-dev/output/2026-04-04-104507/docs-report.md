# Docs Report — Run 2026-04-04-104507

**Task**: [AGENT] EnglishTeacherAgent core (Issue #15)
**Agent**: Docs Agent
**Date**: 2026-04-04

---

## ADR registrado

**Arquivo**: `docs/adr/2026-04-04-cors-sanctum-stateful-api.md`

Decisão de remover `statefulApi()` temporariamente por Sanctum não estar instalado.
Rotas da API são públicas (auth por Student UUID) — instalar Sanctum em task futura dedicada.

---

## Resumo técnico entregue

### EnglishTeacherAgent (`app/Ai/Agents/EnglishTeacherAgent.php`)

Agente principal de ensino de inglês. Implementa `Agent + Conversational + HasTools`.

**Endpoints:**

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/v1/students/{student}/chat` | Chat texto, resposta JSON |
| POST | `/api/v1/students/{student}/chat/stream` | Chat streaming SSE |
| POST | `/api/v1/students/{student}/chat/voice` | Chat voz (respostas curtas) |
| GET | `/api/v1/students/{student}/chat/voice/greeting` | Saudação personalizada |

**Sistema prompt APA:**
- ADQUIRIR (30%): introdução de conceito, exemplos, sem produção ainda
- PRATICAR (50%): exercícios graduais, feedback imediato
- AJUSTAR (20%): padrões de erro recorrentes, mini-exercício corretivo

**Histórico Redis:**
- Chave: `fluency:chat:{student_id}:{session_id}`
- TTL: 7 dias
- Máximo: 20 mensagens

### Tools

| Tool | Descrição |
|---|---|
| `GetStudentProgressTool` | Retorna nível, streak, plano, últimos erros e conquistas |
| `SaveLearningNoteTool` | Persiste observação na tabela `memories` (tipo, conteúdo, fase APA, importância) |

---

## Commit

`971688f` — `feat: EnglishTeacherAgent core — chat, voice, tools, Redis history (closes #15)`

---

## Status final

Task `05057889` marcada como `done` no Supabase.
Issue #15 fechada via commit message (`closes #15`).
