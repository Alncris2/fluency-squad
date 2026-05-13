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

## Core Architecture

O backend usa uma camada `app/Core/` com abstracts para Repository, Service, Controller e DTO.
Todo codigo novo DEVE seguir esse padrao.

### Estrutura esperada por entidade

```
app/Core/{Entity}/
├── Repositories/{Entity}Repository.php   extends AbstractRepository
├── Services/{Entity}Service.php          extends AbstractService
├── DTOs/{Entity}DTO.php                  extends AbstractDTO
└── Validators/Data{Entity}Validator.php  (opcional)
```

### Repository correto

```php
namespace App\Core\Lesson\Repositories;

use App\Core\Architecture\Abstracts\AbstractRepository;
use App\Models\Lesson;

class LessonRepository extends AbstractRepository
{
    public function __construct(Lesson $model)
    {
        $this->model = $model;
    }

    // metodos especificos da entidade aqui
    public function findByStudent(int $studentId): Collection
    {
        return $this->model->where('student_id', $studentId)->get();
    }
}
```

### Service correto

```php
namespace App\Core\Lesson\Services;

use App\Core\Architecture\Abstracts\AbstractService;
use App\Core\Lesson\Repositories\LessonRepository;

class LessonService extends AbstractService
{
    public function __construct(
        private readonly LessonRepository $repository,
    ) {}

    // hooks do ciclo de vida — sobrescrever conforme necessario
    public function beforeSave(array $params): array
    {
        // transformar payload antes de persistir
        return $params;
    }

    public function afterSave($entity, array $params)
    {
        // side-effects apos criar (ex: disparar evento, atualizar cache)
        return $entity;
    }
}
```

### DTO correto

```php
namespace App\Core\Lesson\DTOs;

use App\Core\Architecture\Abstracts\AbstractDTO;

class LessonDTO extends AbstractDTO
{
    public ?string $title = null;
    public ?string $level = null;
    public ?int $studentId = null;

    public function rules(): array
    {
        return [
            'title'      => ['required', 'string', 'max:255'],
            'level'      => ['required', 'in:beginner,intermediate,advanced'],
            'student_id' => ['required', 'integer', 'exists:students,id'],
        ];
    }

    public function updateRules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'level' => ['sometimes', 'in:beginner,intermediate,advanced'],
        ];
    }
}
```

### AbstractController

Para controllers CRUD, estender `AbstractController` — atencao ao namespace correto:

```php
use App\Http\Controllers\Common\AbstractController; // namespace declarado na classe
// arquivo fisico: app/Core/Architecture/Abstracts/AbstractController.php

class LessonController extends AbstractController
{
    protected $service; // injetado no constructor

    public function __construct(LessonService $service)
    {
        $this->service = $service;
    }
}
```

### Anti-patterns (NUNCA fazer)

```php
// RUIM: query direta no service
class LessonService
{
    public function findAll(): Collection
    {
        return Lesson::all(); // ERRADO — use repository
    }
}

// RUIM: query direta no controller
class LessonController extends Controller
{
    public function index(): JsonResponse
    {
        $lessons = Lesson::where('student_id', auth()->id())->get(); // ERRADO
        return response()->json($lessons);
    }
}

// RUIM: criar model diretamente
Lesson::create($request->all()); // ERRADO — use $this->service->save()
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
