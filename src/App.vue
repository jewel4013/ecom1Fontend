

<template>
  <!-- admin পেজের নিজের header/footer আছে, তাই BaseLayout লাগবে না -->
  <router-view v-if="route.meta.adminLayout"></router-view>
  <BaseLayout v-else>
    <router-view></router-view>
  </BaseLayout>

</template>

<script setup>
    import { useRoute } from 'vue-router';
    import BaseLayout from './components/layout/baseLayout.vue';
    import { onMounted, onUnmounted } from 'vue';
    import Vue3Toastify from 'vue3-toastify';

    const toast = Vue3Toastify.toast;

    const route = useRoute()

    onMounted(() => {
      window.Echo.channel('text-channel')
      .listen('TestMessageEvent', (e) => {
        toast.success(e.message)
      })
    })

    onUnmounted(() => {
      window.Echo.leave('text-channel')
    })    



</script>
