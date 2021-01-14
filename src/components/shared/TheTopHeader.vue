<template>
    <div class="top-header">
        <div class="app-name">
            <router-link to="/" class="text-decoration-none">flk dashboard</router-link>
        </div>
        <div class="header-details">
            <button @click="openNav()" class="btn btn-primary d-block d-md-none">nav</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheTopHeader",
    methods: {
        openNav () {
            this.$emit('openNav')
        }
    }
}
</script>

<style scoped>

</style>