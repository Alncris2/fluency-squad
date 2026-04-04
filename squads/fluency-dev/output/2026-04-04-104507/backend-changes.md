# Backend Changes — Issue #15

## EnglishTeacherAgent

**File**: `app/Ai/Agents/EnglishTeacherAgent.php`

- Implements `Agent`, `Conversational`, `HasTools` via `laravel/ai ^0.4.3`
- Uses `Promptable` trait
- APA system prompt (full text mode: ADQUIRIR/PRATICAR/AJUSTAR; voice mode: 1-2 sentences)
- Redis conversation history: `fluency:chat:{student_id}:{session_id}`, TTL 7 days, max 20 messages
- `voiceChat()`, `getVoiceGreeting()`, `appendToHistory()` methods

## Tools

**File**: `app/Ai/Tools/GetStudentProgressTool.php`

- Returns student name, level, streak, plan, recent mistakes, achievements from `memories` table

**File**: `app/Ai/Tools/SaveLearningNoteTool.php`

- Inserts to `memories` table: type (enum), content (max 200), apa_phase, importance (1–5)

## HTTP Layer

**File**: `app/Http/Controllers/Api/ChatController.php`

- `POST /api/v1/students/{student}/chat` → JSON response
- `POST /api/v1/students/{student}/chat/stream` → SSE `text/event-stream`
- `POST /api/v1/students/{student}/chat/voice` → voice mode JSON
- `GET /api/v1/students/{student}/chat/voice/greeting` → greeting JSON

**File**: `app/Http/Requests/ChatMessageRequest.php`

- Validates `message` (required, max:2000), `session_id` (required, max:64)

**File**: `routes/api.php` — Added v1/students/{student}/chat routes

**File**: `bootstrap/app.php` — Removed `statefulApi()` (Sanctum not installed yet)

**File**: `phpunit.xml` — Added `REDIS_HOST=127.0.0.1` for test env

## Tests

**File**: `tests/Feature/EnglishTeacherAgentTest.php`

- 12 tests / 34 assertions — all passing
- Redis mocked in-memory via Mockery closures
- Agent faked via `EnglishTeacherAgent::fake()`
