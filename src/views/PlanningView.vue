<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ $filters.currencyFilter(info.bill) }}</h4>
    </div>

    <loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ $filters.currencyFilter(cat.spent) }} из {{ $filters.currencyFilter(cat.limit) }}
        </p>
        <div class="progress">
          <div class="determinate" :class="cat.progressColor" :style="{width: cat.progressPercent + '%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import {mapGetters} from "vuex";
import {useMeta} from "vue-meta";

export default {
  name: "PlanningView",
  components: {Loader},
  setup() {
    useMeta({ title: 'Планирование'})
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {

    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')


    this.categories = categories.map(cat => {
      const spent = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)

      const percent = 100 * spent / cat.limit
      const progressPercent = 100 < percent ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      return {...cat, progressPercent, progressColor, spent}
    })

    this.loading = false
  }
}
</script>

<style scoped>

</style>