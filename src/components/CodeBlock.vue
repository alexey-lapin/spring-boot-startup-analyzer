<template>
  <div class="my-4 md:my-6">
    <Card>
      <template #header>
        <div
          class="flex items-center justify-between p-3 md:p-4 border-b border-surface-200 dark:border-surface-700"
        >
          <span class="text-xs md:text-sm font-medium text-muted-color uppercase tracking-wide">
            {{ language }}
          </span>
          <Button
            :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
            :label="copied ? 'Copied' : 'Copy'"
            size="small"
            text
            @click="copy(code)"
          />
        </div>
      </template>
      <template #content>
        <pre
          class="code-content"
        ><code :class="`language-${language}`" v-html="highlightedCode" /></pre>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Prism from 'prismjs'
// eslint-disable-next-line sort-imports
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-properties'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'

const { code = '', language = 'text' } = defineProps<{
  code: string
  language: string
}>()

const { copy, copied } = useClipboard()

const highlightedCode = computed(() => {
  if (!code || !language) return ''
  const grammar = Prism.languages[language]
  if (grammar) {
    return Prism.highlight(code, grammar, language)
  } else {
    console.warn(`Prism grammar not loaded for language '${language}'`)
    return code
  }
})
</script>

<style scoped>
:deep(.p-card) {
  border-radius: 0.5rem;
  overflow: hidden;
}

:deep(.p-card-content) {
  padding: 0;
}

.code-content {
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;
  background: #2d2d2d;
}

@media (min-width: 768px) {
  .code-content {
    padding: 1.5rem;
  }
}

.code-content code {
  font-size: 0.9rem;
  line-height: 1.65;
  background: transparent;
}
</style>
