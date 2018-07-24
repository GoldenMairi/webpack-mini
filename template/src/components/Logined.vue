<template>
    <div>
        <h1>登录可进页面</h1>
        <h3 @click="getMap">MAP:\{{mapnum}}</h3>
    </div>
</template>

<script>
export default {
  data () {
    return {
      mapnum: 0
    }
  },
  methods: {
    getMap () {
      {{axiosAlias}}('MAP', {area_id: 0}).then(res => {
        this.mapnum = res.data.length
      })
    }
  }
}
</script>

<style lang="scss">
</style>
