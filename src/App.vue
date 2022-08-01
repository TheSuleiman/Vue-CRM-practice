<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | Vue CRM Practice` : `Vue CRM Practice` }}</template>
  </metainfo>
<div id="app">
  <component :is="layout">
  <router-view />

  </component>
</div>
</template>

<script>
import EmptyLayout from "@/layuots/EmptyLayout";
import MainLayout from "@/layuots/MainLayout";
import { useMeta } from 'vue-meta'

export default {
  setup () {
    useMeta({
      title: '',
      htmlAttrs: { lang: 'en', amp: true }
    })
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
   components: {EmptyLayout, MainLayout}
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.css";
@import "assets/index.css";
</style>
