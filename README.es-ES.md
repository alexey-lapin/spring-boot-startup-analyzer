

<p align="center">
    <a href="https://alexey-lapin.github.io/spring-boot-startup-analyzer/">
        <img src="public/logo.svg" width="200" alt="Logotipo de Spring Boot Startup Analyzer">
    </a>
</p>
<h3 align="center">spring-boot-startup-analyzer</h3>

<p align="center">
    <a href="https://github.com/alexey-lapin/spring-boot-startup-analyzer/releases"><img src="https://img.shields.io/github/v/release/alexey-lapin/spring-boot-startup-analyzer?style=flat-square" alt="Lanzamiento"></a>
    <a href="https://github.com/alexey-lapin/spring-boot-startup-analyzer/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="Licencia"></a>
    <a href="https://github.com/alexey-lapin/spring-boot-startup-analyzer/actions"><img src="https://img.shields.io/github/actions/workflow/status/alexey-lapin/spring-boot-startup-analyzer/main.yml?style=flat-square" alt="Estado de compilación"></a>
</p>

Analiza los datos de `/actuator/startup` de Spring Boot Actuator directamente en tu navegador. Toda la información se procesa localmente en tu navegador, sin subir datos a ningún servidor, ofreciendo al mismo tiempo visualizaciones detalladas e información accionable.

➡️ **Pruébalo ahora:** https://alexey-lapin.github.io/spring-boot-startup-analyzer/

## Características

- **Vista de resumen** con duración total, fases críticas, cuellos de botella en beans y conclusiones clave de un vistazo.
- **Visualizaciones en árbol y tabla** para explorar fases de inicio anidadas o escanear pasos rápidamente.
- **Carga de datos flexible:** pega JSON, carga archivos, llama a un endpoint de actuator en vivo o carga el ejemplo incluido.
- **Temas claro y oscuro** con una interfaz moderna y responsiva.
- **Análisis sin conexión** en el navegador, sin necesidad de componentes de backend ni recopilación de datos.

## Inicio rápido

1. Abre la [aplicación web](https://alexey-lapin.github.io/spring-boot-startup-analyzer/).
2. Elige cómo proporcionar los datos de inicio:
    - **Endpoint:** obtén los datos directamente desde `/actuator/startup` (configura CORS si accedes a un servidor remoto).
    - **Archivo:** carga una respuesta JSON guardada.
    - **Pegar:** pega el JSON directamente en el editor de texto.
    - **Ejemplo:** haz clic en _Cargar datos de ejemplo_ para explorar al instante.
3. Cambia entre las pestañas Resumen, Árbol o Tabla para explorar la traza.

> ℹ️ ¿Necesitas CORS para URL remotas? Consulta la pestaña de Uso dentro de la aplicación para ver fragmentos de configuración de Spring.

## Desarrollo local

```bash
npm install
npm run dev
npm run test:unit
npm run build
```

Requisitos previos: Node 20+ (o 22 LTS) y npm.

## Imagen de Docker

Las imágenes se publican en el Registro de Contenedores de GitHub (GHCR):

```bash
docker run -d --name sbsa -p 8080:80 ghcr.io/alexey-lapin/spring-boot-startup-analyzer:latest
```

Para ejecutarlo detrás de un proxy inverso con una ruta base personalizada:

```bash
docker run -d --name sbsa -p 8080:80 \
  -e UI_PUBLIC_PATH=/spring-boot-startup-analyzer \
  ghcr.io/alexey-lapin/spring-boot-startup-analyzer:latest
```

## Para mantenedores

**Despliegue y Lanzamiento:**
- Los commits con etiqueta activan GitHub Actions para compilar, verificar tipos y desplegar en GitHub Pages.
- Las imágenes de Docker de arquitectura múltiple se publican en `ghcr.io/alexey-lapin/spring-boot-startup-analyzer`.
- Los lanzamientos se crean automáticamente con notas generadas.
