<template>
  <DataTable
    v-model:filters="filters"
    :value="events"
    :removable-sort="true"
    :row-hover="true"
    filter-display="menu"
    size="small"
    table-style="table-layout: fixed; width: 100%;"
    @filter="onFilter($event)"
  >
    <template #header>
      <div class="flex justify-between">
        <MultiSelect
          v-model="toggledColumns"
          :options="toggleableColumns"
          option-label="header"
          placeholder="Select Columns"
          size="small"
        />
        <Button
          icon="pi pi-filter-slash"
          label="Clear"
          size="small"
          outlined
          severity="secondary"
          @click="clearFilter()"
        />
      </div>
    </template>
    <Column
      v-if="isColumnToggled('Id')"
      field="id"
      data-type="numeric"
      header="Id"
      :header-class="columnWidthClasses.id"
      :body-class="columnWidthClasses.id"
      :sortable="true"
    >
      <template #filter="{ filterModel, applyFilter }">
        <InputNumber
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          placeholder="Search by Id"
          @keyup.enter="applyFilter()"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('ParentId')"
      field="parentId"
      data-type="numeric"
      header="PId"
      :header-class="columnWidthClasses.parentId"
      :body-class="columnWidthClasses.parentId"
      :sortable="true"
    >
      <template #filter="{ filterModel, applyFilter }">
        <InputNumber
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          placeholder="Search by ParentId"
          @keyup.enter="applyFilter()"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Step')"
      field="name"
      header="Step"
      :header-class="columnWidthClasses.step"
      :body-class="columnWidthClasses.step"
      :sortable="true"
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
          {{ slotProps.data.name }}
        </span>
      </template>
      <template #filter="{ filterModel, applyFilter }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by Step"
          @keyup.enter="applyFilter()"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Duration')"
      field="summary"
      data-type="numeric"
      header="Dur"
      :header-class="columnWidthClasses.duration"
      :body-class="columnWidthClasses.duration"
      :sortable="true"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.data.summary.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
      <template #filter="{ filterModel, applyFilter }">
        <InputNumber
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          placeholder="Search by Summary"
          @keyup.enter="applyFilter()"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Self')"
      field="duration"
      data-type="numeric"
      header="Self"
      :header-class="columnWidthClasses.self"
      :body-class="columnWidthClasses.self"
      :sortable="true"
    >
      <template #body="slotProps">
        <span>{{
          slotProps.data.duration.toLocaleString(undefined, { maximumFractionDigits: 3 })
        }}</span>
      </template>
      <template #filter="{ filterModel, applyFilter }">
        <InputNumber
          v-model="filterModel.value"
          type="number"
          class="p-column-filter"
          placeholder="Search by Duration"
          @keyup.enter="applyFilter()"
        />
      </template>
    </Column>
    <Column
      v-if="isColumnToggled('Tags')"
      field="tags"
      header="Tags"
      :header-class="columnWidthClasses.tags"
      :body-class="columnWidthClasses.tags"
      :filter-match-mode-options="[{ label: 'Tags Contain', value: FILTER_TAGS_CONTAIN }]"
    >
      <template #body="slotProps">
        <TagsTable
          v-if="slotProps.data.tags"
          :tags="slotProps.data.tags"
        />
      </template>
      <template #filter="{ filterModel, applyFilter }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by Tags"
          @keyup.enter="applyFilter()"
        />
      </template>
    </Column>
    <template #footer>
      <div class="flex gap-3">
        <span>Total: {{ events.length }}</span>
        <span>|</span>
        <span>Filtered: {{ filteredItems }}</span>
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable, { type DataTableFilterEvent } from 'primevue/datatable'
import { FilterMatchMode, FilterOperator, FilterService } from '@primevue/core/api'
import { computed, onMounted, ref, watch } from 'vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import type Event from '@/model/Event'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import type Tag from '@/model/Tag'
import TagsTable from '@/components/TagsTable.vue'
import { columnWidthClasses } from '@/constants/columnWidths'

const props = defineProps<{ events: Event[] }>()

const events = computed(() => props.events)

const toggleableColumns = [
  { header: 'Id' },
  { header: 'ParentId' },
  { header: 'Step' },
  { header: 'Duration' },
  { header: 'Self' },
  { header: 'Tags' },
]

const toggledColumns = ref(toggleableColumns)

const isColumnToggled = (name: string) => {
  return toggledColumns.value.find((item) => item.header === name) !== undefined
}

const FILTER_TAGS_CONTAIN = 'TagsContain'

onMounted(() => {
  FilterService.register(FILTER_TAGS_CONTAIN, (value: unknown, filter: string) => {
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
        tag.value.toLowerCase().includes(filter.toLowerCase()),
    )
  })
})

const filters = ref()

const initFilters = () => {
  filters.value = {
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    parentId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    summary: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO }],
    },
    duration: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO }],
    },
    tags: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FILTER_TAGS_CONTAIN }],
    },
  }
}

initFilters()

const clearFilter = () => {
  initFilters()
  filteredItems.value = events.value.length
}

const filteredItems = ref(events.value.length)

watch(
  () => props.events,
  (next) => {
    filteredItems.value = next.length
    initFilters()
  },
)

const onFilter = (event: DataTableFilterEvent) => {
  filteredItems.value = event.filteredValue ? event.filteredValue.length : events.value.length
}
</script>
