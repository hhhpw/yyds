<template>
  <div>
    <ElEmpty v-if="props.data.length === 0" :description="props.description" />
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { ElEmpty } from "element-plus";

const props = defineProps({
  data: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
});
</script>
<style lang="scss" scoped></style>
