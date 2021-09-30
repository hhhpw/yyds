<template>
  <div class="star-exchange-button">
    <div
      v-for="(d, i) in props.tabs"
      class="star-exchange-button-item"
      :key="i"
      :class="{ 'is-active': state.activeIndex === i }"
      @click="btnClick(d, i)"
    >
      {{ $t(d.label) }}
    </div>
  </div>
</template>

<script setup>
import { reactive, defineEmits, defineProps, watch } from "vue";
const emits = defineEmits(["clickMethod"]);
import { useRouter } from "vue-router";
const router = useRouter();

let props = defineProps({
  activeIndex: Number,
  tabs: {
    type: Array,
    default: () => [
      {
        label: "兑换",
        path: "/swap",
      },
      {
        label: "流动性",
        path: "/liquidity",
      },
    ],
  },
});
let state = reactive({
  activeIndex: props.activeIndex,
});

watch(
  () => props.activeIndex,
  () => {
    state.activeIndex = props.activeIndex;
  }
);

const btnClick = (d) => {
  // state.activeIndex = i;
  if (emits.clickMethod) {
    this.$emit("clickMethod", d);
  } else {
    router.push(d.path);
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.star-exchange-button {
  background: #e9ded1;
  border-radius: 24px;
  display: inline-flex;
  box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.5), 0px -1px 0px 0px #d4c1aa;
  width: 252px;
  height: 48px;
  .star-exchange-button-item {
    -webkit-box-align: center;
    align-items: center;
    border: 0px;
    border-radius: 16px;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    -webkit-box-pack: center;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0px;
    transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s;
    padding: 0px 16px;
    background-color: transparent;
    width: 120px;
    height: 46px;
    margin-top: 1px;
    color: $text-brown-color;
    &.is-active {
      background-color: rgb(122, 110, 170);
      background: linear-gradient(180deg, #fdf8f3 0%, #f9efe4 100%);
      box-shadow: 0px 2px 4px 0px #dfcdb9, 0px 1px 0px 0px $white;
      border-radius: 24px;
      margin: 0 2px;
    }
    &:hover {
      opacity: 0.65;
    }
  }
}
</style>
