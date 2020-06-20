import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
import VueCookies from 'vue-cookies'
//import question from './modules/question';
import user from './modules/user';


Vue.use(Vuex);
Vue.use(VueCookies);

const debug = process.env.NODE_ENV !== 'production';

const vuexCookie = new VuexPersistence({
    restoreState: (key) => VueCookies.get(key),
    saveState: (key, state) =>
        VueCookies.set(key, state, '1d'), // timeout set to 1 day

})


export default new Vuex.Store({
    state: {
        // usage console.log(this.$store.state.apiToken)
        api: "",
        compiler: ""

    },
    mutations: {
        // usage this.$store.commit('setAPiToken',param1)
        setApiPath(state, dev) {
            if (dev) {
                state.api = " " // point to localhost
                state.compiler = " "
            } else {
                state.api = "https://deno.everythink.dev"
                state.compiler = "https://bug.everythink.dev"
            }
        }
    },
    modules: {
        //question
        user
    },
    strict: debug,
    plugins: [vuexCookie.plugin]
})