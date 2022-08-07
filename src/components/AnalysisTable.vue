<template>
  <DataTable :value="events" :autoLayout="true">
    <Column field="id" header="Id" :sortable="true"></Column>
    <Column field="parentId" header="ParentId" :sortable="true"></Column>
    <Column field="name" header="Name" :sortable="true"></Column>
    <Column field="summary" header="Summary" :sortable="true"></Column>
    <Column field="duration" header="Duration" :sortable="true"></Column>
    <Column header="Tags">
      <template #body="slotProps">
        <TagsTable :row="slotProps" />
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

import Event from "@/model/Event";
import TagsTable from "@/components/TagsTable.vue";

@Options({
  components: {
    Column,
    DataTable,
    TagsTable,
  },
  computed: {
    ...mapGetters(["events"]),
  },
})
export default class AnalysisTable extends Vue {
  events!: Event[];
}
</script>

<style>
.p-datatable table {
  width: 100%;
}
</style>
