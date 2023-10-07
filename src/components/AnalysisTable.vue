<template>
  <DataTable :value="eventsStore.events" tableStyle="table-layout: fixed;">
    <Column field="id" header="Id" headerClass="w-1" :sortable="true"></Column>
    <Column field="parentId" header="PId" headerClass="w-1" :sortable="true"></Column>
    <Column field="name" header="Name" :sortable="true"></Column>
    <Column field="summary" header="Sum" headerClass="w-1" :sortable="true">
      <template #body="slotProps">
        <span>{{ slotProps.data.summary.toLocaleString(undefined, {maximumFractionDigits: 3}) }}</span>
      </template>
    </Column>
    <Column field="duration" header="Dur" headerClass="w-1" :sortable="true">
      <template #body="slotProps">
        <span>{{ slotProps.data.duration.toLocaleString(undefined, {maximumFractionDigits: 3}) }}</span>
      </template>
    </Column>
    <Column header="Tags">
      <template #body="slotProps">
        <TagsTable v-if="slotProps.data.tags" :tags="slotProps.data.tags" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'

import TagsTable from '@/components/TagsTable.vue'
import { useEventsStore } from '@/store/EventsStore'

const eventsStore = useEventsStore()
</script>
