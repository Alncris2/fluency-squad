# Frontend Changes — [INFRA] Monorepo + Docker Compose

## Arquivos criados

- `proxy.conf.json` — proxy de desenvolvimento Angular para evitar CORS em dev local:
  - `/api/*` → `http://localhost:8000`
  - `/sanctum/*` → `http://localhost:8000`

## Arquivos alterados

- `angular.json`
  - Adicionado `"proxyConfig": "proxy.conf.json"` na configuração `serve.options`
  - Permite que `ng serve` (porta 4200) faça proxy transparente para o backend (porta 8000) em desenvolvimento local fora de Docker

## Rotas impactadas

Nenhuma rota nova criada — este step é de infraestrutura.

## Impacto em estado

Nenhum store alterado.

## Validações executadas

- `ng build --configuration production`: não executado neste step (build requer node_modules sincronizados no container)
- proxy.conf.json validado manualmente — sintaxe JSON correta

## Observação sobre hot-reload

O Dockerfile de frontend já usa `CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]` que habilita hot-reload via polling — funciona corretamente com volumes Docker no WSL2.

## Decisões técnicas

1. **proxy.conf.json para dev local**: quando desenvolvendo fora do Docker (`ng serve` direto), o proxy redireciona requests `/api` para o backend sem precisar configurar CORS adicional. Dentro do Docker, o CORS do Laravel cobre a comunicação.
2. **Sem `environment.ts`**: a URL da API será configurada via variável de ambiente em tempo de build (`NG_APP_API_URL`) quando necessário. Por ora, o proxy cobre o desenvolvimento local.
