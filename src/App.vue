<script lang="ts">
import {RouterView} from 'vue-router'
import SiteHeader from "@/components/header/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {
    SiteFooter,
    SiteHeader,
    RouterView
  },
});
</script>

<template>
  <SiteHeader/>
  <RouterView/>
  <SiteFooter/>
</template>

<style>
</style>
