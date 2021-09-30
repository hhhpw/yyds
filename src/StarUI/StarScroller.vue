<template>
  <div
    class="infinite-list-wrapper"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="disabled"
    style="overflow: auto"
    :style="{ height: props.height || 'auto' }"
  >
    <slot name="list"></slot>
    <p v-if="data.is_loading">加载中...</p>
    <p v-if="props.noMore">没有更多了</p>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, reactive } from "vue";
const props = defineProps({
  loading: Boolean,
  noMore: Boolean,
  height: String,
});
const data = reactive({
  is_loading: computed(() => {
    return props.loading;
  }),
});

const disabled = computed(() => {
  return props.loading || props.noMore;
});
const emits = defineEmits(["loadMore"]);
const loadMore = () => {
  data.is_loading = true;
  emits("loadMore");
};
</script>

<style>
.infinite-list-wrapper {
  /* height: 100px; */
  /* border: 1px solid red; */
}
</style>
