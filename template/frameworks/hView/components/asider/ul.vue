<template>
    <ul class="nav" :class="{'d-none':level!==1&&!look}">
        <hh-li @putInterest="getInterest" v-for="li in ul" :key="li.path" :li="li" :prefix="prefix?prefix+'/':''" :leftLevel="leftLevel" :level="level" :pre-look="look" :interest="interest"></hh-li>
    </ul>
</template>

<script>
export default {
  components: {
    'hh-li': () => import("./li")
  },
  data(){
    return{
      interest:""
    }
  },
  props: {
    ul: {
      type: Array,
      default: () => []
    },
    prefix: {
      type: String,
      default: () => ""
    },
    leftLevel: {
      type: Number,
      default: () => 1
    },
    level: {
      type: Number,
      default: () => 1
    },
    look: {
      type: Boolean,
      default: () => true
    }
  },
  methods:{
    getInterest(interest){
      this.interest = interest;
    }
  }
};
</script>
