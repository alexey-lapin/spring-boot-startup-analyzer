<template>
  <div class="flex w-full flex-col gap-1">
    <div
      v-for="tag in props.tags"
      :key="tag.key"
      :class="[
        'border',
        'border-surface-400',
        'hover:border-surface-500',
        'p-1',
        'rounded',
        'overflow-clip',
        'text-ellipsis',
        'truncate',
        'max-w-full',
        'w-full',
        'hover:break-all',
        'hover:overflow-visible',
        'hover:whitespace-normal',
      ]"
    >
      <span>{{ tag.key }}: {{ tag.value }}</span>
    </div>
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
