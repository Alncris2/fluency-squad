# Docs Report — [AUTH] Tela de login Angular (#9)

## OpenAPI

- Nenhum endpoint novo criado (scope frontend only)
- Backend `/api/login` ainda não implementado (pré-existente, pendente de task de auth backend)

## README

- [x] Frontend README atualizado: `frontend/README.md`
  - Substituído template Rizz padrão por documentação do Fluency AI
  - Tabela de features implementadas adicionada
  - Arquitetura, stack e cores documentadas

## ADR

- [x] Criado: `docs/adr/2026-04-07-auth-store-isloading.md`
  - Decisão: adição de `isLoading` ao `AuthenticationState` no NgRx
  - Justificativa: estado de loading no store permite reutilização por múltiplos componentes e é consistente com a arquitetura existente

## Checklist de aceite

- [x] OpenAPI: N/A (sem endpoints novos)
- [x] README frontend atualizado
- [x] ADR criado para mudança no store de autenticação
- [x] `docs-report.md` produzido
