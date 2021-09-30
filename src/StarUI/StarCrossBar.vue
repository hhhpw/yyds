<template>
  <div class="star-cross-bar">
    <div
      class="star-cross-bar-item"
      v-for="(b, i) in props.cross_bar_array"
      :key="i"
      @click="selectCrossTab(b.id)"
    >
      <span
        :class="['name', state.selected_tab === b.id ? 'selected_tab' : '']"
        >{{ b.name }}</span
      >
      <span
        class="bottom-line"
        v-if="state.selected_tab === b.id && props.cross_bar_array.length > 1"
      ></span>
    </div>
  </div>
</template>
<script setup>
import { reactive, defineProps, computed, onMounted } from "vue";
import { useStore } from "vuex";
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();
const store = useStore();
let state = reactive({
  selected_tab: computed(() => store.state.StoreNFTDetail.selected_cross_tab),
});

const props = defineProps({
  cross_bar_array: {
    type: Array,
    default: () => [
      {
        id: "description",
        name: "描述",
      },
      {
        id: "rarevalue",
        name: "稀有值",
      },
      {
        id: "history",
        name: "历史",
      },
    ],
  },
});

onMounted(() => {
  store.commit("StoreNFTDetail/SET_CROSS_TAB", "description");
});

const selectCrossTab = (id) => {
  store.commit("StoreNFTDetail/SET_CROSS_TAB", id);
};
</script>
<style lang="scss" scoped>
.star-cross-bar {
  display: flex;
  .star-cross-bar-item {
    font-size: 16px;
    font-weight: 500;
    color: #3f1c09;
    margin-right: 32px;
    position: relative;
    cursor: pointer;
    .bottom-line {
      display: inline-block;
      width: 100%;
      height: 4px;
      background: #fb8000;
      border-radius: 4px;
      position: absolute;
      bottom: -4px;
      left: 0%;
    }
    .selected_tab {
      color: #3f1c09;
    }
  }
}
</style>
