<template>
  <TreeTable
    :value="eventsStore.nodes"
    :expandedKeys="expandedKeys"
    class="p-treetable-sm"
    :resizableColumns="true"
    showGridlines
  >
    <template #header>
      <div class="flex gap-1">
        <MultiSelect
          v-model="selectedColumns"
          :options="columns"
          optionLabel="header"
          placeholder="Select Columns"
          class="mr-auto"
        />
        <Button
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          @click="expandAll"
          v-tooltip.top="'it may take some time'"
          plain
          outlined
        />
        <Button
          type="button"
          icon="pi pi-minus"
          label="Collapse All"
          @click="collapseAll"
          plain
          outlined
        />
      </div>
    </template>
    <Column field="id" header="Id" :expander="true" headerStyle="width: 16em"></Column>
    <Column v-if="isColumnSelected('ParentId')" field="parentId" header="ParentId"></Column>
    <Column v-if="isColumnSelected('Step')" field="name" header="Step"></Column>
    <Column
      v-if="isColumnSelected('Summary')"
      field="summary"
      header="Sum"
      headerStyle="width: 5em"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.node.data.summary.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
    </Column>
    <Column
      v-if="isColumnSelected('Duration')"
      field="duration"
      header="Dur"
      headerStyle="width: 5em"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.node.data.duration.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
    </Column>
    <!-- <Column
      v-if="isColumnSelected('Percentage')"
      field="percentage"
      header="Percentage"
      headerStyle="width: 5em"
    ></Column> -->
    <Column v-if="isColumnSelected('Tags')" field="tags" header="Tags">
      <template #body="slotProps">
        <TagsTable v-if="slotProps.node.data.tags" :tags="slotProps.node.data.tags" />
      </template>
    </Column>
  </TreeTable>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Column from 'primevue/column'
import MultiSelect from 'primevue/multiselect'
import TreeTable from 'primevue/treetable'
import { ref } from 'vue'

import TagsTable from '@/components/TagsTable.vue'
import { useEventsStore } from '@/store/EventsStore'

const eventsStore = useEventsStore()

const columns: ColumnDescriptor[] = [
  { header: 'ParentId' },
  { header: 'Step' },
  { header: 'Summary' },
  { header: 'Duration' },
  { header: 'Tags' }
]

const expandedKeys = ref({} as Record<string, boolean>)
const selectedColumns = ref(columns.filter((item: ColumnDescriptor) => item.header !== 'ParentId'))

function isColumnSelected(name: string): boolean {
  return selectedColumns.value.find((item) => item.header === name) !== undefined
}

function expandAll(): void {
  eventsStore.events.forEach((item) => (expandedKeys.value[item.id] = true))
}

function collapseAll(): void {
  expandedKeys.value = {}
}

interface ColumnDescriptor {
  header: string
}
</script>
