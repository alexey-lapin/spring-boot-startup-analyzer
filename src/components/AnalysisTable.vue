<template>
  <DataTable
    :value="eventsStore.events"
    :removableSort="true"
    class="p-datatable-sm"
    tableStyle="table-layout: fixed;"
  >
    <template #header>
      <div class="flex gap-1">
        <MultiSelect
          v-model="toggledColumns"
          :options="toggleableColumns"
          optionLabel="header"
          placeholder="Select Columns"
        />
      </div>
    </template>
    <Column field="id" header="Id" headerClass="w-6rem" :sortable="true"></Column>
    <Column
      v-if="isColumnToggled('ParentId')"
      field="parentId"
      header="PId"
      headerClass="w-6rem"
      :sortable="true"
    ></Column>
    <Column
      v-if="isColumnToggled('Step')"
      field="name"
      header="Step"
      headerClass="w-22rem"
      :sortable="true"
    ></Column>
    <Column
      v-if="isColumnToggled('Summary')"
      field="summary"
      header="Sum"
      headerClass="w-6rem"
      :sortable="true"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.data.summary.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Duration')"
      field="duration"
      header="Dur"
      headerClass="w-6rem"
      :sortable="true"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.data.duration.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
    </Column>
    <Column v-if="isColumnToggled('Tags')" header="Tags">
      <template #body="slotProps">
        <TagsTable v-if="slotProps.data.tags" :tags="slotProps.data.tags" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import MultiSelect from 'primevue/multiselect'

import TagsTable from '@/components/TagsTable.vue'
import { useEventsStore } from '@/store/EventsStore'

const eventsStore = useEventsStore()

const toggleableColumns = [
  { header: 'ParentId' },
  { header: 'Step' },
  { header: 'Summary' },
  { header: 'Duration' },
  { header: 'Tags' }
]

const toggledColumns = ref(toggleableColumns)

const isColumnToggled = (name: string) => {
  return toggledColumns.value.find((item) => item.header === name) !== undefined
}
</script>
