<template>
    <div id="app">
<!--        <label>-->
<!--            <select class="form-control" v-model="lang" @change="changeLang()">-->
<!--                <option value="ar">Ar</option>-->
<!--                <option value="en">En</option>-->
<!--            </select>-->
<!--        </label>-->
        <div class="top-header">
            <h1>top header</h1>  
        </div>
        
        <div class="page-content">
            <nav class="side-nav">
                <ul class="list-unstyled">
                    <li>
                        <router-link :to="{name: 'Dashboard'}" class="active">
                            <HomeIcon />
                            <span>{{ $t('navigation.dashboard') }}</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="{name: 'Customers'}">
                            <UserIcon />
                            <span>{{ $t('navigation.customers') }}</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="{name: 'Items'}">
                            <StarIcon />
                            <span>{{ $t('navigation.items') }}</span>
                        </router-link>
                    </li>

                    <li class="list-divider"></li>
                    
                    <li>
                        <router-link :to="{name: 'Users'}">
                            <UsersIcon />
                            <span>{{ $t('navigation.users') }}</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="{name: 'Reports'}">
                            <ChartIcon />
                            <span>{{ $t('navigation.reports') }}</span>
                        </router-link>
                    </li>

                    <li>
                        <router-link :to="{name: 'Settings'}">
                            <SettingsIcon />
                            <span>{{ $t('navigation.settings') }}</span>
                        </router-link>
                    </li>
                </ul>
            </nav>

            <div class="content">
                <router-view />
            </div>
        </div>
        
<!--        <h2>footer</h2>-->
    </div>
</template>

<script>

import TheSiteFooter from "./components/shared/TheSiteFooter";
import HomeIcon from "./components/icons/HomeIcon";
import UserIcon from "./components/icons/UserIcon";
import StarIcon from "./components/icons/StarIcon";
import UsersIcon from "./components/icons/UsersIcon";
import ChartIcon from "./components/icons/ChartIcon";
import SettingsIcon from "./components/icons/SettingsIcon";
export default {
    name: "App",
    components: {SettingsIcon, ChartIcon, UsersIcon, StarIcon, UserIcon, HomeIcon, TheSiteFooter},
    data () {
        return {
            lang: null
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
            window.Ls.set('lang', this.lang)
            window.location.reload()
        }
    }
}
</script>
