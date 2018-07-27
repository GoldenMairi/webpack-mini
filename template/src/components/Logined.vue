<template>
    <div>
      <h3 class="text-primary text-center">仓库数：\{{repoList.length}}</h3>
        <div class="container">
          <ul>
            <li class="media" :key="repo.id" v-for="repo in repoList">
              <img style="width:62px;" class="align-self-start mr-3" :src="repo.owner.avatar_url" alt="People">
              <div class="media-body">
                <h5 class="mb-3"><a :href="repo.svn_url" target="_blank">{{repo.name}}</a></h5>
                {{repo.description}}
              </div>
            </li>
          </ul>
        </div>
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
