# Docs Report — #17 [AGENT] Tool: save_memory
# Run: 2026-04-19-202001

## O que foi entregue

### Tool save_memory (SaveLearningNoteTool)

Ferramenta do `EnglishTeacherAgent` para persistir observações sobre o aluno:

```
Parâmetros:
  type:       mistake | achievement | vocabulary | preference | breakthrough
  content:    string (truncado em 200 chars)
  importance: integer 1-5 (default: 2)
  apa_phase:  acquire | practice | adjust (opcional)

Retorno:
  { "saved": true, "type": "<type>" }
```

### Garantia de contexto (MemoryService)

Memórias com `importance >= 4` são **sempre** incluídas no contexto do agente,
independente do limite padrão de 15 itens. As demais memórias preenchem os
slots restantes em ordem de importância + recência.

## Próximo passo

Issues abertas no sprint-2:
- **#18** [AGENT] Tool: advance_lesson
- **#19** [AGENT] Tool: flag_weak_area
- **#21** [AGENT] Tool: send_activity
- **#22** [AGENT] Tool: add_to_dictionary
- **#23** [AGENT] Resumo automático de sessão
