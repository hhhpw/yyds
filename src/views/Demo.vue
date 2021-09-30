<template>
  <div></div>
</template>
<script setup>
/* eslint-disable */
import { computed, onMounted, reactive, defineProps, defineEmits } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  // store.dispatch("StoreWebSocket/initWS");
});
</script>
<style lang="scss" scoped></style>
