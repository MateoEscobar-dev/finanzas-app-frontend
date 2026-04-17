# 🚨 REGLA OBLIGATORIA: ESLint Estricto + TypeCheck

## Regla de Oro

**ANTES de finalizar CUALQUIER tarea o hacer push:**

```bash
npm run lint       # ✅ DEBE completarse con 0 errores
npm run type-check # ✅ DEBE mostrar "Found 0 errors"
```

**NO se permite commitear código con errores ESLint o TypeScript bajo NINGUNA circunstancia.**

---

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run lint` | Ejecuta ESLint estricto en todo el proyecto |
| `npm run lint:fix` | Ejecuta ESLint y corrige automáticamente lo posible |
| `npm run type-check` | Ejecuta TypeScript compiler sin emitir (solo verificación) |

---

## Reglas ESLint Configuradas

### TypeScript Estricto
- No `any` implícito
- No variables sin usar
- No imports sin usar
- Tipado explícito en funciones públicas cuando es necesario

### Angular
- Mejores prácticas de componentes
- Templates tipados

---

## Flujo de Trabajo Obligatorio

1. Desarrollar feature/fix
2. Ejecutar `npm run lint:fix` (auto-corrige lo posible)
3. Corregir manualmente errores restantes
4. Ejecutar `npm run type-check` (verificar tipos)
5. Corregir errores de tipos
6. Verificar ambos en 0 errores
7. Recién entonces: `git add` + `git commit` + `git push`

---

## Para Copilot / AI Assistants

Cuando trabajes en este proyecto:
- SIEMPRE ejecuta `npm run lint` y `npm run type-check` al finalizar cambios
- NUNCA dejes errores sin resolver
- Si un cambio introduce errores, corrígelos antes de reportar como completado
