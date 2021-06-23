<template>
  <TreeTable
    v-if="isAnalyzed"
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
          :loading="isExpanding"
          v-tooltip.top="'it may take some time'"
          class="p-mr-1"
        />
        <Button
          type="button"
          icon="pi pi-minus"
          label="Collapse All"
          @click="collapseAll"
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
    <Column v-if="isColumnSelected('Tags')" field="tags" header="Tags">
      <template #body="slotProps">
        <DataTable
          v-if="slotProps.node.data.tags.length > 0"
          :value="slotProps.node.data.tags"
          class="p-datatable-sm"
          showGridlines
        >
          <Column field="key" headerStyle="display: none"></Column>
          <Column field="value" headerStyle="display: none"></Column>
        </DataTable>
      </template>
    </Column>
  </TreeTable>
</template>

<script lang="ts">
import Event from "@/model/Event";
import Button from "primevue/button";
import TreeTable from "primevue/treetable";
import DataTable from "primevue/datatable";
import MultiSelect from "primevue/multiselect";
import Column from "primevue/column";
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";
import TreeNode from "@/model/TreeNode";

@Options({
  components: {
    Button,
    TreeTable,
    Column,
    DataTable,
    MultiSelect,
  },
  computed: {
    ...mapGetters(["events", "nodes", "isAnalyzed"]),
  },
})
export default class AnalysisTree extends Vue {
  events!: Event[];
  nodes!: TreeNode[];
  isAnalyzed!: boolean;

  isExpanding = false;
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
