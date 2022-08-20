<template>
  <DataTable :value="eventsStore.events" :autoLayout="true">
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

<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";

import TagsTable from "@/components/TagsTable.vue";
import { useEventsStore } from "@/store/EventsStore";

const eventsStore = useEventsStore();
</script>

<style>
.p-datatable table {
  width: 100%;
}
</style>
