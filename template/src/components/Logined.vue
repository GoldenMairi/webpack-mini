<template>
    <div>
        <h1 class="custom-element">git仓库:\{{repoList.length+'个'}}</h1>
        <ul>
          <li :key="repo.id" v-for="repo in repoList">
            <a :href="repo.svn_url" target="_blank">\{{repo.name}}</a>------<img :src="repo.owner.avatar_url" alt="People">
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
      this.repoList = await {{axiosAlias}}('REP')
    }
  },
  mounted () {
    this.getMap()
  }
}
</script>

<style lang="scss">
</style>
