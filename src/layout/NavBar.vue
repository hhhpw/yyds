<template>
  <div class="star-nav">Header NavBar</div>
</template>

<script></script>
<style lang="scss" scoped>
.star-nav {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  height: 72px;
  // background: #f9efe4;
  background: #090808;
  width: calc(100%);
  justify-content: flex-end;
  color: #fff;
  .lang {
    margin-left: 25px;
    box-sizing: border-box;
    height: 35px;
    line-height: 35px;
    padding: 0 16px;
    width: 100px;
  }
}
</style>
