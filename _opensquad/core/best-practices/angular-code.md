---
id: angular-code
name: Angular Code Best Practices
category: engineering
---

# Angular Code Best Practices

## Regras absolutas

1. SEMPRE `ng generate` para criar artefatos — nunca criar arquivos Angular manualmente
2. NUNCA alterar layout store ou auth store do Rizz sem task explicita
3. NUNCA instalar nova lib de UI sem validar que o Rizz nao cobre o caso
4. NUNCA quebrar o shell vertical (topbar/sidebar/footer)

---

## Stack confirmada no Fluency AI

- Angular `19.2.x`
- Angular CLI/Builder `19.2.x`
- TypeScript `^5.8.3`
- NgRx `19.2.x`
- ng-bootstrap `18.x`
- Bootstrap `5.3`
- zone.js `~0.15.0`

---

## Arquitetura

### Componentes standalone (padrao)

```typescript
// BOM: standalone obrigatorio
@Component({
  selector: 'app-lesson-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lesson-card.component.html',
})
export class LessonCardComponent {
  @Input() lesson!: Lesson;
}
```

### Lazy loading por feature

```typescript
// app.routes.ts — lazy loading obrigatorio para features
{
  path: 'lessons',
  loadChildren: () =>
    import('./views/lessons/lessons.routes').then(m => m.LESSONS_ROUTES),
}
```

### Estado por feature (NgRx)

```typescript
// Criar estado isolado para a feature — nunca no store global
// src/app/views/lessons/store/lesson.store.ts

export const lessonFeature = createFeature({
  name: 'lessons',
  reducer: createReducer(
    initialState,
    on(LessonActions.loadSuccess, (state, { lessons }) => ({
      ...state,
      lessons,
      loading: false,
    }))
  ),
});
```

---

## Geradores obrigatorios

```bash
# Componente standalone em feature
ng generate component views/lessons/lesson-card --standalone

# Service de feature
ng generate service views/lessons/lesson

# Interface/model
ng generate interface views/lessons/models/lesson

# Guard
ng generate guard core/guards/auth

# Interceptor
ng generate interceptor core/interceptors/auth
```

---

## Estrutura de implementacao

```
src/app/
├── views/
│   └── lessons/              ← feature nova aqui
│       ├── lesson-list/
│       ├── lesson-card/
│       ├── models/
│       │   └── lesson.ts
│       ├── services/
│       │   └── lesson.service.ts
│       ├── store/
│       │   └── lesson.store.ts
│       └── lessons.routes.ts
├── shared/                   ← componentes reutilizaveis entre features
├── core/                     ← guards, interceptors, config global
└── store/                    ← NgRx global (NAO TOCAR sem task explicita)
    ├── layout/
    └── authentication/
```

---

## Design system

```scss
// _variables.scss — tokens do Fluency
$primary:   #6C63FF;
$secondary: #1EC8A0;

// Font oficial
$font-family-base: 'Be Vietnam Pro', sans-serif;

// Sempre usar variaveis do tema — nunca hardcode de cor
.lesson-badge {
  background-color: var(--bs-primary);  // use Bootstrap CSS vars
  color: #fff;
}
```

---

## Validacao obrigatoria

```bash
# Build de producao — deve passar sem erros
ng build --configuration production

# Testes da feature
ng test --watch=false --include="**/lessons/**/*.spec.ts"

# Cobertura (opcional mas recomendado)
ng test --watch=false --code-coverage
```

---

## Checklist por entrega

- [ ] Todos os artefatos criados via `ng generate`
- [ ] Feature isolada em `src/app/views/<nome>/`
- [ ] Nenhuma alteracao em layout/auth store do Rizz
- [ ] Build de producao sem erros
- [ ] Testes do escopo passando
- [ ] Sem nova dependencia de UI desnecessaria
