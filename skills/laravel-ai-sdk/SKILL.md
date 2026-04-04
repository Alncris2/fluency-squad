---
name: Laravel AI SDK
version: 1.0.0
type: knowledge
description: Documentacao e padroes do laravel/ai SDK v0.4.x para agentes e features de IA no Fluency AI
---

# Laravel AI SDK

## Regra principal

NUNCA usar Prism. SEMPRE usar `laravel/ai` (versao atual no Fluency AI: `^0.4.3`).

---

## Estrutura de um Agent

Todo agente de IA no backend DEVE seguir este contrato. Referencia real: `app/Ai/Agents/FluencyAgent.php`.

```php
<?php

namespace App\Ai\Agents;

use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Messages\Message;
use Laravel\Ai\Promptable;
use Stringable;

class EnglishTeacherAgent implements Agent, Conversational, HasTools
{
    use Promptable;

    public function instructions(): Stringable|string
    {
        return <<<PROMPT
        You are an English teacher following the APA method.
        Adquirir (30%): introduce the concept clearly.
        Praticar (50%): guide the student through exercises.
        Ajustar (20%): correct errors and adapt to the student level.
        PROMPT;
    }

    /** @return Message[] */
    public function messages(): iterable
    {
        return $this->conversation->messages ?? [];
    }

    /** @return Tool[] */
    public function tools(): iterable
    {
        return [
            new CheckGrammarTool(),
            new GenerateExerciseTool(),
        ];
    }
}
```

---

## Contratos (namespace `Laravel\Ai\Contracts`)

| Contrato | Obrigatoriedade | Descricao |
|---|---|---|
| `Agent` | Obrigatorio | Base de todo agente |
| `Conversational` | Quando manter historico | Requer `messages()` retornando `Message[]` |
| `HasTools` | Quando usar tools externas | Requer `tools()` retornando `Tool[]` |

---

## Criando uma Tool

```php
<?php

namespace App\Ai\Tools;

use Laravel\Ai\Contracts\Tool;

class CheckGrammarTool implements Tool
{
    public function name(): string
    {
        return 'check_grammar';
    }

    public function description(): string
    {
        return 'Checks grammar of an English sentence and returns corrections.';
    }

    public function parameters(): array
    {
        return [
            'sentence' => [
                'type'        => 'string',
                'description' => 'The sentence to check.',
                'required'    => true,
            ],
        ];
    }

    public function handle(string $sentence): string
    {
        // implementacao real da validacao
        return "Corrected: {$sentence}";
    }
}
```

---

## Trait `Promptable`

- Acessa `$this->conversation` para historico da conversa
- Entry point padrao: `$agent->prompt(string $userMessage)`
- Gerencia contexto entre turnos automaticamente

---

## Streaming com SSE nativo Laravel

Para respostas progressivas do professor de IA:

```php
use Symfony\Component\HttpFoundation\StreamedResponse;

public function stream(Request $request): StreamedResponse
{
    return response()->stream(function () use ($request) {
        $agent = new EnglishTeacherAgent();
        foreach ($agent->stream($request->input('message')) as $chunk) {
            echo "data: {$chunk}\n\n";
            ob_flush();
            flush();
        }
    }, 200, [
        'Content-Type'      => 'text/event-stream',
        'Cache-Control'     => 'no-cache',
        'X-Accel-Buffering' => 'no',
    ]);
}
```

---

## Padroes PHP 8.4 obrigatorios

```php
// Constructor property promotion — sempre que possivel
class AgentService
{
    public function __construct(
        private readonly EnglishTeacherAgent $agent,
        private readonly ConversationRepository $conversations,
        private readonly int $maxSteps = 10,
    ) {}
}

// Return types sempre declarados
public function getNextExercise(int $lessonId): Exercise
{
    // ...
}

// Named arguments para clareza
$response = $agent->respond(
    message: $request->input('message'),
    context: $conversation->context,
);
```

---

## Geradores obrigatorios

```bash
# criar novo agente
php artisan make:agent VoicePracticeAgent

# criar nova tool
php artisan make:ai-tool TranslationTool
```

Nunca criar arquivos `*.php` manualmente quando existir gerador.

---

## Checklist antes de finalizar

- [ ] Nenhum uso de Prism no codigo novo
- [ ] Agente implementa `Agent` + contratos necessarios
- [ ] Tipagem completa: type hints e return types em todos os metodos
- [ ] Testes cobrindo comportamento do agente
- [ ] `vendor/bin/pint --dirty --format agent` executado
- [ ] Arquivos criados via `php artisan make:*` — nunca manualmente
