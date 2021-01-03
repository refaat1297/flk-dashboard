import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



/* ------- plugins ------- */            

import i18n from './plugins/i18n'
window.i18n = i18n

/* ------- plugins ------- */   



/* ------- services ------- */            

import Ls from './services/ls'
window.Ls = Ls

/* ------- services ------- */   



/* ------- bootstrap ------- */   

import 'bootstrap/dist/css/bootstrap.min.css'

/* ------- bootstrap ------- */   




Vue.config.productionTip = false



new Vue({
	router,
    store,
    i18n,
	render: h => h(App)
}).$mount('#app')