import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Ls from '@/services/ls'

import en from './en.json'
import ar from './ar.json'



Vue.use(VueI18n)


const i18n = new VueI18n({
    locale: Ls.get('lang'),
    messages: {
        ar,
        en
    }
})


export default i18n