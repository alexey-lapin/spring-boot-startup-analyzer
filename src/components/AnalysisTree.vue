<template>
  <TreeTable
    :value="eventsStore.nodes"
    :expandedKeys="expandedKeys"
    class="p-treetable-sm"
    :resizableColumns="true"
    showGridlines
  >
    <template #header>
      <div class="flex">
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
          class="p-button-outlined mr-1"
        />
        <Button
          type="button"
          icon="pi pi-minus"
          label="Collapse All"
          @click="collapseAll"
          class="p-button-outlined"
        />
      </div>
    </template>
    <Column
      field="id"
      header="Id"
      :expander="true"
      headerStyle="width: 16em"
    ></Column>
    <Column
      v-if="isColumnSelected('ParentId')"
      field="parentId"
      header="ParentId"
    ></Column>
    <Column v-if="isColumnSelected('Step')" field="name" header="Step"></Column>
    <Column
      v-if="isColumnSelected('Summary')"
      field="summary"
      header="Summary"
      headerStyle="width: 5em"
    ></Column>
    <Column
      v-if="isColumnSelected('Duration')"
      field="duration"
      header="Duration"
      headerStyle="width: 5em"
    ></Column>
    <!-- <Column
      v-if="isColumnSelected('Percentage')"
      field="percentage"
      header="Percentage"
      headerStyle="width: 5em"
    ></Column> -->
    <Column v-if="isColumnSelected('Tags')" field="tags" header="Tags">
      <template #body="slotProps">
        <TagsTable :row="slotProps.node" />
      </template>
    </Column>
  </TreeTable>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Column from "primevue/column";
import MultiSelect from "primevue/multiselect";
import TreeTable from "primevue/treetable";
import { ref } from "vue";

import TagsTable from "@/components/TagsTable.vue";
import { useEventsStore } from "@/store/EventsStore";

const eventsStore = useEventsStore();

const columns: ColumnDescriptor[] = [
  { header: "ParentId" },
  { header: "Step" },
  { header: "Summary" },
  { header: "Duration" },
  { header: "Tags" },
];

const expandedKeys = ref({} as Record<string, boolean>);
const selectedColumns = ref(
  columns.filter((item: ColumnDescriptor) => item.header !== "ParentId")
);

function isColumnSelected(name: string): boolean {
  return (
    selectedColumns.value.find((item) => item.header === name) !== undefined
  );
}

function expandAll(): void {
  eventsStore.events.forEach((item) => (expandedKeys.value[item.id] = true));
}

function collapseAll(): void {
  expandedKeys.value = {};
}

interface ColumnDescriptor {
  header: string;
}
</script>
