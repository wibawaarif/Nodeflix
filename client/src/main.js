import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router/router';
import state from './store/state';
import mutations from './store/mutations';
import getters from './store/getters';
import actions from './store/actions';
import 'bootstrap/dist/css/bootstrap.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const store = createStore({
  state,
  mutations,
  getters,
  actions,
})

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
