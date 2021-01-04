<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        
        <select class="form-control" v-model="lang" @change="changeLang()">
            <option value="ar">Ar</option>
            <option value="en">En</option>
        </select>
        
        <router-view/>
    </div>
</template>

<script>

export default {
    name: "App",
    data () {
        return {
            lang: null
        }
    },
    created() {
        this.lang = window.Ls.get('lang')
    },
    methods: {
        changeLang () {
            window.Ls.set('lang', this.lang)
            window.location.reload()
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
