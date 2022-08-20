<template>
  <div class="flex">
    <Dropdown v-model="method" :options="['GET', 'POST']" class="mr-2" />
    <InputText
      style="width: 100%"
      v-model="url"
      placeholder="actuator endpoint url"
    />
  </div>
  <div class="mt-3 flex justify-content-center">
    <Button label="Analyze URL" icon="bi bi-link" @click="readContent" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";

import DefaultParser from "@/service/DefaultParser";
import { useEventsStore } from "@/store/EventsStore";

const toast = useToast();
const eventsStore = useEventsStore();
const parser = new DefaultParser();

const url = ref("http://localhost:8080/actuator/startup");
const method = ref("GET");

const readContent = () => {
  fetch(url.value, {
    method: method.value,
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw Error(
          `request to ${response.url} returned ${response.status} status`
        );
      }
    })
    .then((data) => {
      return parser.parse(data);
    })
    .then((data) => eventsStore.insertData(data))
    .catch((error) =>
      toast.add({
        severity: "error",
        summary: "Failed to analyze data",
        detail: error,
        life: 3000,
      })
    );
};
</script>
