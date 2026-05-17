---
name: feedback-then-callback-http-tests
description: then() do StreamableAgentResponse não dispara em HTTP tests (postJson) — usar unit test com foreach
metadata:
  type: feedback
---

Em HTTP tests Laravel (`$this->postJson(...)`), o `StreamableAgentResponse` nunca tem seu stream consumido — logo o `then()` callback nunca dispara. Isso significa que:
- Mensagem teacher (salva em `then()`) não aparece no banco após HTTP test
- `usage_logs` (inserido em `then()`) não aparece após HTTP test

**Why:** TestResponse não chama `getContent()` em StreamedResponse — o stream nunca é iterado.

**How to apply:** Para testar persistência que acontece em `then()`, SEMPRE usar unit test que chama o service diretamente e consome o stream:
```php
$stream = app(MessageProcessor::class)->handle($session, 'content');
foreach ($stream as $_) {} // <-- dispara then()
expect(...)->toBe(1);
```
HTTP tests verificam apenas: status code, headers SSE (`Content-Type: text/event-stream`), e comportamentos síncronos (ex: user message salva imediatamente).

Ver também: [[feedback-subscription-limits-middleware]], squad memory entrada 2026-05-13.
