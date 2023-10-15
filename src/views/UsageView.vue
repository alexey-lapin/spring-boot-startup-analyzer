<template>
  <Message severity="success" :closable="false"
    >Spring Boot Actuator <i>startup</i> endpoint is available since
    <a href="https://spring.io/blog/2020/11/12/spring-boot-2-4-0-available-now"
      >2.4.0</a
    >
    -
    <a
      href="https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/#startup"
      >docs</a
    ></Message
  >
  <Panel header="Spring configuration" class="mb-2">
    Configure your application to collect startup events:
    <CodeBlock :code="codeJavaApp" language="java" class="mt-2" />
  </Panel>
  <Panel header="To Analyze URL" class="mb-2">
    Configure your application to handle requests from this web page (CORS)
    <CodeBlock :code="codeProperties" language="properties" class="mt-2 mb-2" />
    Configure security (if is it used in your application) according to
    <a
      href="https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints.security"
      >docs</a
    >
    <CodeBlock :code="codeJavaSecurity" language="java" class="mt-2" />
  </Panel>
  <Panel header="To Analyze File" class="mb-2">
    Save json response from <b>/actuator/startup</b> endpoint to file and use it
    for analysis
  </Panel>
  <Panel header="To Analyze Text">
    Copy json response from <b>/actuator/startup</b> endpoint and use it for
    analysis
  </Panel>
</template>

<script setup lang="ts">
import Message from "primevue/message";
import Panel from "primevue/panel";
import dedent from "ts-dedent";

import CodeBlock from "@/components/CodeBlock.vue";

const codeJavaApp = dedent(`
    @SpringBootApplication
    public class App {
        public static void main(String[] args) {
            SpringApplication application = new SpringApplication(App.class);
            application.setApplicationStartup(new BufferingApplicationStartup(1000));
            application.run(args);
        }
    }
  `);

const codeJavaSecurity = dedent(`
    @Configuration(proxyBeanMethods = false)
    public class ActuatorSecurityConfiguration {
        @Bean
        public SecurityFilterChain actuatorSecurityFilterChain(HttpSecurity http) throws Exception {
            http.requestMatcher(EndpointRequest.toAnyEndpoint())
                    .authorizeRequests((requests) -> requests.anyRequest().permitAll());
            return http.build();
        }
    }
  `);

const codeProperties = dedent(`
    management.endpoints.web.exposure.include=startup
    management.endpoints.web.cors.allowed-origins=https://alexey-lapin.github.io
    management.endpoints.web.cors.allowed-methods=GET,POST
  `);
</script>

<!--<script lang="ts">-->
<!--import Message from "primevue/message";-->
<!--import Panel from "primevue/panel";-->
<!--import dedent from "ts-dedent";-->
<!--import { Options, Vue } from "vue-class-component";-->

<!--import CodeBlock from "@/components/CodeBlock.vue";-->

<!--@Options({-->
<!--  components: {-->
<!--    CodeBlock,-->
<!--    Message,-->
<!--    Panel,-->
<!--  },-->
<!--})-->
<!--export default class Analyzer extends Vue {-->
<!--  codeJavaApp = dedent(`-->
<!--    @SpringBootApplication-->
<!--    public class App {-->
<!--        public static void main(String[] args) {-->
<!--            SpringApplication application = new SpringApplication(App.class);-->
<!--            application.setApplicationStartup(new BufferingApplicationStartup(1000));-->
<!--            application.run(args);-->
<!--        }-->
<!--    }-->
<!--  `);-->
<!--  codeJavaSecurity = dedent(`-->
<!--    @Configuration(proxyBeanMethods = false)-->
<!--    public class ActuatorSecurityConfiguration {-->
<!--        @Bean-->
<!--        public SecurityFilterChain actuatorSecurityFilterChain(HttpSecurity http) throws Exception {-->
<!--            http.requestMatcher(EndpointRequest.toAnyEndpoint())-->
<!--                    .authorizeRequests((requests) -> requests.anyRequest().permitAll());-->
<!--            return http.build();-->
<!--        }-->
<!--    }-->
<!--  `);-->
<!--  codeProperties = dedent(`-->
<!--    management.endpoints.web.exposure.include=startup-->
<!--    management.endpoints.web.cors.allowed-origins=https://alexey-lapin.github.io-->
<!--    management.endpoints.web.cors.allowed-methods=GET,POST-->
<!--  `);-->
<!--}-->
<!--</script>-->
