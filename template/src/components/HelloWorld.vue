<template>
  <div class="container">
    <div class="row">
      <form class="col-md-6 offset-md-3 text-center" action="">
        <img class="mb-4" src="../assets/logo.png" alt="Logo" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input v-model="token" class="form-control" placeholder="Git Personal Token">
        <div v-if="$route.query.redirect">You will goto <span class="text-warning">\{{$route.query.redirect}}</span></div>
        <button @click="toLogin" class="btn btn-lg btn-primary btn-block mt-2" type="submit">Sign in</button>
        <a class="btn btn-lg btn-info btn-block" href="https://github.com/settings/tokens/new" target="_blank">Generate Your Token</a>
      </form>
    </div>
  </div>
</template>

<script>
import {LOGIN} from '@/store/types'
import {mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      token: '14bcfc906120cd4afff8d905a6850740822ad135378',
      msg: 'Your May Press Login(Btn)'
    }
  },
  methods: {
    ...mapActions([LOGIN]),
    toLogin () {
      this.login(this.token).then(
        () => {
          this.$router.push(this.$route.query.redirect || '/')
        },
        ({msg}) => {
          console.error(msg)
        }
      )
    }
  }
}
</script>

<style lang="scss">
</style>
