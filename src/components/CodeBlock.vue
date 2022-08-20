<template>
  <prism-editor
    class="my-editor"
    :modelValue="code"
    :highlight="highlighter"
    :readonly="true"
    line-numbers
  ></prism-editor>
</template>

<script setup lang="ts">
import { PrismEditor } from "vue-prism-editor";

import { highlight, languages } from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-properties";

import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs/themes/prism-tomorrow.css";

const props = defineProps({
  code: String,
  language: String,
});

function highlighter(code: string): string {
  const language = props.language as string;
  return highlight(code, languages[language], language);
}
</script>

<style>
/* required class */
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}
</style>
