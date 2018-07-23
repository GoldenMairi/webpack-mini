<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <h3 @click="toLogin"><a>登录</a></h3>
    <p v-if="$route.query.redirect">will to path:\{{$route.query.redirect}}</p>
  </div>
</template>

<script>
import {LOGIN} from '@/store/types'
import {mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Your May Press Login(Btn)'
    }
  },
  methods: {
    ...mapActions([LOGIN]),
    toLogin () {
      this.login({userName: 'admin', password: '5a385be37520b62af6cfccfa440485b7'}).then(
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
