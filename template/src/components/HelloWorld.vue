<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <input type="text" v-model="token" placeholder="Github Personal Token">
    <h3 @click="toLogin"><a>登录</a><span v-if="$route.query.redirect">:\{{$route.query.redirect}}</span></h3>
    <a href="https://github.com/settings/tokens/new" target="_blank">generate your token</a>
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
h1, h2 ,h3{
  font-weight: normal;
}
</style>
