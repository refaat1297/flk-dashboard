<template>
    <nav class="side-nav" :class="{'show-small-nav': showSmallNav}">
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

        <div class="options">
            <div class="option" @click="changeLang()">
                <TranslateIcon />
                <span>{{ lang === 'en' ? 'ar' : 'en' }}</span>
            </div>
        </div>
    </nav>
</template>

<script>
import HomeIcon from "../icons/HomeIcon";
import UserIcon from "../icons/UserIcon";
import StarIcon from "../icons/StarIcon";
import UsersIcon from "../icons/UsersIcon";
import ChartIcon from "../icons/ChartIcon";
import SettingsIcon from "../icons/SettingsIcon";
import TranslateIcon from "../icons/TranslateIcon";

export default {
    name: "TheSideNav",
    components: {TranslateIcon, SettingsIcon, ChartIcon, UsersIcon, StarIcon, UserIcon, HomeIcon},
    props: ['lang', 'showSmallNav'],
    methods: {
        changeLang () {
            this.$emit('changeLang')
        }
    }
}
</script>

<style scoped>

</style>