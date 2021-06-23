<template>
  <h1>Analyzer</h1>

  <div v-if="!isAnalyzed" class="p-grid">
    <div class="p-col-6 p-offset-3">
      <InputUrl />
      <Divider align="center" class="p-d-flex p-jc-center" type="solid">
        <span class="p-tag">OR</span>
      </Divider>
      <div class="p-d-flex p-jc-center">
        <InputFile />
      </div>
      <Divider align="center" class="p-d-flex p-jc-center" type="solid">
        <span class="p-tag">OR</span>
      </Divider>
      <InputContent />
    </div>
  </div>

  <AnalysisTree v-if="isAnalyzed" />

  <ScrollTop />
</template>

<script lang="ts">
import ScrollTop from "primevue/scrolltop";
import Divider from "primevue/divider";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";
import InputFile from "@/components/InputFile.vue";
import InputUrl from "@/components/InputUrl.vue";
import InputContent from "@/components/InputContent.vue";
import AnalysisTree from "@/components/AnalysisTree.vue";

@Options({
  components: {
    AnalysisTree,
    Divider,
    ScrollTop,
    InputFile,
    InputUrl,
    InputContent,
  },
  computed: {
    ...mapGetters(["isAnalyzed"]),
  },
})
export default class Analyzer extends Vue {
  isAnalyzed!: boolean;
}
</script>
