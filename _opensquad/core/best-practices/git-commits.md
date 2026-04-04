---
id: git-commits
name: Git Commits Best Practices
category: engineering
---

# Git Commits Best Practices

## Convencao obrigatoria no Fluency AI

```
<tipo>: <descricao em portugues> (closes #N)
```

O `closes #N` fecha o issue automaticamente no GitHub ao fazer merge para `main`.

---

## Tipos de commit

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feat` | Nova funcionalidade | `feat: autenticacao com Sanctum (closes #5)` |
| `fix` | Correcao de bug | `fix: token nao retornado no login (closes #7)` |
| `docs` | Documentacao | `docs: adicionar OpenAPI para endpoints de licao` |
| `test` | Testes | `test: cobrir LessonController com PHPUnit` |
| `refactor` | Refatoracao sem bug nem feature | `refactor: extrair logica de APA para LessonService` |
| `chore` | Tarefas de manutencao | `chore: atualizar dependencias do composer` |
| `style` | Formatacao (Pint, ESLint) | `style: aplicar Pint em controllers` |

---

## Exemplos reais do projeto

```bash
# Feature backend
git commit -m "feat: autenticacao com Laravel Sanctum (closes #5)"

# Feature frontend
git commit -m "feat: componente de chat com streaming SSE (closes #12)"

# Bug fix com issue
git commit -m "fix: corrigir redirect apos login no Angular (closes #7)"

# Sem issue (tarefas internas da squad)
git commit -m "chore: atualizar squad_tasks no Supabase"

# Multiplas issues (se um commit fecha mais de uma)
git commit -m "feat: login e registro com Sanctum (closes #5, closes #6)"
```

---

## Branch naming

```bash
# Features
feat/autenticacao-sanctum
feat/chat-streaming
feat/lesson-component

# Fixes
fix/login-redirect
fix/token-expiration

# Branches temporarias da squad (nao commitar em main)
squad/run-2026-04-04
```

---

## Regras de qualidade

- **Commits atomicos**: um commit = uma mudanca logica coerente
- **Testes passando** antes de qualquer push: `php artisan test` + `ng build`
- **Nunca commitar** com testes falhando
- **Nunca usar** `--no-verify` para pular hooks pre-commit
- **PR obrigatorio** para features — nunca push direto em `main`

---

## PR (Pull Request)

Titulo seguindo a mesma convencao de commits:
```
feat: autenticacao com Laravel Sanctum (#5)
```

Body minimo:
```markdown
## O que foi implementado
- Login via POST /api/v1/auth/login com Sanctum
- Registro via POST /api/v1/auth/register
- Middleware auth:sanctum nas rotas protegidas

## Como testar
1. POST /api/v1/auth/login com email e senha validos
2. Usar token retornado no header Authorization: Bearer {token}
3. GET /api/v1/user deve retornar dados do usuario autenticado

## Testes
- LessonControllerTest: 5 testes passando
- Cobertura: 84%

Closes #5
```

---

## Checklist antes do commit

- [ ] Testes passando (`php artisan test` e/ou `ng build`)
- [ ] Mensagem no formato `tipo: descricao (closes #N)`
- [ ] Branch correta (`feat/<nome>` ou `fix/<nome>`)
- [ ] Nao comitou `.env` ou credenciais
