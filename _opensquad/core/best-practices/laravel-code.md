---
id: laravel-code
name: Laravel Code Best Practices
category: engineering
---

# Laravel Code Best Practices

## Regras absolutas

1. NUNCA usar Prism — sempre `laravel/ai ^0.4.3`
2. NUNCA criar arquivos `.php` manualmente — sempre `php artisan make:*`
3. SEMPRE rodar `vendor/bin/pint --dirty --format agent` apos editar PHP
4. SEMPRE rodar `php artisan test` antes de finalizar qualquer step

---

## Linguagem: PHP 8.4

```php
// Constructor property promotion — obrigatorio quando reduz boilerplate
class LessonService
{
    public function __construct(
        private readonly LessonRepository $lessons,
        private readonly EnglishTeacherAgent $agent,
        private readonly int $maxAttempts = 3,
    ) {}
}

// Return types em todos os metodos publicos e protected
public function findByStudent(int $studentId): Collection
{
    return $this->lessons->where('student_id', $studentId)->get();
}

// Named arguments para clareza
$result = $this->agent->respond(
    message: $request->input('message'),
    context: $conversation->context,
);

// Match expression em vez de switch
$phase = match($progress) {
    $progress < 30  => 'acquire',
    $progress < 80  => 'practice',
    default         => 'adjust',
};
```

---

## Arquitetura

### Controllers finos

```php
// BOM: controller so delega
class LessonController extends Controller
{
    public function store(StoreLessonRequest $request): LessonResource
    {
        $lesson = $this->lessonService->create($request->validated());
        return new LessonResource($lesson);
    }
}

// RUIM: logica de negocio no controller
class LessonController extends Controller
{
    public function store(Request $request)
    {
        // validacao manual, queries diretas — nunca faca isso
        $lesson = Lesson::create([...]);
    }
}
```

### Geradores obrigatorios

```bash
php artisan make:controller Api/LessonController --api
php artisan make:model Lesson -m           # model + migration
php artisan make:request StoreLessonRequest
php artisan make:resource LessonResource
php artisan make:service LessonService     # se disponivel
php artisan make:agent EnglishTeacherAgent # via laravel/ai
php artisan make:test LessonControllerTest
```

---

## Integracao com laravel/ai

```php
// Agente correto — implementa contratos do laravel/ai
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Promptable;

class EnglishTeacherAgent implements Agent, Conversational, HasTools
{
    use Promptable;

    public function instructions(): string
    {
        return 'You are an English teacher following the APA method.';
    }

    public function messages(): iterable { return []; }
    public function tools(): iterable { return []; }
}
```

---

## Testes

```bash
# Rodar suite especifica
php artisan test --filter LessonControllerTest

# Rodar com cobertura (gate: >= 80%)
php artisan test --coverage --min=80

# Pest (se configurado)
./vendor/bin/pest --coverage --min=80
```

Estrutura de teste esperada:
```php
it('creates a lesson for authenticated student', function () {
    $student = User::factory()->create();
    $data = ['title' => 'Present Simple', 'level' => 'beginner'];

    $response = $this->actingAs($student)
        ->postJson('/api/v1/lessons', $data);

    $response->assertCreated();
    $this->assertDatabaseHas('lessons', $data);
});
```

---

## Checklist por entrega

- [ ] `php artisan make:*` usado para todos os artefatos
- [ ] Nenhum uso de Prism
- [ ] PHP 8.4: constructor promotion, type hints, return types
- [ ] `vendor/bin/pint --dirty --format agent` sem erros
- [ ] `php artisan test --coverage` >= 80%
- [ ] Controllers delegando para Services/Actions
