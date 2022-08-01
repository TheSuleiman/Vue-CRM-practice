<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: v$.name.$dirty && v$.name.required.$invalid}"
        >
        <label for="description">Имя</label>
        <span class="helper-text invalid" v-if="v$.name.$dirty && v$.name.required.$invalid">Введите имя</span>
      </div>


      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useMeta} from 'vue-meta'


export default {
  name: "ProfileView",
  setup() {
    useMeta({ title: 'Профиль'})
    return {v$: useVuelidate()}
  },
  validations: {
    name: {required}
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  computed: {
    ...mapGetters(['info'])
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>