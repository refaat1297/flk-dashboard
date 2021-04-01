<template>
    <div id="app">
        <TheTopHeader @openNav="showSmallNav = !showSmallNav" :showSmallNav="showSmallNav"  />
        
        <div class="page-content">
            <TheSideNav :lang="lang" @changeLang="changeLang()" :showSmallNav="showSmallNav" />

            <div class="content">
                <div class="content-overlay" @click="showSmallNav = !showSmallNav" :class="{'show-content-overlay': showSmallNav}"></div>
                <router-view />
            </div>
        </div>
        
<!--        <h2>footer</h2>-->
    </div>
</template>

<script>

import TheSiteFooter from "./components/shared/TheSiteFooter";
import TheSideNav from "./components/shared/TheSideNav";
import TheTopHeader from "./components/shared/TheTopHeader";

export default {
    name: "App",
    components: {TheTopHeader, TheSideNav, TheSiteFooter},
    data () {
        return {
            lang: null,
            showSmallNav: false
        }
    },
    created() {
        this.setTitle(this.$t('body.title'))

        this.lang = window.Ls.get('lang') ? window.Ls.get('lang') : 'en'
        
        if (this.lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl')
        } else {
            document.documentElement.setAttribute('dir', 'ltr')
        }
    },
    methods: {
        setTitle (title) {
            document.title = title
        },
        changeLang () {
            let lang = this.lang === 'en' ? 'ar' : 'en'
            window.Ls.set('lang', lang)
            window.location.reload()
        }
    }
}
</script>
