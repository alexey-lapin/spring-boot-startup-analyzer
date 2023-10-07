<template>
  <div class="">
    <TabMenu v-model:activeIndex="active" :model="items">
      <template #item="{ label, item, props }">
        <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
          <a
            :href="routerProps.href"
            v-bind="props.action"
            @click="($event) => routerProps.navigate($event)"
          >
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ label }}</span>
          </a>
        </router-link>
        <a v-else-if="item.url" :href="item.url" :target="item.target" v-bind="props.action">
          <span v-bind="props.icon" />
          <span v-bind="props.label">{{ label }}</span>
        </a>
      </template>
    </TabMenu>
  </div>
</template>

<script setup lang="ts">
import TabMenu from 'primevue/tabmenu'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const active = ref(0)

const items = [
  { label: 'Analyzer', icon: 'pi pi-search', route: '/' },
  {
    label: 'Usage',
    icon: 'pi pi-book',
    route: '/usage'
  },
  {
    label: 'GitHub',
    icon: 'pi pi-github',
    url: 'https://github.com/alexey-lapin/spring-boot-startup-analyzer',
    target: '_blank'
  },
  {
    label: 'About',
  }
]

watch(
  route,
  () => {
    active.value = items.findIndex((item) => route.path === router.resolve(item.route).path)
  },
  { immediate: true }
)
</script>