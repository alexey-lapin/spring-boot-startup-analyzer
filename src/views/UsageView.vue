<template>
  <div class="max-w-6xl mx-auto py-6 space-y-6">
    <!-- Header -->
    <div class="bg-primary dark:bg-primary-600 text-white rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-3">Getting Started with Spring Boot Startup Analysis</h1>
      <p class="text-base leading-relaxed">
        This tool analyzes startup performance using Spring Boot Actuator's
        <code class="px-2 py-1 bg-black/20 rounded text-sm font-mono">/actuator/startup</code>
        endpoint, available since
        <a
          href="https://spring.io/blog/2020/11/12/spring-boot-2-4-0-available-now"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-80"
          >Spring Boot 2.4.0</a
        >. View
        <a
          href="https://docs.spring.io/spring-boot/reference/features/spring-application.html#features.spring-application.startup-tracking"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-80"
          >Application Startup tracking docs</a
        > and
        <a
          href="https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/#startup"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-80"
          >Actuator startup docs</a
        >.
      </p>
    </div>

    <!-- Configuration Steps -->
    <div class="space-y-4">
      <!-- Step 1: Spring Configuration -->
      <Card>
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-contrast font-bold text-lg"
            >
              1
            </div>
            <h2 class="text-2xl font-semibold m-0">Enable Startup Event Collection</h2>
          </div>
        </template>
        <template #content>
          <p class="text-surface-600 dark:text-surface-400 mb-4">
            Add
            <code class="px-1.5 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-sm font-mono"
              >BufferingApplicationStartup</code
            >
            to your Spring Boot application's main class to enable startup event collection. The
            buffer size (1000) determines how many events are tracked:
          </p>
          <CodeBlock
            :code="codeJavaApp"
            language="java"
          />
        </template>
      </Card>

      <!-- Step 2: URL Analysis Configuration -->
      <Card>
        <template #header>
          <div class="flex items-center gap-3 p-6 pb-0">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-contrast font-bold text-lg"
            >
              2
            </div>
            <h2 class="text-2xl font-semibold m-0">Configure for Remote URL Analysis (Optional)</h2>
          </div>
        </template>
        <template #content>
          <div class="space-y-4">
            <!-- CORS Configuration -->
            <div>
              <h3 class="text-lg font-medium mb-2">
                <i class="pi pi-shield text-primary mr-2"></i>
                Enable CORS
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-3">
                To analyze your application directly via URL, configure Cross-Origin Resource
                Sharing (CORS) to allow requests from this web application. Add the following to
                your
                <code
                  class="px-1.5 py-0.5 bg-surface-100 dark:bg-surface-800 rounded text-sm font-mono"
                  >application.properties</code
                >:
              </p>
              <CodeBlock
                :code="codeProperties"
                language="properties"
              />
            </div>

            <!-- Security Configuration -->
            <div class="mt-6">
              <h3 class="text-lg font-medium mb-2">
                <i class="pi pi-lock-open text-primary mr-2"></i>
                Configure Actuator Security (if applicable)
              </h3>
              <p class="text-surface-600 dark:text-surface-400 mb-3">
                If your application uses Spring Security, you'll need to permit access to actuator
                endpoints. See the
                <a
                  href="https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.endpoints.security"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:underline font-medium"
                  >official documentation</a
                >
                for detailed security configuration options. Example configuration:
              </p>
              <CodeBlock
                :code="codeJavaSecurity"
                language="java"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Alternative Methods -->
      <div class="grid md:grid-cols-2 gap-4">
        <!-- File Analysis -->
        <Card class="h-full">
          <template #header>
            <div class="flex items-center gap-3 p-6 pb-0">
              <i class="pi pi-file text-3xl text-primary"></i>
              <h2 class="text-xl font-semibold m-0">Analyze from File</h2>
            </div>
          </template>
          <template #content>
            <p class="text-surface-600 dark:text-surface-400">
              Download the JSON response from your application's
              <code
                class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-sm font-mono whitespace-nowrap"
                >/actuator/startup</code
              >
              endpoint, save it as a
              <code class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-sm font-mono"
                >.json</code
              >
              file, and upload it using the file input on the home page.
            </p>
          </template>
        </Card>

        <!-- Text Analysis -->
        <Card class="h-full">
          <template #header>
            <div class="flex items-center gap-3 p-6 pb-0">
              <i class="pi pi-code text-3xl text-primary"></i>
              <h2 class="text-xl font-semibold m-0">Analyze from Text</h2>
            </div>
          </template>
          <template #content>
            <p class="text-surface-600 dark:text-surface-400">
              Copy the raw JSON response from your application's
              <code
                class="px-2 py-1 bg-surface-100 dark:bg-surface-800 rounded text-sm font-mono whitespace-nowrap"
                >/actuator/startup</code
              >
              endpoint and paste it directly into the text area on the home page for immediate
              analysis.
            </p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import CodeBlock from '@/components/CodeBlock.vue' // Configuration code snippets

// Configuration code snippets
const codeJavaApp = `@SpringBootApplication
public class App {
  public static void main(String[] args) {
    SpringApplication application = new SpringApplication(App.class);
    application.setApplicationStartup(new BufferingApplicationStartup(1000));
    application.run(args);
  }
}`

const codeJavaSecurity = `@Configuration(proxyBeanMethods = false)
public class ActuatorSecurityConfiguration {
  @Bean
  public SecurityFilterChain actuatorSecurityFilterChain(HttpSecurity http) throws Exception {
    http.requestMatcher(EndpointRequest.toAnyEndpoint())
      .authorizeRequests((requests) -> requests.anyRequest().permitAll());
    return http.build();
  }
}`

const codeProperties = `management.endpoints.web.exposure.include=startup
management.endpoints.web.cors.allowed-origins=https://alexey-lapin.github.io
management.endpoints.web.cors.allowed-methods=GET,POST`
</script>
