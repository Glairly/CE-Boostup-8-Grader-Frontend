import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Plugin
import "prismjs";
import "prismjs/themes/prism-twilight.css";

import VueCodemirror from 'vue-codemirror'
import VueParticles from 'vue-particles'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './css/animation.css'
import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
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