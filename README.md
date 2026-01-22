<p align="center">
    <a href="https://alexey-lapin.github.io/spring-boot-startup-analyzer/">
        <img src="public/logo.svg" width="200" alt="Spring Boot Startup Analyzer Logo">
    </a>
</p>
<h3 align="center">spring-boot-startup-analyzer</h3>

<p align="center">
    <a href="https://github.com/alexey-lapin/spring-boot-startup-analyzer/releases"><img src="https://img.shields.io/github/v/release/alexey-lapin/spring-boot-startup-analyzer?style=flat-square" alt="Release"></a>
    <a href="https://github.com/alexey-lapin/spring-boot-startup-analyzer/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
    <a href="https://github.com/alexey-lapin/spring-boot-startup-analyzer/actions"><img src="https://img.shields.io/github/actions/workflow/status/alexey-lapin/spring-boot-startup-analyzer/main.yml?style=flat-square" alt="Build Status"></a>
    <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%5E20.19.0%20%7C%7C%20%3E%3D22.12.0-brightgreen?style=flat-square" alt="Node"></a>
</p>

Analyze Spring Boot Actuator `/actuator/startup` payloads directly in your browser. All data stays in your browser—no server uploads—while still offering rich visualizations and actionable insights.

➡️ **Try it now:** https://alexey-lapin.github.io/spring-boot-startup-analyzer/

## Features

- **Summary view** with total duration, hotspot phases, bean bottlenecks, and key insights at a glance.
- **Tree and table visualizations** for drilling into nested startup phases or scanning steps quickly.
- **Flexible data loading:** paste JSON, upload files, call a live actuator endpoint, or load the bundled sample.
- **Light and dark themes** with a modern, responsive interface.
- **Offline parsing** in the browser—no backend component or data collection.

## Quick Start

1. Open the [web app](https://alexey-lapin.github.io/spring-boot-startup-analyzer/).
2. Choose how to provide startup data:
    - **Endpoint:** fetch data directly from `/actuator/startup` (configure CORS if calling a remote server).
    - **File:** upload a saved JSON response.
    - **Paste:** paste JSON directly into the text editor.
    - **Sample:** click _Load sample data_ to explore instantly.
3. Switch between the Summary, Tree, or Table tabs to explore the trace.

> ℹ️ Need CORS for remote URLs? See the Usage tab inside the app for Spring configuration snippets.

## Local Development

```bash
npm install
npm run dev
npm run test:unit
npm run build
```

Prerequisites: Node 20+ (or 22 LTS) and npm.

## Docker Image

Images are published to GitHub Container Registry (GHCR):

```bash
docker run -d --name sbsa -p 8080:80 ghcr.io/alexey-lapin/spring-boot-startup-analyzer:latest
```

To run behind a reverse proxy with a custom base path:

```bash
docker run -d --name sbsa -p 8080:80 \
  -e UI_PUBLIC_PATH=/spring-boot-startup-analyzer \
  ghcr.io/alexey-lapin/spring-boot-startup-analyzer:latest
```

## For Maintainers

**Deployment & Release:**
- Tagged commits trigger GitHub Actions to build, type-check, and deploy to GitHub Pages.
- Multi-arch Docker images are published to `ghcr.io/alexey-lapin/spring-boot-startup-analyzer`.
- Releases are created automatically with generated notes.
