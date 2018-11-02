<template>
<div>
    <div>裁剪测试</div>

		<div class="wrapper zhengmian" v-show="option.img!=''">
		<VueCropper
		ref="cropper"
		:img="option.img"
		:outputSize="option.size"
		:outputType="option.outputType"
		:info="true"
		:full="option.full"
		:canMove="option.canMove"
		:fixedBox="option.fixedBox"
        :canMoveBox="option.canMoveBox"
        :autoCrop="true"
        :autoCropWidth="200"
        :autoCropHeight="200"
		></VueCropper>

		</div>
		<div class="test-button">
			<button @click="changeImg" class="btn">changeImg</button>
			<label class="btn" for="uploads">upload</label>
			<input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
			<button @click="startCrop" v-if="!crap" class="btn">start</button>
			<button @click="stopCrop" v-else class="btn">stop</button>
			<button @click="clearCrop" class="btn">clear</button>
			<!-- <button @click="refreshCrop" class="btn">refresh</button> -->
			<button @click="changeScale(1)" class="btn">+</button>
			<button @click="changeScale(-1)" class="btn">-</button>
			<button @click="rotateLeft" class="btn">rotateLeft</button>
			<button @click="rotateRight" class="btn">rotateRight</button>
			<button @click="finish('base64')" class="btn">preview(base64)</button>
			<button @click="finish('blob')" class="btn">preview(blob)</button>
			<a @click="down('base64')" class="btn">download(base64)</a>
			<a @click="down('blob')" class="btn">download(blob)</a>
			<div style="display:block; width: 100%;">
				<label class="c-item">
					<span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
					<input type="checkbox" v-model="option.original">
				</label>
				<label class="c-item">
					<span>能否拖动图片</span>
					<input type="checkbox" v-model="option.canMove">
				</label>
				<label class="c-item">
					<span>能否拖动截图框</span>
					<input type="checkbox" v-model="option.canMoveBox">
				</label>
				<label class="c-item">
					<span>截图固定大小</span>
					<input type="checkbox" v-model="option.fixedBox">
				</label>
				<label class="c-item">
					<span>是否输出原图比例的截图</span>
					<input type="checkbox" v-model="option.full">
				</label>
				<p>输出图片格式</p>
				<label class="c-item">
					<label>jpg  <input type="radio" name="type" value="jpeg" v-model="option.outputType"></label>
					<label>png  <input type="radio" name="type" value="png" v-model="option.outputType"></label>
					<label>webp <input type="radio" name="type" value="webp" v-model="option.outputType"></label>
				</label>
			</div>
		</div>
		<div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
			<div :style="previews.div">
				<img :src="previews.url" :style="previews.img">
			</div>
		</div>
        </div>
	</template>
	<script>
import { VueCropper } from "vue-cropper";

export default {
  data: function() {
    return {
      crap: false,
      previews: {},
      lists: [
        {
          img: "https://fengyuanchen.github.io/cropper/images/picture.jpg"
        },
        {
          img: "http://ofyaji162.bkt.clouddn.com/touxiang.jpg"
        }
      ],
      option: {
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: true, //裁剪框固定大小不动 true 固定
        original: false,
        canMoveBox: false, //裁剪框能否移动 false 不能
        autoCrop: true //一开始就裁剪
      },
      downImg: "#"
    };
  },
  methods: {
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },

    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img;
    },
    startCrop() {
      // start
      this.crap = true;
      this.$refs.cropper.startCrop();
    },
    stopCrop() {
      //  stop
      this.crap = false;
      this.$refs.cropper.stopCrop();
    },
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop();
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    finish(type) {
      // 输出
      var test = window.open("about:blank");
      test.document.body.innerHTML = "图片生成中..";
      if (type === "blob") {
        console.log("生成图片1");
        this.$refs.cropper.getCropBlob(data => {
          var test = window.open("");
          test.location.href = window.URL.createObjectURL(data);
        });
      } else {
        console.log("生成图片2");
        this.$refs.cropper.getCropData(data => {
          console.log(data);
          // test.location.href = data
        });
      }
    },

    down(type) {
      // event.preventDefault()
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      }
    },

    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          console.log(111);
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          console.log(222);
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
          this.$refs.cropper.startCrop();
          console.log(1);
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
      console.log("选择了图片");
    }
  },
  components: {
    VueCropper
  }
};
</script>
    <style>
.wrapper.zhengmian .cropper-face {
  background: url("/image/5.jpg");
  opacity: 0.5;
}
.vue-cropper {
  background: url("/image/5.jpg") !important;
}
.wrapper {
  height: 300px;
}
</style>
