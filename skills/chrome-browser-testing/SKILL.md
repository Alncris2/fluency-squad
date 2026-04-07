---
name: Chrome Browser Testing
version: 1.0.0
type: knowledge
description: Guia para interacao com browser real via Claude in Chrome MCP — navegacao, formularios, screenshots, GIFs e debug
---

# Chrome Browser Testing

Skill para interacao com o browser real usando Claude in Chrome MCP.
Permite navegar, clicar, preencher formularios, capturar screenshots/GIFs e debugar console/network.

---

## Preflight Check (OBRIGATORIO)

Antes de qualquer teste no browser, executar:

```
tabs_context_mcp
```

- Se responder: Chrome esta disponivel, prosseguir com browser testing
- Se falhar (Chrome fechado/extensao desativada): **pular browser testing**, registrar warning no relatorio e prosseguir com testes automatizados apenas

---

## Tools Reference

| Tool | Quando usar |
|------|-------------|
| `navigate` | Ir a uma URL, voltar, avancar |
| `read_page` | Ler conteudo visivel da pagina (DOM/accessibility tree) |
| `get_page_text` | Extrair texto completo da pagina |
| `find` | Localizar elemento por texto, label ou selector |
| `form_input` | Preencher campos de formulario |
| `computer` | Click, type, scroll, screenshot (interacao baixo nivel) |
| `javascript_tool` | Executar JS no contexto da pagina |
| `read_console_messages` | Capturar logs do console (errors, warnings) |
| `read_network_requests` | Capturar trafego de rede (requests/responses) |
| `gif_creator` | Gravar sequencia de interacoes como GIF |
| `resize_window` | Definir tamanho do viewport |
| `tabs_create_mcp` | Abrir nova aba |
| `tabs_close_mcp` | Fechar aba |
| `tabs_context_mcp` | Listar abas abertas / verificar estado |

---

## Ambiente WSL2

- Chrome roda no **Windows host**, aplicacao roda no **WSL2**
- URLs de acesso:
  - Angular dev server: `http://localhost:4200`
  - Laravel API: `http://localhost:8000`
- WSL2 faz port-forwarding automatico na maioria dos casos
- Se nao acessivel: garantir que o dev server roda em `0.0.0.0` (nao apenas `127.0.0.1`)

---

## Workflows Padrao

### Smoke Navigation

Verificacao basica de que uma rota carrega sem erros.

1. `navigate` → URL da rota (ex: `http://localhost:4200/dashboard`)
2. `read_page` → verificar que o conteudo principal carregou
3. `read_console_messages` → confirmar zero erros JS
4. `read_network_requests` → confirmar zero 4xx/5xx inesperados

### CRUD Completo (Formularios)

Testar fluxo completo de criar, editar e excluir.

**Create:**
1. `navigate` → pagina de listagem (ex: `/lessons`)
2. `read_page` → verificar que a lista/tabela aparece
3. `find` → botao "Criar" / "Novo" / "Add"
4. `computer` → click no botao
5. `read_page` → verificar que modal ou pagina de criacao abriu
6. `form_input` → preencher cada campo do formulario
7. `computer` → click no botao Submit/Salvar
8. `read_page` → verificar que item aparece na lista + toast/feedback de sucesso
9. `read_network_requests` → confirmar que API call retornou 201/200

**Edit:**
1. `find` → botao de editar no item recem-criado
2. `computer` → click
3. `read_page` → verificar que modal/pagina abre com dados preenchidos
4. `form_input` → alterar campo(s)
5. `computer` → click Submit/Salvar
6. `read_page` → verificar que alteracao reflete na lista

**Delete:**
1. `find` → botao de excluir no item
2. `computer` → click
3. `read_page` → verificar dialog de confirmacao (se houver)
4. `computer` → confirmar exclusao
5. `read_page` → verificar que item sumiu da lista

### Visual Verification

Verificar que o layout nao esta quebrado em diferentes viewports.

1. `resize_window` → 1280x720 (desktop)
2. `computer` → capturar screenshot
3. `resize_window` → 375x667 (mobile)
4. `computer` → capturar screenshot
5. Comparar: layout deve adaptar sem quebras visuais

### Debug Console/Network

Quando algo nao funciona como esperado:

1. `read_console_messages` → procurar erros JS, warnings, stack traces
2. `read_network_requests` → procurar:
   - Requests falhando (4xx, 5xx)
   - Requests que nao foram enviados (botao nao dispara API call)
   - Payloads incorretos
3. Se encontrar erro: usar a informacao para diagnosticar e corrigir

---

## Protocolo de Correcao (para Devs)

Se durante a verificacao no browser algo **NAO funciona** como esperado:

1. **Identificar** o problema: visual? logica? fluxo? erro de API?
2. **Se bug de implementacao** → corrigir o codigo imediatamente e re-testar no browser
3. **Se inconsistencia no planejamento do PM** (story faltando detalhe, fluxo ambiguo, comportamento nao especificado):
   - Registrar no relatorio de changes: `PM: [descricao da inconsistencia]`
   - Implementar a melhor interpretacao possivel e documentar a decisao
4. **Re-testar** apos cada correcao ate o fluxo funcionar 100%

---

## Anti-patterns

- **NAO** substituir Playwright por Chrome MCP — Chrome MCP complementa com verificacao manual-like
- **NAO** deixar tabs abertas apos testar — usar `tabs_close_mcp` para limpar
- **NAO** hardcodar credentials em `form_input` — referenciar variaveis de ambiente
- **NAO** usar `javascript_tool` para modificar estado da aplicacao durante testes — manter black-box
- **NAO** gravar GIFs longos — manter 5-10 segundos, focado na interacao especifica

---

## Convencao de Artefatos

Todos os artefatos de browser devem ser salvos em `output/{run_id}/browser/`:

| Tipo | Padrao de nome |
|------|---------------|
| Screenshot | `screenshot-{rota-slug}-{timestamp}.png` |
| GIF | `flow-{nome-do-fluxo}.gif` |
| Console log | `console-{rota-slug}.log` |
| Network log | `network-{rota-slug}.log` |
