

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

    const route = useRoute()
</script>
