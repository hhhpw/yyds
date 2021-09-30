<template>
  <div class="star-refresh">
    <star-dialog
      :title="$t(props.title || '')"
      :dialogVisible="state.visible"
      @handleClose="handleClose"
      :close-on-click-modal="false"
    >
      <template #content>
        <div class="content" v-if="!props.isCustomContent">
          <slot name="image-logo"></slot>
          <p><slot name="content-text"></slot></p>
        </div>
        <slot name="core" v-if="props.isCustomContent"></slot>

        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </template>
    </star-dialog>
  </div>
</template>

<script setup>
import starDialog from "@StarUI/StarDialog.vue";
import { reactive, defineProps, watch, defineEmits } from "vue";

let state = reactive({
  visible: props.dialogVisible,
});

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  title: String,
  okText: String,
  isCustomContent: {
    type: Boolean,
    default: false,
  },
});

watch(
  () => props.dialogVisible,
  (n) => {
    state.visible = n;
  }
);

const emits = defineEmits(["handleClose"]);

const handleClose = () => {
  emits("handleClose", false);
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.star-refresh {
  position: relative;
  z-index: 122;
  ::v-deep(.el-dialog__header) {
    height: auto;
    line-height: 24px;
    margin-bottom: 4px;
    padding-top: 24px;
    padding-bottom: 0;
  }
  ::v-deep(.el-dialog__body) {
    padding: 0 20px 24px;
  }
  .content {
    text-align: center;
    img {
      width: 81px;
      height: 81px;
      margin: 0 auto;
    }
    p {
      width: 400px;
      font-size: 20px;
      font-family: PingFangTC-Semibold, PingFangTC;
      font-weight: 600;
      color: #010e22;
      line-height: 28px;
      text-align: center;
      margin: 0 auto;
    }
  }
  .footer {
    margin-top: 24px;
  }
}
</style>
