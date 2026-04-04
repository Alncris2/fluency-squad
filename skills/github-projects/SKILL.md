---
name: GitHub Projects
version: 1.0.0
type: knowledge
description: Operacao de issues, labels, milestones, commits e PRs no fluxo da squad fluency-dev
---

# GitHub Projects

## Repositorios do Fluency AI

- **Backend**: `Alncris2/fluency-ai-backend`
- **Frontend**: `Alncris2/fluency-ai-frontend`
- **Project Board**: `github.com/users/Alncris2/projects/4` (60 issues, 6 sprints)

---

## Fluxo padrao de uma task

```
1. Ler issue via MCP GitHub (get_issue ou list_issues)
2. Confirmar escopo tecnico e criterios de aceite
3. Implementar em branch feat/<nome>
4. Abrir PR referenciando o issue
5. Commitar com "closes #N" no merge para fechar automaticamente
```

---

## Convencao de commit obrigatoria

```
feat: <descricao em portugues> (closes #N)
fix: <descricao em portugues> (closes #N)
docs: <descricao em portugues>
test: <descricao em portugues>
refactor: <descricao em portugues>
```

Exemplos reais:
```
feat: autenticacao com Laravel Sanctum (closes #5)
feat: componente de chat com streaming SSE (closes #12)
fix: corrigir redirect apos login no frontend (closes #7)
```

---

## Operacoes via MCP GitHub

### Ler proxima issue do backlog

```
list_issues(
  owner: "Alncris2",
  repo: "fluency-ai-backend",
  state: "open",
  labels: ["backlog"],
  sort: "created",
  direction: "asc"
)
```

### Ler detalhes de uma issue especifica

```
get_issue(
  owner: "Alncris2",
  repo: "fluency-ai-backend",
  issue_number: 5
)
```

### Atualizar label de uma issue

```
update_issue(
  owner: "Alncris2",
  repo: "fluency-ai-backend",
  issue_number: 5,
  labels: ["in-progress"]
)
```

### Criar PR apos implementacao

```
create_pull_request(
  owner: "Alncris2",
  repo: "fluency-ai-backend",
  title: "feat: autenticacao com Laravel Sanctum (closes #5)",
  body: "## O que foi feito\n...\n## Como testar\n...",
  head: "feat/autenticacao-sanctum",
  base: "main"
)
```

---

## Labels padrao no projeto

| Label | Significado |
|---|---|
| `backlog` | Task nao iniciada |
| `in-progress` | Task em desenvolvimento |
| `review` | Aguardando code review |
| `done` | Concluida |
| `backend` | Afeta backend Laravel |
| `frontend` | Afeta frontend Angular |
| `blocked` | Bloqueada por dependencia |

---

## Milestones por sprint

| Milestone | Sprint | Periodo |
|---|---|---|
| Sprint 1 | 1 | Abril 2026 — semana 1-2 |
| Sprint 2 | 2 | Abril 2026 — semana 3-4 |
| Sprint 3 | 3 | Maio 2026 — semana 1-2 |
| Sprint 4 | 4 | Maio 2026 — semana 3-4 |
| Sprint 5 | 5 | Junho 2026 — semana 1-2 |
| Sprint 6 | 6 | Junho 2026 — semana 3-4 |

---

## Checklist

- [ ] Issue correta identificada e lida via MCP
- [ ] Branch criada no formato `feat/<nome>`
- [ ] Commit no formato `feat: descricao (closes #N)`
- [ ] PR aberto com resumo tecnico e instrucoes de teste
- [ ] Label atualizada para `review` ou `done` conforme estado
