<template>
  <ul class="sidenav app-sidenav" :class="{open: !modelvalue}">

    <li>
      <router-link
          v-for="link in links"
          :key="link.url"
          :to="link.url"
          active-class="active"
          class="waves-effect waves-orange pointer"
      >
        {{link.title}}
      </router-link>
    </li>


  </ul>

</template>

<script>
export default {
  name: "TheSidebar",
  props: ['modelvalue'],
  data: () => ({
    links: [
      {title: 'Счёт', url: '/'},
      {title: 'История', url: '/history'},
      {title: 'Планирование', url: '/planning'},
      {title: 'Новая запись', url: '/record'},
      {title: 'Категории', url: '/categories'}
    ],
  })
}
</script>

<style scoped>

</style>