<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <h3 @click="toLogin"><a>登录</a></h3>
    will to path:\{{wantPath}}
  </div>
</template>

<script>
import {LOGIN, SET_WANT_PATH} from '@/store/types'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Your May Press Login(Btn)'
    }
  },
  computed: mapState(['wantPath']),
  methods: {
    ...mapMutations([SET_WANT_PATH]),
    ...mapActions([LOGIN]),
    toLogin () {
      this.login({userName: 'admin', password: '5a385be37520b62af6cfccfa440485b7'}).then(
        () => {
          this.$router.push(this.wantPath || '/')
          this.setWantPath(null)
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
