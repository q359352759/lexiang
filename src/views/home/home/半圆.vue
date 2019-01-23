<template>
    <!-- <canvas ref="canvas" :height="height+'px'" :width="width+'px'"></canvas> -->
	<canvas ref="canvas" width="375px" height="20px" style="width:100%;height:100%"></canvas>

</template>

<script>
export default {
  name: "",
  data() {
    return {
      width: ""
    };
  },
  mounted() {
    var width = 375;
    var height = 20;
    var canvas = this.$refs.canvas;
    var ctx = canvas.getContext("2d");
    ctx.moveTo(0, height);
    ctx.quadraticCurveTo(width / 2, -height, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
};
</script>

<style lang="scss" scoped>
canvas {
  display: block;
}
</style>
