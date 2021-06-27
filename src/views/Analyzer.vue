<template>
  <div v-if="!isAnalyzed" class="p-grid">
    <div class="p-col-6 p-offset-3">
      <InputUrl />
      <Divider align="center" class="p-d-flex p-jc-center" type="solid">
        <p>or</p>
      </Divider>
      <div class="p-d-flex p-jc-center">
        <InputFile />
      </div>
      <Divider align="center" class="p-d-flex p-jc-center" type="solid">
        <p>or</p>
      </Divider>
      <InputContent />
    </div>
  </div>

  <div v-if="isAnalyzed">
    <Button
      label="Tree"
      class="p-mr-2"
      :class="getTabButtonClass('AnalysisTree')"
      @click="switchTab('AnalysisTree')"
    />
    <Button
      label="Table"
      :class="getTabButtonClass('AnalysisTable')"
      @click="switchTab('AnalysisTable')"
    />
    <div class="p-mt-2">
      <KeepAlive>
        <Component :is="tab" />
      </KeepAlive>
    </div>
  </div>

  <ScrollTop />
</template>

<script lang="ts">
import Button from "primevue/button";
import Divider from "primevue/divider";
import ScrollTop from "primevue/scrolltop";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

import AnalysisSummary from "@/components/AnalysisSummary.vue";
import AnalysisTable from "@/components/AnalysisTable.vue";
import AnalysisTree from "@/components/AnalysisTree.vue";
import InputContent from "@/components/InputContent.vue";
import InputFile from "@/components/InputFile.vue";
import InputUrl from "@/components/InputUrl.vue";

@Options({
  components: {
    AnalysisSummary,
    AnalysisTable,
    AnalysisTree,
    Button,
    Divider,
    InputContent,
    InputFile,
    InputUrl,
    ScrollTop,
    TabPanel,
    TabView,
  },
  computed: {
    ...mapGetters(["isAnalyzed"]),
  },
})
export default class Analyzer extends Vue {
  isAnalyzed!: boolean;

  tab = "AnalysisTree";

  switchTab(name: string): void {
    this.tab = name;
  }

  getTabButtonClass(name: string): string {
    return name === this.tab ? "" : "p-button-outlined";
  }
}
</script>
