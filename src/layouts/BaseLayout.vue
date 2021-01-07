<template>
    <div>
        <BaseBreadcrumbs :links="links" :pageTitle="pageTitle" :action-link="actionLink"/>
        <slot />
    </div>
</template>

<script>
import BaseBreadcrumbs from "./parts/BaseBreadcrumbs";

export default {
    name: "BaseLayout",
    components: {BaseBreadcrumbs},
    props: {
        pageTitle: {
            type: String,
            required: true
        },
        links: {
            type: Array,
            required: true
        },
        actionLink: {
            type: Object,
            required: false
        }
    }
}
</script>

<style scoped>

</style>