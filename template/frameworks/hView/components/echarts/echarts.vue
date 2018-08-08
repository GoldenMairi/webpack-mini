<template>
	<div class="h-100" style="overflow: hidden;" v-resize="resize"></div>
</template>

<script>
import resize from "../../directives/resize";
import echarts from "echarts";
let myChart;
export default {
  props: {
    option: Object
  },
  directives: {
    resize
  },
  methods: {
    resize() {
      this.option && myChart.resize();
    },
    init() {
      myChart = echarts.init(this.$el);
      this.option && myChart.setOption(this.option);
    }
  },
  watch: {
    option(now, old) {
      if (JSON.stringify(now) != JSON.stringify(old)) {
        echarts.dispose(this.$el);
        this.init();
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>