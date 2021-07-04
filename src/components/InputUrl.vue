<template>
  <InputText
    style="width: 100%"
    v-model="url"
    placeholder="http://localhost:8080/actuator/startup"
  />
  <div class="p-mt-3 p-d-flex p-jc-center">
    <Button label="Analyze URL" icon="bi bi-link" @click="readContent" />
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import { Options, Vue } from "vue-class-component";
import { mapMutations } from "vuex";

import DefaultParser from "@/service/DefaultParser";
import ParseResult from "@/model/ParseResult";

@Options({
  components: {
    Button,
    InputText,
  },
  methods: mapMutations(["insertData"]),
})
export default class InputUrl extends Vue {
  insertData!: (data: ParseResult) => void;
  toast = useToast();
  url = "";

  readContent(): void {
    fetch(this.url, {
      method: "POST",
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
        const parser = new DefaultParser();
        const nodes = parser.parse(data);
        return nodes;
      })
      .then((data) => this.insertData(data))
      .catch((error) =>
        this.toast.add({
          severity: "error",
          summary: "Failed to analyze data",
          detail: error,
          life: 3000,
        })
      );
  }
}
</script>