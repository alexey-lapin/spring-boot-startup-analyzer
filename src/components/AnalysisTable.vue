<template>
  <DataTable
    :value="eventsStore.events"
    v-model:filters="filters"
    :removableSort="true"
    filterDisplay="menu"
    class="p-datatable-sm"
    tableStyle="table-layout: fixed;"
  >
    <template #header>
      <div class="flex justify-content-between">
        <MultiSelect
          v-model="toggledColumns"
          :options="toggleableColumns"
          optionLabel="header"
          placeholder="Select Columns"
        />
        <Button icon="pi pi-filter-slash" label="Clear" plain outlined @click="clearFilter()" />
      </div>
    </template>
    <Column field="id" header="Id" headerClass="w-6rem" :sortable="true">
      <template #filter="{ filterModel }">
        <InputNumber
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          placeholder="Search by Id"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('ParentId')"
      field="parentId"
      header="PId"
      headerClass="w-6rem"
      :sortable="true"
    >
      <template #filter="{ filterModel }">
        <InputNumber
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          placeholder="Search by ParentId"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Step')"
      field="name"
      header="Step"
      headerClass="w-22rem"
      :sortable="true"
    >
      <template #filter="{ filterModel }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by Step"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Summary')"
      field="summary"
      dataType="numeric"
      header="Sum"
      headerClass="w-6rem"
      :sortable="true"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.data.summary.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
      <template #filter="{ filterModel }">
        <InputNumber
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          placeholder="Search by Summary"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Duration')"
      field="duration"
      dataType="numeric"
      header="Dur"
      headerClass="w-6rem"
      :sortable="true"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.data.duration.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
      <template #filter="{ filterModel }">
        <InputNumber
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          placeholder="Search by Duration"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Tags')"
      field="tags"
      header="Tags"
      :filterMatchModeOptions="[{ label: 'Tags Contain', value: FILTER_TAGS_CONTAIN }]"
    >
      <template #body="slotProps">
        <TagsTable v-if="slotProps.data.tags" :tags="slotProps.data.tags" />
      </template>
      <template #filter="{ filterModel }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by Tags"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect'
import { FilterMatchMode, FilterOperator, FilterService } from 'primevue/api'

import TagsTable from '@/components/TagsTable.vue'
import { useEventsStore } from '@/store/EventsStore'
import type Tag from '@/model/Tag'

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

const FILTER_TAGS_CONTAIN = 'TagsContain'

onMounted(() => {
  FilterService.register(FILTER_TAGS_CONTAIN, (value, filter) => {
    if (filter === undefined || filter === null || filter.trim() === '') {
      return true
    }

    if (value === undefined || value === null) {
      return false
    }
    const tags = value as Tag[]
    return tags.some(
      (tag) =>
        tag.key.toLowerCase().includes(filter.toLowerCase()) ||
        tag.value.toLowerCase().includes(filter.toLowerCase())
    )
  })
})

const filters = ref()

const initFilters = () => {
  filters.value = {
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    parentId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
    },
    summary: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO }]
    },
    duration: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO }]
    },
    tags: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FILTER_TAGS_CONTAIN }]
    }
  }
}

initFilters()

const clearFilter = () => {
  initFilters()
}
</script>
