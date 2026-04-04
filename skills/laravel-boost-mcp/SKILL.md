---
name: Laravel Boost MCP
version: 1.0.0
type: knowledge
description: Guia de uso do MCP Laravel Boost para implementacao assistida no backend Fluency AI
---

# Laravel Boost MCP

## Regra absoluta

**SEMPRE** executar `search-docs` antes de implementar qualquer feature backend.
Sem excecao. Isso evita implementar padroes desatualizados ou contrariar convencoes do framework.

---

## Configuracao

O MCP Laravel Boost roda no contexto do backend:

```json
"laravel-boost": {
  "command": "${LARAVEL_BOOST_COMMAND}",
  "args": ["${LARAVEL_BOOST_ARGS}"],
  "cwd": "${BACKEND_PATH}"
}
```

Variaveis de ambiente:
- `LARAVEL_BOOST_COMMAND=node`
- `LARAVEL_BOOST_ARGS=./vendor/laravel/boost/mcp-server.js`
- `BACKEND_PATH=/home/friday/projects/fluency-ai/backend`

---

## Ferramentas disponiveis

### `search-docs`

Consulta documentacao oficial Laravel, laravel/ai SDK e ecossistema.

**Quando usar**: antes de implementar qualquer endpoint, migration, service, agent, tool.

```
Exemplo de uso:
search-docs("laravel sanctum api authentication")
search-docs("laravel/ai agent streaming SSE")
search-docs("laravel artisan make:controller resource")
```

O resultado retorna trechos relevantes da doc com exemplos de codigo.

---

### `database-schema`

Inspeciona o schema atual do banco de dados PostgreSQL do Fluency AI.

**Quando usar**: antes de criar migrations, antes de queries complexas, antes de refactors que afetam tabelas existentes.

```
Exemplo de uso:
database-schema()                    -- lista todas as tabelas
database-schema("users")             -- schema da tabela users
database-schema("conversations")     -- schema da tabela conversations
```

---

### `database-query`

Executa queries de leitura no banco para validar dados e impacto de mudancas.

**Quando usar**: antes de migrations destrutivas, para validar dados de teste, para confirmar estado atual.

```
Exemplo de uso:
database-query("SELECT COUNT(*) FROM users")
database-query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'messages'")
```

---

### `browser-logs`

Captura logs do browser durante interacoes com a aplicacao.

**Quando usar**: para depurar bugs de integracao frontend-backend, erros de CORS, problemas de streaming SSE.

```
Exemplo de uso:
browser-logs()  -- captura logs recentes do console do browser
```

---

### `get-absolute-url`

Resolve a URL absoluta atual da aplicacao (util em ambiente local/WSL).

**Quando usar**: para montar callbacks OAuth, configurar CORS, depurar redirects.

```
Exemplo de uso:
get-absolute-url("/api/auth/callback")
get-absolute-url("/api/v1/lessons")
```

---

## Protocolo de uso em cada step

### Antes de implementar (Dev Backend obrigatorio)

```
1. search-docs("<topico da feature>")
2. Anotar padroes relevantes no relatorio do step
3. Se envolve banco: database-schema("<tabela impactada>")
4. Implementar seguindo os padroes encontrados
```

### Durante debugging

```
1. browser-logs() para erros de integracao
2. database-query() para validar estado do banco
3. get-absolute-url() para resolver problemas de URL/redirect
```

---

## Checklist

- [ ] `search-docs` executado para o topico principal da task
- [ ] Resultado do search-docs anotado no `backend-changes.md`
- [ ] Mudanca de schema validada com `database-schema` antes da migration
- [ ] Query complexa testada com `database-query` antes de rodar em producao
- [ ] Evidencias de execucao dos testes anexadas no relatorio final
