<template>
  <div class="space-y-6">
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <div
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-4 shadow-sm"
      >
        <p class="text-sm text-surface-500 dark:text-surface-400">Total Duration</p>
        <p class="text-2xl font-semibold tracking-tight">{{ formatMs(totalDurationMs) }}</p>
      </div>
      <div
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-4 shadow-sm"
      >
        <p class="text-sm text-surface-500 dark:text-surface-400">Startup Steps</p>
        <p class="text-2xl font-semibold tracking-tight">{{ totalSteps }}</p>
        <p class="text-xs text-surface-400">{{ formatMs(avgStepDuration) }} avg per step</p>
      </div>
      <div
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-4 shadow-sm"
      >
        <p class="text-sm text-surface-500 dark:text-surface-400">Config Parse</p>
        <p class="text-2xl font-semibold tracking-tight">{{ parseClassCount ?? '—' }}</p>
        <p class="text-xs text-surface-400">Configuration classes processed.</p>
      </div>
      <div
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-4 shadow-sm"
      >
        <p class="text-sm text-surface-500 dark:text-surface-400">Config Enhance</p>
        <p class="text-2xl font-semibold tracking-tight">{{ enhanceClassCount ?? '—' }}</p>
        <p class="text-xs text-surface-400">Classes proxied via CGLIB.</p>
      </div>
      <div
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-4 shadow-sm"
      >
        <p class="text-sm text-surface-500 dark:text-surface-400">Bean Instantiations</p>
        <p class="text-2xl font-semibold tracking-tight">{{ beanCount }}</p>
        <p class="text-xs text-surface-400">{{ slowBeanCount }} ≥ {{ beanThreshold }} ms</p>
      </div>
    </section>

    <section class="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <article
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-5 shadow-sm"
      >
        <header class="mb-3 flex items-center justify-between">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400">Top Startup Phases</p>
            <h2 class="text-xl font-semibold">Where time is spent</h2>
            <p class="text-xs text-surface-500 dark:text-surface-400">
              Uses cumulative time (duration field).
            </p>
          </div>
          <span class="text-xs text-surface-500 dark:text-surface-400"
            >Share of total duration</span
          >
        </header>
        <ul class="space-y-3">
          <li
            v-for="phase in topPhases"
            :key="phase.id"
            class="space-y-1"
          >
            <div class="flex items-center justify-between text-sm">
              <p class="font-medium">{{ phase.name }}</p>
              <span class="text-surface-500 dark:text-surface-400">
                {{ formatMs(phase.duration) }} · {{ formatPercent(phase.share) }}
              </span>
            </div>
            <div class="h-2 rounded-full bg-surface-200 dark:bg-surface-800">
              <div
                class="h-full rounded-full bg-primary"
                :style="{ width: formatBarWidth(phase.share) }"
              ></div>
            </div>
          </li>
          <li
            v-if="!topPhases.length"
            class="text-sm text-surface-500 dark:text-surface-400"
          >
            No phases detected; provide startup data to see the breakdown.
          </li>
        </ul>
      </article>

      <article
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-5 shadow-sm"
      >
        <header class="mb-3">
          <p class="text-sm text-surface-500 dark:text-surface-400">Insights</p>
          <h2 class="text-xl font-semibold">Quick takeaways</h2>
        </header>
        <ul class="space-y-3 text-sm">
          <li
            v-for="(item, index) in insights"
            :key="index"
            class="flex gap-2"
          >
            <span class="text-primary">•</span>
            <span>{{ item }}</span>
          </li>
          <li
            v-if="!insights.length"
            class="text-surface-500 dark:text-surface-400"
          >
            Load a trace to generate data-driven insights.
          </li>
        </ul>
      </article>
    </section>

    <section class="grid gap-4 lg:grid-cols-2">
      <article
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-5 shadow-sm"
      >
        <header class="mb-3">
          <p class="text-sm text-surface-500 dark:text-surface-400">Bottlenecks</p>
          <h2 class="text-xl font-semibold">Top 10 slowest startup steps</h2>
          <p class="text-xs text-surface-500 dark:text-surface-400">
            Self time for each step only.
          </p>
        </header>
        <div class="overflow-auto rounded-lg border border-surface-100 dark:border-surface-800">
          <table class="table-fixed w-full text-sm">
            <thead class="text-xs uppercase tracking-wide text-surface-500 dark:text-surface-400">
              <tr class="bg-surface-50 dark:bg-surface-900/40">
                <th class="w-1/12 py-2 pl-3 pr-2 text-left">ID</th>
                <th class="w-8/12 py-2 pr-2 text-left">Step</th>
                <th class="w-2/12 py-2 pr-2 text-left">Duration</th>
                <th class="w-1/12 py-2 pr-3 text-right">Share</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="step in topSteps"
                :key="step.id"
                class="border-t border-surface-200 dark:border-surface-800"
              >
                <td class="py-2 pl-3 pr-2 font-mono text-xs text-surface-500">{{ step.id }}</td>
                <td class="py-2 pr-2 font-medium text-surface-900 dark:text-surface-100">
                  <div
                    class="overflow-clip text-ellipsis truncate hover:break-all hover:overflow-visible hover:whitespace-normal"
                  >
                    <span :title="step.name">
                      {{ step.name }}
                    </span>
                  </div>
                </td>
                <td class="py-2 pr-2">{{ formatMs(step.duration) }}</td>
                <td class="py-2 pr-3 text-right">
                  {{ formatPercent(step.duration / totalDurationMs) }}
                </td>
              </tr>
              <tr v-if="!topSteps.length">
                <td
                  class="py-4 text-center text-surface-500 dark:text-surface-400"
                  colspan="4"
                >
                  Waiting for analysis data.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article
        class="rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-5 shadow-sm"
      >
        <header class="mb-3">
          <p class="text-sm text-surface-500 dark:text-surface-400">Bean Hotspots</p>
          <h2 class="text-xl font-semibold">
            Top 10 bean instantiations above {{ beanThreshold }} ms
          </h2>
          <p class="text-xs text-surface-500 dark:text-surface-400">
            Self time for each bean instantiation call.
          </p>
        </header>
        <div class="overflow-auto rounded-lg border border-surface-100 dark:border-surface-800">
          <table class="table-fixed w-full text-sm">
            <thead class="text-xs uppercase tracking-wide text-surface-500 dark:text-surface-400">
              <tr class="bg-surface-50 dark:bg-surface-900/40">
                <th class="w-1/12 py-2 pl-3 pr-2 text-left">Id</th>
                <th class="w-6/12 py-2 pl-3 pr-2 text-left">Bean</th>
                <th class="w-2/12 py-2 pr-2 text-left">Step</th>
                <th class="w-2/12 py-2 pr-2 text-left">Duration</th>
                <th class="w-1/12 py-2 pr-3 text-right">Share</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="bean in topBeanHotspots"
                :key="bean.id"
                class="border-t border-surface-200 dark:border-surface-800"
              >
                <td class="py-2 pl-3 pr-2 font-mono text-xs text-surface-500">{{ bean.id }}</td>
                <td class="py-2 pl-3 pr-2 font-medium text-surface-900 dark:text-surface-100">
                  <div
                    class="overflow-clip text-ellipsis truncate hover:break-all hover:overflow-visible hover:whitespace-normal"
                  >
                    <span :title="bean.beanName ?? 'Unnamed bean'">
                      {{ bean.beanName ?? 'Unnamed bean' }}
                    </span>
                  </div>
                </td>
                <td class="py-2 pr-2">
                  <div
                    class="overflow-clip text-ellipsis truncate hover:break-all hover:overflow-visible hover:whitespace-normal"
                  >
                    <span :title="bean.formattedStep">
                      {{ bean.formattedStep }}
                    </span>
                  </div>
                </td>
                <td class="py-2 pr-2">{{ formatMs(bean.duration) }}</td>
                <td class="py-2 pr-3 text-right">
                  {{ formatPercent(bean.duration / totalDurationMs) }}
                </td>
              </tr>
              <tr v-if="!topBeanHotspots.length">
                <td
                  class="py-4 text-center text-surface-500 dark:text-surface-400"
                  colspan="4"
                >
                  No bean instantiations exceeded {{ beanThreshold }} ms.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import type DataNode from '@/model/DataNode'
import type Event from '@/model/Event'
import { computed } from 'vue'

const props = defineProps<{
  events: Event[]
  nodes: DataNode[]
  totalDuration: number
}>()

const beanThreshold = 10

const getMaxTagValueForStep = (stepName: string, tagKey: string) => {
  let max: number | null = null
  props.events.forEach((event) => {
    if (event.name !== stepName) {
      return
    }
    event.tags.forEach((tag) => {
      if (tag.key === tagKey) {
        const value = Number(tag.value)
        if (!Number.isNaN(value)) {
          max = max === null ? value : Math.max(max, value)
        }
      }
    })
  })
  return max
}

const totalDurationMs = computed(() => props.totalDuration)
const totalSteps = computed(() => props.events.length)
const avgStepDuration = computed(() =>
  totalSteps.value === 0 ? 0 : totalDurationMs.value / totalSteps.value,
)

const topSteps = computed(() =>
  [...props.events]
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10)
    .map((item) => ({ ...item })),
)

const rootPhases = computed(() =>
  props.nodes.map((node) => ({
    id: node.data.id,
    name: node.data.name,
    duration: node.data.summary,
    share: totalDurationMs.value === 0 ? 0 : node.data.summary / totalDurationMs.value,
  })),
)

const topPhases = computed(() =>
  [...rootPhases.value].sort((a, b) => b.duration - a.duration).slice(0, 5),
)

const beanEvents = computed(() =>
  props.events.filter((event) => event.name.startsWith('spring.beans.')),
)

const beanCount = computed(() => beanEvents.value.length)

const slowBeanEvents = computed(() =>
  beanEvents.value.filter((event) => event.duration >= beanThreshold),
)

const slowBeanCount = computed(() => slowBeanEvents.value.length)

const topBeanHotspots = computed(() =>
  slowBeanEvents.value
    .map((event) => ({
      id: event.id,
      formattedStep: formatBeanStep(event.name),
      beanName: event.tags.find((tag) => tag.key === 'beanName')?.value,
      duration: event.duration,
    }))
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10),
)

const parseClassCount = computed(() =>
  getMaxTagValueForStep('spring.context.config-classes.parse', 'classCount'),
)

const enhanceClassCount = computed(() =>
  getMaxTagValueForStep('spring.context.config-classes.enhance', 'classCount'),
)

const insights = computed(() => {
  const list: string[] = []
  const topPhase = topPhases.value[0]
  if (topPhase) {
    list.push(`${topPhase.name} consumes ${formatPercent(topPhase.share)} of startup time.`)
  }
  const slowest = topSteps.value[0]
  if (slowest) {
    list.push(`${slowest.name} lasts ${formatMs(slowest.duration)} (self time).`)
  }
  if ((parseClassCount.value ?? 0) > 0) {
    list.push(`Configuration parsing processed ${parseClassCount.value} classes.`)
  }
  if ((enhanceClassCount.value ?? 0) > 0) {
    list.push(`CGLIB enhancement proxied ${enhanceClassCount.value} classes.`)
  }
  if (slowBeanCount.value > 0) {
    list.push(`${slowBeanCount.value} bean instantiations exceed ${beanThreshold} ms.`)
  }
  return list
})

const formatMs = (value: number) =>
  `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ms`

const formatPercent = (value: number) => {
  if (!Number.isFinite(value)) {
    return '0%'
  }
  return new Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 1 }).format(
    value,
  )
}

const formatBarWidth = (share: number) => `${Math.min(100, Math.max(share * 100, 2))}%`

const formatBeanStep = (name: string) => name.replace('spring.beans.', '')
</script>
