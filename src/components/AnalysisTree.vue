<template>
  <TreeTable
    :value="nodes"
    :expanded-keys="expandedKeys"
    :indentation="0.4"
    :resizable-columns="true"
    :row-hover="true"
    size="small"
    table-style="table-layout: fixed; width: 100%;"
  >
    <template #header>
      <div class="flex gap-1">
        <MultiSelect
          v-model="toggledColumns"
          :options="toggleableColumns"
          option-label="header"
          placeholder="Select Columns"
          class="mr-auto"
          size="small"
        />
        <Button
          v-tooltip.top="'it may take some time'"
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          size="small"
          outlined
          severity="secondary"
          @click="expandAll"
        />
        <Button
          type="button"
          icon="pi pi-minus"
          label="Collapse All"
          size="small"
          outlined
          severity="secondary"
          @click="collapseAll"
        />
      </div>
    </template>
    <Column
      field="id"
      header="Id"
      :expander="true"
      :header-class="columnWidthClasses.id"
      :body-class="columnWidthClasses.id"
    />
    <Column
      v-if="isColumnToggled('ParentId')"
      field="parentId"
      header="PId"
      :header-class="columnWidthClasses.parentId"
      :body-class="columnWidthClasses.parentId"
    />
    <Column
      v-if="isColumnToggled('Step')"
      field="name"
      header="Step"
      :header-class="columnWidthClasses.step"
      :body-class="columnWidthClasses.step"
    >
      <template #body="slotProps">
        <span
          :class="[
            'block',
            'w-full',
            'overflow-clip',
            'text-ellipsis',
            'truncate',
            'hover:break-all',
            'hover:overflow-visible',
            'hover:whitespace-normal',
          ]"
        >
          {{ slotProps.node.data.name }}
        </span>
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Duration')"
      field="summary"
      header="Dur"
      :header-class="columnWidthClasses.duration"
      :body-class="columnWidthClasses.duration"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.node.data.summary.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Self')"
      field="duration"
      header="Self"
      :header-class="columnWidthClasses.self"
      :body-class="columnWidthClasses.self"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.node.data.duration.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Tags')"
      field="tags"
      header="Tags"
      :header-class="columnWidthClasses.tags"
      :body-class="columnWidthClasses.tags"
    >
      <template #body="slotProps">
        <TagsTable
          v-if="slotProps.node.data.tags"
          :tags="slotProps.node.data.tags"
        />
      </template>
    </Column>
  </TreeTable>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import type DataNode from '@/model/DataNode'
import type Event from '@/model/Event'
import MultiSelect from 'primevue/multiselect'
import TagsTable from '@/components/TagsTable.vue'
import TreeTable from 'primevue/treetable'
import { columnWidthClasses } from '@/constants/columnWidths'

const props = defineProps<{
  nodes: DataNode[]
  events: Event[]
}>()

const nodes = computed(() => props.nodes)
const events = computed(() => props.events)

const expandedKeys = ref({} as Record<string, boolean>)

const toggleableColumns = [
  { header: 'ParentId' },
  { header: 'Step' },
  { header: 'Duration' },
  { header: 'Self' },
  { header: 'Tags' },
]

const toggledColumns = ref(toggleableColumns.filter((item) => item.header !== 'ParentId'))

const isColumnToggled = (name: string) => {
  return toggledColumns.value.find((item) => item.header === name) !== undefined
}

const expandAll = () => {
  events.value.forEach((item) => (expandedKeys.value[item.id] = true))
}

const collapseAll = () => {
  expandedKeys.value = {}
}

watch(
  () => props.nodes,
  () => {
    collapseAll()
  },
)
</script>
