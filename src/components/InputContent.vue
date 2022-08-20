<template>
  <Textarea v-model="text" rows="10" style="resize: none; width: 100%" />
  <div class="mt-3 flex justify-content-center">
    <Button label="Analyze Text" icon="bi bi-file-text" @click="readContent" />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

import DefaultParser from "@/service/DefaultParser";
import { useEventsStore } from "@/store/EventsStore";

const toast = useToast();
const eventsStore = useEventsStore();
const parser = new DefaultParser();

const text = ref("");

function readContent(): void {
  if (text.value === "") {
    pushToast("content is empty");
    return;
  }
  try {
    const parseResult = parser.parse(text.value);
    eventsStore.insertData(parseResult);
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    pushToast(message);
  }
}

function pushToast(message: string): void {
  toast.add({
    severity: "error",
    summary: "Failed to analyze data",
    detail: message,
    life: 3000,
  });
}
</script>
