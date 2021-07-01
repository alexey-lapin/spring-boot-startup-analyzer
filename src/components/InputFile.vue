<template>
  <FileUpload
    mode="basic"
    chooseLabel="Analyze File"
    accept="application/json"
    :auto="true"
    :custom-upload="true"
    @uploader="uploader"
  />
</template>

<script lang="ts">
import FileUpload from "primevue/fileupload";
import { useToast } from "primevue/usetoast";
import { Options, Vue } from "vue-class-component";
import { mapMutations } from "vuex";

import DefaultParser from "@/service/DefaultParser";
import ParseResult from "@/model/ParseResult";

@Options({
  components: {
    FileUpload,
  },
  methods: mapMutations(["insertData"]),
})
export default class InputFile extends Vue {
  insertData!: (data: ParseResult) => void;
  toast = useToast();

  uploader(event: UploaderEvent): void {
    this.readContent(event.files[0]);
  }

  readContent(file: File): void {
    const reader: FileReader = new FileReader();
    const callback = (event: ProgressEvent<FileReader>) => {
      const parser = new DefaultParser();
      try {
        const data = parser.parse(event.target?.result as string);
        this.insertData(data);
      } catch (error) {
        this.pushToast(error);
      }
    };
    reader.onload = callback;
    reader.readAsText(file);
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

interface UploaderEvent {
  files: File[];
}
</script>
