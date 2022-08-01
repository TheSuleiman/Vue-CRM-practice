<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading"/>

    <div v-else class="row">

      <home-bill :rates="currency.rates"/>

      <home-currency :rates="currency.rates" :date="currency.date"/>
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
import Loader from "@/components/app/Loader";
import {useMeta} from "vue-meta";
export default {
  name: 'HomeView',
  components: {Loader, HomeBill, HomeCurrency},
  setup() {
    useMeta({ title: 'Счет'})
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>
