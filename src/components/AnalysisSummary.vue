<template>
  <h1>summary</h1>
  <Chart type="doughnut" :data="chartData" />
  <Chart type="bar" :data="basicData" />
</template>

<script lang="ts">
import Divider from "primevue/divider";
import ScrollTop from "primevue/scrolltop";
import Button from "primevue/button";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";
import InputFile from "@/components/InputFile.vue";
import InputUrl from "@/components/InputUrl.vue";
import InputContent from "@/components/InputContent.vue";
import AnalysisTree from "@/components/AnalysisTree.vue";
import Chart from "primevue/chart";

import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

@Options({
  components: {
    AnalysisTree,
    Button,
    Chart,
    Divider,
    ScrollTop,
    InputFile,
    InputUrl,
    InputContent,
    TabPanel,
    TabView,
  },
  computed: {
    ...mapGetters(["isAnalyzed"]),
  },
})
export default class AnalysisSummary extends Vue {
  chartData = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  basicData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#42A5F5",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "My Second dataset",
        backgroundColor: "#FFA726",
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };
}
</script>
