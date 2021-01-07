<template>
    <base-layout :links="breadcrumbLinks" :pageTitle="pageTitle" :actionLink="actionLink">
        <h1>item page hello from the other side</h1>
        <div></div>
    </base-layout>
</template>

<script>
export default {
    name: "Items",
    data () {
        return {
            pageTitle: this.$t('items.listPage.title'),
            breadcrumbLinks: [
                {
                    link: '/items',
                    title: this.$t('items.listPage.title')
                }
            ],
            actionLink: {
                title: this.$t('items.listPage.addBtn'),
                link: "/add"
            }
        }
    }
}
</script>

<style scoped>

</style>