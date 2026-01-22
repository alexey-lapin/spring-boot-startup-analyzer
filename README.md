<p align="center">
    <a href="https://alexey-lapin.github.io/spring-boot-startup-analyzer/">
        <img src="public/logo.svg" width="200"></img>
    </a>
</p>
<h3 align="center">spring-boot-startup-analyzer</h3>

Analyze Spring Boot Actuator `/actuator/startup` payloads directly in your browser. The UI never uploads data to a
server while still offering rich visualizations and actionable highlights.

➡️ **Try it now:** https://alexey-lapin.github.io/spring-boot-startup-analyzer/

## Features

- **Insights-first summary** view with total duration, hotspot phases, bean bottlenecks, and quick takeaways.
- **Tree and table visualizations** for drilling into nested startup phases or scanning steps quickly.
- **Multiple ingestion paths:** paste JSON, upload files, call a live actuator URL, or load the bundled sample trace.
- **Modern PrimeVue + Tailwind UI** with light/dark presets powered by PrimeUI themes.
- **Offline parsing** in the browser—no backend component or data collection.

## Quick Start

1. Open the [web app](https://alexey-lapin.github.io/spring-boot-startup-analyzer/).
2. Choose how to provide startup data:
    - **Endpoint:** call `/actuator/startup` via GET or POST (configure CORS/security if remote).
    - **File:** upload a saved JSON response.
    - **Paste:** drop raw JSON into the editor.
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

Need a custom base path (e.g., behind a reverse proxy)?

```bash
docker run -d --name sbsa -p 8080:80 \
  -e UI_PUBLIC_PATH=/spring-boot-startup-analyzer \
  ghcr.io/alexey-lapin/spring-boot-startup-analyzer:latest
```

## Deployment & Release

- GitHub Actions builds, type-checks, and deploys the static site to GitHub Pages for every tag.
- Tagged builds also publish multi-arch Docker images to `ghcr.io/alexey-lapin/spring-boot-startup-analyzer`.
- Releases are created automatically via `gh release create` with generated notes.
