<template>
  <Textarea v-model="value" rows="10" style="resize: none; width: 100%" />
  <div class="p-mt-2 p-d-flex p-jc-center">
    <Button label="Analyze text" icon="bi bi-file-text" @click="readContent" />
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { useToast } from "primevue/usetoast";
import { Options, Vue } from "vue-class-component";
import { mapMutations } from "vuex";
import DefaultParser from "@/service/DefaultParser";
import ParseResult from "@/model/ParseResult";

@Options({
  components: {
    Button,
    Textarea,
  },
  methods: mapMutations(["insertData"]),
})
export default class InputUrl extends Vue {
  insertData!: (data: ParseResult) => void;
  toast = useToast();
  value = "";

  readContent(): void {
    if (this.value === "") {
      this.pushToast("content is empty");
      return;
    }
    try {
      const parser = new DefaultParser();
      const nodes = parser.parse(this.value);
      this.insertData(nodes);
    } catch (error) {
      this.pushToast(error);
    }
  }

  pushToast(message: string): void {
    this.toast.add({
      severity: "error",
      summary: "Failed to analyze data",
      detail: message,
      life: 3000,
    });
  }
}
</script>
