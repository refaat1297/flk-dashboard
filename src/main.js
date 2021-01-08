import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



/* ------- vue validate ------- */

import Vuelidate from "vuelidate/src";
Vue.use(Vuelidate)

/* ------- vue validate ------- */


/* ------- services ------- */

import Ls from './services/ls'
window.Ls = Ls

/* ------- services ------- */



/* ------- plugins ------- */            

import i18n from './plugins/i18n'
window.i18n = i18n


window.toastr = require('toastr')
window.toastr.options.progressBar = true;
window.toastr.options.hideDuration = 600;

if (window.Ls.get('lang') === 'ar') {
    toastr.options.rtl = true;
}

/* ------- plugins ------- */



/* ------- bootstrap ------- */   

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/main.scss'

/* ------- bootstrap ------- */   




/* ------- global components ------- */

import Multiselect from "vue-multiselect";
import 'vue-multiselect/dist/vue-multiselect.min.css'
Vue.component('multiselect', Multiselect)

import BaseLayout from "./layouts/BaseLayout";
Vue.component('base-layout', BaseLayout)

/* ------- global components ------- */   




Vue.config.productionTip = false



new Vue({
	router,
    store,
    i18n,
	render: h => h(App)
}).$mount('#app')