<template>
    <ul class="nav">
        <hh-li v-for="li in ul" :key="li.path" :li="li" :prefix="prefix?prefix+'/':''" :level="level" :father="father"></hh-li>
    </ul>
</template>

<script>
export default {
  props: {
    ul: {
      type: Array,
      default: () => []
    },
    prefix: {
      type: String,
      default: () => ""
    },
    level: {
      type: Number,
      default: () => 1
    },
    father: {
      type: Boolean,
      default: () => true
    }
  }
};
</script>
