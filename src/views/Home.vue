<template>
    <div class="home">
        <h2 class="alert alert-danger">{{ $t('navigation.dashboard') }}</h2>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";


export default {
    name: "Home",
    components: {
        HelloWorld,
    }
};
</script>
