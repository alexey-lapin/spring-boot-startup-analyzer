<template>
  <header
    class="bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 shadow-sm"
  >
    <Menubar
      :model="menuItems"
      class="border-none bg-transparent"
    >
      <template #start>
        <div class="flex items-center gap-2 mr-4">
          <i class="pi pi-bolt text-primary text-xl"></i>
          <span class="font-semibold text-lg hidden sm:inline">Spring Boot Startup</span>
        </div>
      </template>
      <template #item="{ item, label }">
        <RouterLink
          v-if="item.route"
          v-slot="{ navigate, isActive }"
          :to="item.route"
          custom
        >
          <Button
            :label="typeof label === 'function' ? label() : label"
            :icon="item.icon"
            text
            :severity="isActive ? 'primary' : 'secondary'"
            @click="navigate"
          />
        </RouterLink>
        <a
          v-else-if="item.url"
          :href="item.url"
          :target="item.target"
        >
          <Button
            plain
            text
          >
            <div class="flex items-center gap-2">
              <i :class="item.icon" />
              <span>{{ item.label }}</span>
              <i class="pi pi-external-link" />
            </div>
          </Button>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            text
            @click="toggleDark()"
          />
        </div>
      </template>
    </Menubar>
  </header>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'

const isDark = useDark({ selector: 'html', attribute: 'class', valueDark: 'dark' })
const toggleDark = useToggle(isDark)

const menuItems = ref([
  {
    label: 'Analyzer',
    icon: 'pi pi-search',
    route: '/',
  },
  {
    label: 'Usage',
    icon: 'pi pi-book',
    route: '/usage',
  },
  {
    label: 'Github',
    icon: 'pi pi-github',
    url: 'https://github.com/alexey-lapin/spring-boot-startup-analyzer',
    target: '_blank',
  },
])
</script>
