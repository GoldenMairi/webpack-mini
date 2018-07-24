<template>
    <div>
        <h1>git仓库:\{{repoList.length+'个'}}</h1>
        <ul>
          <li :key="repo.id" v-for="repo in repoList">
            <p>\{{repo.name}}------<img style="height:26px;width:auto;" :src="repo.owner.avatar_url" alt="People"></p>
          </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      repoList: []
    }
  },
  methods: {
    async getMap () {
      this.repoList = await ax('REP')
    }
  },
  mounted () {
    this.getMap()
  }
}
</script>

<style lang="scss">
</style>
