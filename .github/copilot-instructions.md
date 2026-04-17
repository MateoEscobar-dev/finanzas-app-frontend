<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## 🚨 REGLA #0: Zero Errors Policy - OBLIGATORIO

**ANTES de finalizar CUALQUIER desarrollo:**

```bash
npm run type-check  # ✅ DEBE mostrar "Found 0 errors"
npm run lint        # ✅ DEBE completarse sin errores
```

**NO commitear código con errores TypeScript o ESLint bajo ninguna circunstancia.**

---

## 📋 Instrucciones de Contexto

- 🧠 Lea primero `/memory-bank/memory-bank-instructions.md` .
- 🗂 Cargue todos los archivos `/memory-bank/*.md` antes de cada tarea.
- 📂 También cargue archivos de la carpeta de funciones activas (por ejemplo, `/memory-bank/#feature/` ).
- 🚦 Siga el flujo de trabajo de Kiro-Lite: PRD → Diseño → Tareas → Código.
- 🔒 Siga las reglas en `copilot-rules.md` .
- 🔴 **CUMPLIR SIEMPRE**: `/memory-bank/ARQUITECTURA-CRITERIOS-CRITICOS.md` (obligatorio).
- 📝 En "/update memory bank", actualice activeContext.md y progress.md.
- ⚠️ **Ver reglas de calidad:** `QUALITY-RULES.md` (raíz del proyecto).

## 📋 Instrucciones para generar un commit

Convención para mensajes de commit (en español) Los mensajes de commit deben ser claros y concisos, describiendo con precisión el propósito del cambio realizado.
Formato obligatorio: Primera línea: Debe comenzar con el prefijo GICL-<número_issue>: seguido de una descripción breve y resumida de los cambios.
Máximo 50 caracteres. Escribe en español y en modo imperativo (ej. "Corrige validación de usuario"). Segunda línea: Debe estar en blanco (separador entre título y cuerpo).
Cuerpo del mensaje: Describe los cambios de forma más detallada.
Máximo 72 caracteres por línea. Explica el porqué del cambio, no solo el qué. Si aplica, incluye contexto técnico o referencias a decisiones tomadas.
Y solo considerar los archivos seleccionados en el commit, no todos los archivos modificados del proyecto.
