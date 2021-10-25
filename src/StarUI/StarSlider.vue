<template>
  <div class="star-slider slider-demo-block">
    <ElSlider v-model="state.value" range :marks="state.marks"> </ElSlider>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { ElSlider } from "element-plus";
let state = reactive({
  value: [0, 25],
  marks: {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: "100%",
  },
});
</script>
<style lang="scss" scoped>
.star-slider {
  height: 32px;
  width: 100%;
  ::v-deep(.el-slider) {
    height: 11px;
  }
  ::v-deep(.el-slider__runway) {
    margin: auto;
    background: #282b36;
    height: 11px;
  }
  ::v-deep(.el-slider__bar) {
    background: #0ec89b;
    height: 11px;
  }
  ::v-deep(.el-slider__stop) {
    width: 9px;
    height: 9px;
    background: #282b36;
    border: 1px solid #383c4d;
  }
  ::v-deep(.el-slider__button-wrapper) {
    height: 11px;
    top: -6px;
  }
  ::v-deep(.el-slider__button) {
    width: 11px;
    height: 11px;
    background: #111a33;
    border: 3px solid #0ec89b;
  }
}
</style>
