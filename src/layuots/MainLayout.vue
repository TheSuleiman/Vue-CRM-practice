<template>
  <div>
    <loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <the-navbar @toggle="isOpen = !isOpen"/>

      <the-sidebar v-model:modelvalue="isOpen"/>

      <main class="app-content" :class="{full: isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/app/TheNavbar";
import TheSidebar from "@/components/app/TheSidebar";
import messages from "@/utils/messages";

export default {
  name: "MainLayout",
  components: {TheNavbar, TheSidebar},
  data: () => ({
    isOpen: false,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<style scoped>

</style>