<p align="center">
    <a href="https://alexey-lapin.github.io/spring-boot-startup-analyzer/">
        <img src="https://raw.githubusercontent.com/alexey-lapin/spring-boot-startup-analyzer/readme/public/logo.svg" width="200"></img>
    </a>
</p>
<h3 align="center">spring-boot-startup-analyzer</h3>

[spring-boot-startup-analyzer](https://alexey-lapin.github.io/spring-boot-startup-analyzer/) is an in-browser spring boot actuator [startup endpoint](https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/#startup) output parser and visualizer. 

### Development
Use `npm run serve` to launch the development server and go to [localhost:8080](http://localhost:8080)

### Docker
This app is available as an Nginx-based docker image:  
`docker run -d --name sbsa -p 8080:80 lexlapin/spring-boot-startup-analyzer`

To run it behind a reverse proxy:  
`docker run -d --name sbsa -p 8080:80 -e UI_PUBLIC_PATH=/some-path lexlapin/spring-boot-startup-analyzer`