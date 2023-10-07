<template>
  <div
    v-for="tag in props.tags"
    class="border-1 border-300 border-round hover:border-500 p-1 long-body"
  >
    <span>{{ tag.key }}: {{ tag.value }}</span>
  </div>
</template>

<script setup lang="ts">
import type Tag from '@/model/Tag'

const props = defineProps<{
  tags: Tag[]
}>()
</script>

<style scoped>
.long-body {
  overflow: clip;
  text-overflow: ellipsis;
}

.long-body:hover {
  word-break: break-all;
}
</style>
