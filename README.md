<p align="center">
    <a href="https://alexey-lapin.github.io/spring-boot-startup-analyzer/">
        <img src="https://raw.githubusercontent.com/alexey-lapin/spring-boot-startup-analyzer/readme/public/logo.svg" width="200"></img>
    </a>
</p>
<h3 align="center">spring-boot-startup-analyzer</h3>

The [spring-boot-startup-analyzer](https://alexey-lapin.github.io/spring-boot-startup-analyzer/) is a Vue.js based
in-browser parser and visualizer for the Spring Boot Actuator
[startup endpoint](https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/#startup) JSON output.

### Usage

1. Go to the [app](https://alexey-lapin.github.io/spring-boot-startup-analyzer/) on GitHub Pages
2. Choose one of the options to provide the startup endpoint JSON output
    - Provide a link to the startup endpoint. This could be from localhost or an internet-accessible service.
      Ensure CORS and security settings are configured correctly. For more details, see
      the [usage](https://alexey-lapin.github.io/spring-boot-startup-analyzer/#/usage) section.
    - Select a file from your device.
    - Paste JSON directly into the text area.
    - Use example by clicking on the "Load sample data" button.
3. Review the data in either table or tree view format.

### Development

Use `npm run dev` to launch the development server and go to [localhost:5173](http://localhost:5173)

### Docker

This app is also available as an
Nginx-based [Docker](https://hub.docker.com/r/lexlapin/spring-boot-startup-analyzer/tags) image:  
`docker run -d --name sbsa -p 8080:80 lexlapin/spring-boot-startup-analyzer`

To run it behind a reverse proxy:  
`docker run -d --name sbsa -p 8080:80 -e UI_PUBLIC_PATH=/some-path lexlapin/spring-boot-startup-analyzer`