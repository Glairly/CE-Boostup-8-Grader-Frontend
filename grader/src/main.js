import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Plugin

import VueCodemirror from 'vue-codemirror'
import VueParticles from 'vue-particles'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './css/animation.css'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror)
Vue.use(VueParticles)
Vue.use(VueAxios, axios)


Vue.config.productionTip = false



new Vue({
    vuetify,
    router,
    VueCodemirror,
    store, // vuex store
    render: h => h(App)
}).$mount('#app')