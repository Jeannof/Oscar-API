# API Aerolínea – Arquitectura modular (Express)

Proyecto de la **Guía 6 – SENA ADSO**. API REST para gestionar **pilotos**, **aviones** y **asignaciones** (piloto ↔ avión) con almacenamiento en archivos JSON y separación estricta en 4 capas, más middlewares de **validación** y **logging**.

## Estructura

```
src/
├── routes/        # Define rutas HTTP y las asocia al controlador (+ middlewares de validación)
├── controllers/   # Lee req, llama al servicio, responde con códigos HTTP (try/catch)
├── services/      # Reglas de negocio y validaciones relacionales (no conoce req/res)
├── models/        # Único acceso a los archivos JSON (fs)
├── middlewares/   # logger, validación de body/id, 404 y manejo global de errores
├── utils/         # AppError (error con código HTTP)
└── app.js         # Punto de entrada: middlewares globales, rutas y servidor
data/              # pilots.json, airplanes.json, assignments.json
```

Flujo: `Cliente → Logger → Routes → Validación → Controllers → Services → Models → JSON`

## Instalación y ejecución

```bash
npm install
npm start          # http://localhost:3000
npm run dev        # recarga automática (Node 18+)
```

## Endpoints

| Recurso | Base | Métodos |
|---|---|---|
| Pilotos | `/api/pilotos` | `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id` |
| Aviones | `/api/aviones` | `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id` |
| Asignaciones | `/api/asignaciones` | `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id` |

### Modelos de datos

**Piloto**
```json
{ "nombre": "Carlos Pérez", "licencia": "ATP-1001", "horasVuelo": 3200, "estado": "activo" }
```
`estado`: `activo` | `inactivo` | `suspendido`

**Avión**
```json
{ "modelo": "Airbus A320", "matricula": "HK-4500", "capacidadMaxima": 180, "fabricante": "Airbus" }
```

**Asignación**
```json
{ "idPiloto": 1, "idAvion": 1, "fechaVuelo": "2026-12-01", "rutaAsignada": "BOG-MDE" }
```
(El `id` / `idAsignacion` lo genera el servidor.)

## Middlewares

### Validación (`src/middlewares/validate.js` + `schemas.js`)
- `validateId()`: el `:id` de la URL debe ser un entero positivo → `400` si no.
- `validateBody(schema)`: campos obligatorios, tipos, rangos, enumeraciones y formato de fecha `YYYY-MM-DD`. Devuelve `400` con la lista de errores y descarta campos no declarados.

Ejemplo de respuesta inválida:
```json
{ "error": "Datos inválidos", "detalles": ["El campo 'nombre' debe tener al menos 3 caracteres"] }
```

### Logging (`src/middlewares/logger.js`)
Registra cada petición (fecha, método, URL, status, duración y body en POST/PUT) en consola y en `logs/access.log`:
```
[2026-11-17T11:54:51.051Z] POST /api/asignaciones -> 201 (2.3 ms) body={...}
```

## Reglas de negocio (capa Services)
- Licencia de piloto y matrícula de avión únicas (`409`).
- Una asignación solo se crea/actualiza si el **piloto y el avión existen** (`404` si no).
- Un piloto no puede tener dos asignaciones el mismo día (`409`).
- No se puede eliminar un piloto o avión que tenga asignaciones (`409`).

## Ejemplo con curl

```bash
curl -X POST http://localhost:3000/api/pilotos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Carlos Pérez","licencia":"ATP-1001","horasVuelo":3200,"estado":"activo"}'
```
"# Api_Modular_Aerolinea" 
"# Oscar-API" 
