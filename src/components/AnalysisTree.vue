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
          v-model="toggledColumns"
          :options="toggleableColumns"
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
    <Column
      v-if="isColumnToggled('ParentId')"
      field="parentId"
      header="PId"
      headerClass="w-6rem"
    ></Column>
    <Column
      v-if="isColumnToggled('Step')"
      field="name"
      header="Step"
      headerClass="w-22rem"
    ></Column>
    <Column v-if="isColumnToggled('Summary')" field="summary" header="Sum" headerClass="w-6rem">
      <template #body="slotProps">
        <span>{{
          slotProps.node.data.summary.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
    </Column>
    <Column v-if="isColumnToggled('Duration')" field="duration" header="Dur" headerClass="w-6rem">
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
    <Column v-if="isColumnToggled('Tags')" field="tags" header="Tags">
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

const expandedKeys = ref({} as Record<string, boolean>)

const toggleableColumns = [
  { header: 'ParentId' },
  { header: 'Step' },
  { header: 'Summary' },
  { header: 'Duration' },
  { header: 'Tags' }
]

const toggledColumns = ref(
  toggleableColumns.filter((item) => item.header !== 'ParentId')
)

const isColumnToggled = (name: string) => {
  return toggledColumns.value.find((item) => item.header === name) !== undefined
}

const expandAll = () => {
  eventsStore.events.forEach((item) => (expandedKeys.value[item.id] = true))
}

const collapseAll = () => {
  expandedKeys.value = {}
}
</script>

<style scoped>
:deep(.p-treetable-header) {
  padding: 0.5rem;
}
</style>
