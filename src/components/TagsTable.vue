<template>
  <DataTable
    v-if="row.data.tags.length > 0"
    :value="row.data.tags"
    class="p-datatable-sm"
    showGridlines
  >
    <Column headerStyle="display: none" bodyClass="tags-cell-body">
      <template #body="slotProps"
        >{{ slotProps.data.key }}: {{ slotProps.data.value }}</template
      >
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";

defineProps(["row"]);
</script>

<!--<script lang="ts">-->
<!--import Column from "primevue/column";-->
<!--import DataTable from "primevue/datatable";-->
<!--import { Options, Vue } from "vue-class-component";-->
<!--// import { mapGetters } from "vuex";-->

<!--@Options({-->
<!--  components: {-->
<!--    Column,-->
<!--    DataTable,-->
<!--  },-->
<!--  props: ["row"],-->
<!--})-->
<!--export default class TagsTable extends Vue {}-->
<!--</script>-->

<style>
.tags-cell-body {
  overflow: hidden;
}
.tags-cell-body:hover {
  word-break: break-all;
}
</style>
