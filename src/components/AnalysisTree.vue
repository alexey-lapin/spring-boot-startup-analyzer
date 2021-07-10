<template>
  <TreeTable
    :value="nodes"
    :expandedKeys="expandedKeys"
    class="p-treetable-sm"
    :resizableColumns="true"
    showGridlines
  >
    <template #header>
      <div class="p-d-flex">
        <MultiSelect
          v-model="selectedColumns"
          :options="columns"
          optionLabel="header"
          placeholder="Select Columns"
          class="p-mr-auto"
        />
        <Button
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          @click="expandAll"
          v-tooltip.top="'it may take some time'"
          class="p-button-outlined p-mr-1"
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

<script lang="ts">
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import MultiSelect from "primevue/multiselect";
import TreeTable from "primevue/treetable";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

import TagsTable from "@/components/TagsTable.vue";
import Event from "@/model/Event";
import TreeNode from "@/model/TreeNode";

@Options({
  components: {
    Button,
    Column,
    DataTable,
    MultiSelect,
    TagsTable,
    TreeTable,
  },
  computed: {
    ...mapGetters(["events", "nodes"]),
  },
})
export default class AnalysisTree extends Vue {
  events!: Event[];
  nodes!: TreeNode[];
  isAnalyzed!: boolean;

  expandedKeys: Record<string, boolean> = {};

  columns: ColumnDescriptor[] = [
    { header: "ParentId" },
    { header: "Step" },
    { header: "Summary" },
    { header: "Duration" },
    { header: "Tags" },
  ];

  selectedColumns: ColumnDescriptor[] = this.columns.filter(
    (item: ColumnDescriptor) => item.header !== "ParentId"
  );

  isColumnSelected(name: string): boolean {
    return (
      this.selectedColumns.find((item) => item.header === name) !== undefined
    );
  }

  expandAll(): void {
    this.events.forEach((item) => (this.expandedKeys[item.id] = true));
  }

  collapseAll(): void {
    this.expandedKeys = {};
  }
}

interface ColumnDescriptor {
  header: string;
}
</script>
