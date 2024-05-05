import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store/store'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexChart', VueApexCharts)
import VueNumeralFilterInstaller from 'vue-numeral-filter';

Vue.use(VueNumeralFilterInstaller);

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

Vue.use(VueQuillEditor)

Vue.config.productionTip = false
import './app.css'
import './axios'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
