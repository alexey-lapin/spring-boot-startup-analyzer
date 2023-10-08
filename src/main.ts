import './assets/main.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import App from './App.vue'
import router from './router'

createApp(App)
  .use(ToastService)
  .use(createPinia())
  .use(router)
  .use(PrimeVue, { ripple: true })
  .directive('tooltip', Tooltip)
  .mount('#app')
