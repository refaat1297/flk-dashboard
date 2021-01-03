<template>
    <div class="home">
        <h2 class="alert alert-danger">{{ $t('navigation.dashboard', { locale: 'ar' }) }}</h2>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";


export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  created () {
      console.log(localStorage.getItem('lang'))
  }
};
</script>
