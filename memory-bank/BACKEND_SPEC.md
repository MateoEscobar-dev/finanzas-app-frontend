# Especificación Backend - Sistema de Acciones de Servidores

## Resumen Ejecutivo
Este documento describe la especificación técnica para implementar 6 nuevas acciones en el sistema de gestión de servidores con soporte para WebSocket en tiempo real, logging de operaciones y actualización de campos del modelo de datos.

---

## 1. Modelo de Datos Extendido

### Tabla: `servers`

```sql
ALTER TABLE servers ADD COLUMN IF NOT EXISTS domain VARCHAR(255) NULLABLE AFTER ip;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS email VARCHAR(255) NULLABLE AFTER domain;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS service_status ENUM('active', 'inactive', 'paused') DEFAULT 'inactive' AFTER email;
```

**Nuevos Campos:**
- `domain` (VARCHAR 255, nullable): Dominio asociado al servidor
- `email` (VARCHAR 255, nullable): Correo de contacto del servidor
- `service_status` (ENUM: 'active', 'inactive', 'paused'): Estado del servicio. **Solo se modifica mediante acciones de activate/deactivate, nunca en create/update**

---

## 2. Endpoints HTTP

### 2.1 Validar Estado del Servidor
**POST** `/api/servers/{id}/validate-status`

**Descripción:** Valida el estado actual del servidor (conectividad, servicios activos, etc.)

**Request Body:**
```json
{
  "operationId": "op_1705595400000_a1b2c3"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Estado del servidor validado correctamente",
  "operationId": "op_1705595400000_a1b2c3",
  "data": {
    "id": 1,
    "name": "Server01",
    "status": "online",
    "last_check": "2026-01-18 10:30:00",
    "services_count": 5,
    "disk_usage": "45%",
    "memory_usage": "62%"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "El servidor no está accesible",
  "operationId": "op_1705595400000_a1b2c3"
}
```

---

### 2.2 Instalar Servidor
**POST** `/api/servers/{id}/install`

**Descripción:** Instala/inicializa el servidor con configuración inicial

**Request Body:**
```json
{
  "domain": "nuevo.ejemplo.com",
  "email": "admin@ejemplo.com",
  "operationId": "op_1705595400000_a1b2c3"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Instalación iniciada correctamente",
  "operationId": "op_1705595400000_a1b2c3",
  "data": {
    "id": 1,
    "name": "Server01",
    "domain": "nuevo.ejemplo.com",
    "email": "admin@ejemplo.com",
    "service_status": "active",
    "installed_at": "2026-01-18 10:35:00"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Dominio ya está registrado",
  "operationId": "op_1705595400000_a1b2c3"
}
```

---

### 2.3 Agregar Programa al Servidor
**POST** `/api/servers/{id}/add-program`

**Descripción:** Agrega/instala un programa disponible en el servidor

**Request Body:**
```json
{
  "programId": 5,
  "operationId": "op_1705595400000_a1b2c3"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Programa agregado correctamente",
  "operationId": "op_1705595400000_a1b2c3",
  "data": {
    "id": 1,
    "name": "Server01",
    "program_id": 5,
    "program_name": "Node.js Runtime",
    "installed_at": "2026-01-18 10:40:00",
    "status": "installed"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "El programa ya está instalado en el servidor",
  "operationId": "op_1705595400000_a1b2c3"
}
```

---

### 2.4 Cambiar Dominio del Servidor
**POST** `/api/servers/{id}/change-domain`

**Descripción:** Cambia el dominio asociado al servidor

**Request Body:**
```json
{
  "newDomain": "nuevo-dominio.com",
  "operationId": "op_1705595400000_a1b2c3"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Dominio actualizado correctamente",
  "operationId": "op_1705595400000_a1b2c3",
  "data": {
    "id": 1,
    "name": "Server01",
    "domain": "nuevo-dominio.com",
    "updated_at": "2026-01-18 10:45:00"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "El dominio proporcionado es inválido",
  "operationId": "op_1705595400000_a1b2c3"
}
```

---

### 2.5 Desactivar Servicio
**POST** `/api/servers/{id}/deactivate-service`

**Descripción:** Pausa/detiene los servicios del servidor

**Request Body:**
```json
{
  "operationId": "op_1705595400000_a1b2c3"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Servicio desactivado correctamente",
  "operationId": "op_1705595400000_a1b2c3",
  "data": {
    "id": 1,
    "name": "Server01",
    "service_status": "paused",
    "deactivated_at": "2026-01-18 10:50:00"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "El servicio ya está desactivado",
  "operationId": "op_1705595400000_a1b2c3"
}
```

---

### 2.6 Activar Servicio
**POST** `/api/servers/{id}/activate-service`

**Descripción:** Reanuda/inicia los servicios del servidor

**Request Body:**
```json
{
  "operationId": "op_1705595400000_a1b2c3"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Servicio activado correctamente",
  "operationId": "op_1705595400000_a1b2c3",
  "data": {
    "id": 1,
    "name": "Server01",
    "service_status": "active",
    "activated_at": "2026-01-18 10:55:00"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "El servicio ya está activo",
  "operationId": "op_1705595400000_a1b2c3"
}
```

---

### 2.7 Obtener Programas Disponibles
**GET** `/api/servers/available-programs`

**Descripción:** Retorna la lista de programas/aplicaciones que pueden ser instalados en servidores

**Query Parameters:**
- `page` (opcional): Número de página, default 1
- `limit` (opcional): Registros por página, default 20

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "programs": [
      {
        "id": 1,
        "name": "PHP Runtime",
        "version": "8.2.x",
        "description": "Lenguaje de programación PHP versión 8.2"
      },
      {
        "id": 2,
        "name": "MySQL Database",
        "version": "8.0.x",
        "description": "Sistema de gestión de bases de datos MySQL"
      },
      {
        "id": 3,
        "name": "Apache Web Server",
        "version": "2.4.x",
        "description": "Servidor web Apache HTTP"
      },
      {
        "id": 4,
        "name": "Node.js Runtime",
        "version": "20.x",
        "description": "Entorno de ejecución JavaScript Node.js"
      },
      {
        "id": 5,
        "name": "Docker Container",
        "version": "24.x",
        "description": "Plataforma de containerización Docker"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_items": 5,
      "per_page": 20
    }
  }
}
```

---

## 3. WebSocket - Eventos en Tiempo Real

### 3.1 Conexión WebSocket
**URL:** `ws://paneladmin.local:6001`

**Descripción:** Conexión WebSocket para recibir actualizaciones en tiempo real de las operaciones

---

### 3.2 Suscripción a Operación
**Cliente → Servidor:**
```json
{
  "action": "subscribe",
  "operationId": "op_1705595400000_a1b2c3"
}
```

---

### 3.3 Eventos de Operación (Servidor → Cliente)

#### Evento: `progress`
Enviado periódicamente durante la ejecución de la operación

```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Conectando al servidor...",
  "severity": "info",
  "progress": 10,
  "timestamp": "2026-01-18T10:30:15.000Z"
}
```

**Propiedades:**
- `type`: Siempre "progress"
- `operationId`: ID único de la operación (coincide con el enviado desde cliente)
- `message`: Mensaje descriptivo de la acción en progreso
- `severity`: "info", "warning", "error", "success"
- `progress`: Porcentaje de progreso 0-100
- `timestamp`: ISO 8601 timestamp del evento

**Ejemplos de mensajes por acción:**

**Validar Estado:**
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Verificando conectividad del servidor...",
  "severity": "info",
  "progress": 20
}
```
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Obteniendo información del sistema...",
  "severity": "info",
  "progress": 50
}
```

**Instalar Servidor:**
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Actualizando índices de paquetes...",
  "severity": "info",
  "progress": 15
}
```
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Instalando dependencias base...",
  "severity": "info",
  "progress": 40
}
```
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Configurando dominio y certificados SSL...",
  "severity": "info",
  "progress": 70
}
```

**Agregar Programa:**
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Descargando paquete Node.js...",
  "severity": "info",
  "progress": 25
}
```
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Extrayendo archivos...",
  "severity": "info",
  "progress": 50
}
```

**Cambiar Dominio:**
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Validando nuevo dominio...",
  "severity": "info",
  "progress": 20
}
```
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Actualizando configuración del servidor...",
  "severity": "info",
  "progress": 60
}
```

**Desactivar Servicio:**
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Deteniendo servicios activos...",
  "severity": "warning",
  "progress": 30
}
```
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Guardando estado del servicio...",
  "severity": "info",
  "progress": 70
}
```

**Activar Servicio:**
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Iniciando servicios...",
  "severity": "info",
  "progress": 40
}
```
```json
{
  "type": "progress",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Verificando servicios en ejecución...",
  "severity": "info",
  "progress": 80
}
```

---

#### Evento: `complete`
Enviado cuando la operación finaliza exitosamente

```json
{
  "type": "complete",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Operación completada correctamente",
  "severity": "success",
  "progress": 100,
  "timestamp": "2026-01-18T10:32:45.000Z"
}
```

---

#### Evento: `error`
Enviado cuando ocurre un error durante la operación

```json
{
  "type": "error",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Error: No se puede conectar al servidor. Verifique la conectividad de red.",
  "severity": "error",
  "progress": 30,
  "errorCode": "CONNECTION_TIMEOUT",
  "timestamp": "2026-01-18T10:31:20.000Z"
}
```

**Códigos de error comunes:**
- `CONNECTION_TIMEOUT`: No se pudo conectar al servidor
- `INVALID_CREDENTIALS`: Credenciales inválidas
- `DISK_SPACE_ERROR`: Espacio en disco insuficiente
- `PERMISSION_DENIED`: Permisos insuficientes
- `DUPLICATE_DOMAIN`: Dominio ya existe
- `INVALID_DOMAIN`: Formato de dominio inválido
- `SERVICE_ERROR`: Error del servicio
- `UNKNOWN_ERROR`: Error desconocido

---

#### Evento: `info`
Información adicional (logs, detalles)

```json
{
  "type": "info",
  "operationId": "op_1705595400000_a1b2c3",
  "message": "Sistema operativo: Ubuntu 22.04 LTS",
  "severity": "info",
  "timestamp": "2026-01-18T10:30:30.000Z"
}
```

---

### 3.4 Flujo de Comunicación WebSocket Completo

```
CLIENTE                              SERVIDOR
   |                                    |
   |--- subscribe operation id -------> |
   |                                    |
   |                              [Inicia operación]
   |                                    |
   | <---- progress 20% + message ----  |
   |                                    |
   | <---- progress 40% + message ----  |
   |                                    |
   | <---- progress 60% + message ----  |
   |                                    |
   | <---- progress 80% + message ----  |
   |                                    |
   | <---- complete 100% + success ---- |
   |                                    |
   |         (Desconexión automática)   |
```

---

## 4. Tabla de Acciones y Estados

| Acción | HTTP Método | URL | Tiempo Estimado | Estado Inicial | Estado Final |
|--------|------------|-----|-----------------|----------------|--------------|
| Validar Estado | POST | `/api/servers/{id}/validate-status` | 5-10s | N/A | N/A |
| Instalar | POST | `/api/servers/{id}/install` | 30-60s | inactive | active |
| Agregar Programa | POST | `/api/servers/{id}/add-program` | 15-30s | any | any |
| Cambiar Dominio | POST | `/api/servers/{id}/change-domain` | 10-20s | any | any |
| Desactivar Servicio | POST | `/api/servers/{id}/deactivate-service` | 5-10s | active | paused |
| Activar Servicio | POST | `/api/servers/{id}/activate-service` | 5-10s | paused/inactive | active |

---

## 5. Manejo de Errores Global

### Códigos HTTP
- `200 OK`: Operación exitosa
- `400 Bad Request`: Parámetros inválidos
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permisos
- `404 Not Found`: Recurso no encontrado
- `409 Conflict`: Conflicto de estado
- `500 Internal Server Error`: Error del servidor

### Estructura de Error Estándar
```json
{
  "success": false,
  "message": "Descripción del error",
  "operationId": "op_1705595400000_a1b2c3",
  "errors": [
    {
      "field": "domain",
      "message": "El dominio no es válido"
    }
  ]
}
```

---

## 6. Consideraciones de Implementación

### 6.1 Validaciones Backend
- Validar que el servidor existe y el usuario tiene permisos
- Validar formato de dominio (RFC 1123)
- Validar formato de email (RFC 5321)
- Validar que programId existe
- Validar estado actual del servidor antes de cambios de estado
- Verificar conectividad al servidor antes de ejecutar acciones

### 6.2 Transacciones
- Envolver cambios de estado en transacciones
- Registrar auditoría de cada acción en tabla `server_activity_logs`
- Guardar operationId para correlación con logs

### 6.3 WebSocket
- Usar broadcast con operationId como canal
- Mantener conexión viva hasta que operación complete
- Implementar timeout (5 minutos máximo)
- Limpiar suscripciones al desconectar

### 6.4 Seguridad
- Requerir autenticación JWT en todos los endpoints
- Validar permisos del usuario para cada acción
- Registrar intentos fallidos
- Rate limiting: máximo 10 operaciones por usuario por minuto

### 6.5 Tabla de Auditoría
```sql
CREATE TABLE server_activity_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  operation_id VARCHAR(255) NOT NULL,
  server_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  status ENUM('pending', 'in_progress', 'completed', 'failed') DEFAULT 'pending',
  request_data JSON,
  response_data JSON,
  error_message TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (server_id) REFERENCES servers(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_operation_id (operation_id),
  INDEX idx_server_id (server_id),
  INDEX idx_user_id (user_id)
);
```

---

## 7. Testing

### Pruebas Recomendadas

**Unit Tests:**
- Validación de parámetros de entrada
- Estados válidos de transición
- Errores esperados

**Integration Tests:**
- Flujo completo de cada acción
- Eventos WebSocket en orden correcto
- Actualización de datos en BD

**End-to-End Tests:**
- Frontend → Backend → WebSocket
- Manejo de desconexiones
- Timeout de operaciones largas

---

## 8. Ejemplo de Implementación en Laravel

### Controlador Base (Pseudo-código)

```php
namespace App\Http\Controllers;

use App\Models\Server;
use App\Services\WebSocketService;
use Illuminate\Http\Request;

class ServerActionController extends Controller
{
    protected WebSocketService $wsService;
    
    public function validateStatus(Request $request, $id)
    {
        $server = Server::findOrFail($id);
        $operationId = $request->input('operationId');
        
        try {
            $this->wsService->sendProgress($operationId, [
                'message' => 'Conectando al servidor...',
                'progress' => 10
            ]);
            
            // Validación lógica aquí
            
            $this->wsService->sendComplete($operationId);
            
            return response()->json([
                'success' => true,
                'message' => 'Estado del servidor validado',
                'operationId' => $operationId
            ]);
        } catch (\Exception $e) {
            $this->wsService->sendError($operationId, $e->getMessage());
            return response()->json(['success' => false], 400);
        }
    }
}
```

---

## 9. Notas Importantes

1. **operationId**: DEBE ser incluido en TODOS los eventos WebSocket para correlacionar cliente ↔ servidor
2. **Estado de Servicio**: Solo se modifica mediante `activate-service` y `deactivate-service`. Nunca en create/update
3. **Dominio y Email**: Campos editables en formulario, validables en install y change-domain
4. **Timeout**: Establecer timeout de 5 minutos para operaciones largas
5. **Logging**: Registrar TODAS las acciones en tabla de auditoría con user_id
6. **Permisos**: Implementar verificación de permisos antes de ejecutar acciones

---

## 10. Resumen de Cambios Requeridos

- [ ] Agregar columnas a tabla servers (domain, email, service_status)
- [ ] Crear 6 nuevos endpoints HTTP
- [ ] Implementar WebSocketService para broadcast
- [ ] Crear tabla server_activity_logs para auditoría
- [ ] Agregar validaciones de entrada
- [ ] Implementar lógica de cada acción
- [ ] Configurar WebSocket server (Pusher/Laravel WebSockets/Echo)
- [ ] Agregar tests unitarios e integración
- [ ] Documentar API en Swagger/OpenAPI
