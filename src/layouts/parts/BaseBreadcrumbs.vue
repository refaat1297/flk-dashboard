<template>
    <nav class="base-breadcrumbs">
        <div class="breadcrumbs-title">
            <h3>{{ pageTitle }}</h3>
            
            <router-link v-if="actionLink" :to="btnUrl" >
                <PlusIcon />
                <span>{{ actionLink.title }}</span>
            </router-link>
        </div>
        <ul class="list-unstyled">
            <li>
                <router-link to="/">{{ $t('body.home') }}</router-link>
            </li>
            <li v-if="links" v-for="link in links" :key="link.title">
                <span>/</span>
                <router-link :to="link">{{ link.title }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import PlusIcon from "../../components/icons/PlusIcon";
export default {
    name: "BaseBreadcrumbs",
    components: {PlusIcon},
    mounted() {
        console.log(this.$route.fullPath)
    },
    computed: {
        btnUrl () {
            return this.$route.fullPath + this.actionLink.link
        }
    },
    props: {
        links: {
            type: Array,
            required: false
        },
        pageTitle: {
            type: String,
            required: true
        },
        actionLink: {
            type: Object,
            required: false
        }
    }
}
</script>
