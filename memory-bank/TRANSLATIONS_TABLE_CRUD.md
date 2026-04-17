# 🌍 Traducciones - Componente Table CRUD

## Descripción
Se han agregado traducciones completas al componente `table-crud.component` en 5 idiomas:
- 🇬🇧 English (en)
- 🇪🇸 Español (es)
- 🇬🇷 Griego (gr)
- 🇮🇹 Italiano (it)
- 🇷🇺 Ruso (ru)

---

## 📁 Archivos de Traducción

### Ubicación
```
src/assets/i18n/actions/
  ├── en.json
  ├── es.json
  ├── gr.json
  ├── it.json
  └── ru.json
```

---

## 📋 Claves de Traducción Agregadas

### En `actions/[idioma].json`

| Clave | Descripción | EN | ES |
|-------|-------------|----|----|
| `actions.actions` | Título de columna de acciones | Actions | Acciones |
| `actions.create` | Botón crear | Create | Crear |
| `actions.edit` | Botón editar | Edit | Editar |
| `actions.delete` | Botón eliminar | Delete | Eliminar |
| `actions.view` | Botón ver | View | Ver |
| `actions.history` | Botón historial | History | Historial |
| `actions.save` | Botón guardar | Save | Guardar |
| `actions.cancel` | Botón cancelar | Cancel | Cancelar |
| `actions.confirm_delete` | Mensaje confirmación | Are you sure...? | ¿Estás seguro...? |
| `actions.delete_success` | Mensaje éxito | Record deleted successfully | Registro eliminado correctamente |
| `actions.delete_error` | Mensaje error | Error deleting record | Error al eliminar el registro |
| `actions.no_data` | Sin datos | No data to display | No hay datos para mostrar |
| `actions.per_page` | Selector paginación | Per page | Por página |
| `actions.showing` | Texto paginación | Showing | Mostrando |
| `actions.of` | Texto paginación | of | de |
| `actions.entries` | Texto paginación | entries | registros |

---

## 🎯 Uso en el Template

### Antes
```html
<button class="btn btn-sm btn-success" (click)="onCreateClick()">
  <i class="mdi mdi-plus"></i> Crear
</button>
```

### Después
```html
<button class="btn btn-sm btn-success" (click)="onCreateClick()">
  <i class="mdi mdi-plus"></i> {{ "actions.create" | translate }}
</button>
```

---

## 📍 Elementos Traducidos en el Componente

### 1. Barra de Búsqueda
```html
<!-- Antes -->
<label class="me-2">Search:</label>
<input [placeholder]="'search_description' | translate" />

<!-- Después (mantenido igual, ya estaba traducido) -->
```

### 2. Selector "Por Página"
```html
<!-- Antes -->
<label>Por página:</label>

<!-- Después -->
<label>{{ "actions.per_page" | translate }}:</label>
```

### 3. Botón Crear
```html
<!-- Antes -->
<i class="mdi mdi-plus"></i> Crear

<!-- Después -->
<i class="mdi mdi-plus"></i> {{ "actions.create" | translate }}
```

### 4. Encabezado de Acciones
```html
<!-- Antes -->
<th>Acciones</th>

<!-- Después -->
<th>{{ "actions.actions" | translate }}</th>
```

### 5. Mensaje Sin Datos
```html
<!-- Antes -->
<p class="mt-2">No hay datos para mostrar</p>

<!-- Después -->
<p class="mt-2">{{ "actions.no_data" | translate }}</p>
```

### 6. Botones de Acción (title atributo)
```html
<!-- Antes -->
<button title="Ver">
<button title="Editar">
<button title="Historial">
<button title="Eliminar">

<!-- Después -->
<button [title]="'actions.view' | translate">
<button [title]="'actions.edit' | translate">
<button [title]="'actions.history' | translate">
<button [title]="'actions.delete' | translate">
```

### 7. Información de Paginación
```html
<!-- Antes -->
<div class="text-muted small">
  Mostrando {{ (activePage - 1) * pageSize + 1 }} a
  {{ activePage * pageSize > (config.data?.length || 0) ? (config.data?.length || 0) : activePage * pageSize }} de
  {{ config.data?.length }}
</div>

<!-- Después -->
<div class="text-muted small">
  {{ "actions.showing" | translate }} {{ (activePage - 1) * pageSize + 1 }}
  {{ "actions.of" | translate }}
  {{ activePage * pageSize > (config.data?.length || 0) ? (config.data?.length || 0) : activePage * pageSize }} {{ "actions.of" | translate }}
  {{ config.data?.length }} {{ "actions.entries" | translate }}
</div>
```

---

## ✅ Verificación

- ✅ Todas las traducciones agregadas en 5 idiomas
- ✅ Componente actualizado para usar las traducciones
- ✅ Compilación sin errores
- ✅ TranslateModule importado en el componente

---

## 🔄 Cómo Usar

1. **Cambiar idioma en la aplicación** (ya debe estar configurado)
2. **El componente automáticamente usará las traducciones** del idioma seleccionado
3. **Si necesitas agregar más traducciones**, edita los archivos JSON correspondientes

---

## 📝 Ejemplo: Agregar Nueva Traducción

Para agregar una nueva traducción (ej: "Cancelar descarga"):

1. Edita `src/assets/i18n/actions/en.json`:
```json
{
  "actions": {
    "cancel_download": "Cancel Download",
    // ... resto
  }
}
```

2. Edita `src/assets/i18n/actions/es.json`:
```json
{
  "actions": {
    "cancel_download": "Cancelar Descarga",
    // ... resto
  }
}
```

3. Usa en template:
```html
<button>{{ "actions.cancel_download" | translate }}</button>
```

---

## 🌐 Idiomas Soportados

| Código | Idioma | Estado |
|--------|--------|--------|
| `en` | English | ✅ Traducido |
| `es` | Español | ✅ Traducido |
| `gr` | Griego (Ελληνικά) | ✅ Traducido |
| `it` | Italiano | ✅ Traducido |
| `ru` | Ruso (Русский) | ✅ Traducido |

---

## 📌 Notas

- Las traducciones están en la carpeta `actions/` siguiendo la estructura existente
- El pipe `| translate` se usa en el template para cargar las traducciones dinámicamente
- El módulo `TranslateModule` ya está importado en el componente tabla
- Las traducciones se cargan automáticamente según el idioma seleccionado en la app

