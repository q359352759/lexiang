<template>
    <canvas ref="canvas" width="84px" height="84px" style="width:42px;height:42px;"></canvas>
</template>

<script>
export default {
  name: "",
  props: {
    bili: {
      default: 0
    },
    max: {
      default: 0
    },
    lingqu: {
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // console.log(this.bili);
    var w = 84;
    var width = 80;
    var height = 80;
    // var canvas=document.getElementById('canvas');
    var canvas = this.$refs.canvas;
    var context = canvas.getContext("2d");
    context.lineWidth = 4;
    var 比例 = 0;
    if (this.max) {
      比例 = this.lingqu ? this.lingqu / this.max : 0;
    } else {
      比例 = this.lingqu
        ? this.lingqu / 300 > 0.98
          ? 0.98
          : this.lingqu / 300
        : 0;
    }
    // console.log(this.lingqu,this.max,比例)

    context.beginPath();
    context.arc(
      w / 2,
      w / 2,
      width / 2,
      Math.PI * 0.5 + 0.4,
      Math.PI * 2.5 - 0.4,
      false
    );
    context.strokeStyle = "#F0F0F0";
    context.stroke();

    context.beginPath();
    // console.log(Math.PI*2.5-0.4,Math.PI*0.5+0.4+(Math.PI*2-0.8)*比例,Math.PI*0.5+0.4)
    // Math.PI*2.5-0.4
    context.arc(
      w / 2,
      w / 2,
      width / 2,
      Math.PI * 0.5 + 0.4,
      Math.PI * 0.5 + 0.4 + (Math.PI * 2 - 0.8) * 比例,
      false
    );
    context.strokeStyle = "#dd7951";
    context.stroke();

    context.beginPath();
    context.font = "20px Arial";
    context.fillStyle = "#FF5733";
    context.textAlign = "center";
    context.textBaseline = "bottom";
    context.fillText("已领取", w / 2, w / 2);
    context.stroke();

    context.beginPath();
    context.font = "20px Arial";
    context.fillStyle = "#FF5733";
    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillText(Math.floor(比例 * 100) + "%", w / 2, w / 2);
    context.stroke();
  }
};
</script>

<style lang="scss" scoped>
canvas {
  display: block;
}
</style>
