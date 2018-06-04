<template lang="pug">
  header.header-con
    .avatar
      img(src='../assets/logo.png')
      span 比一比大数据平台
</template>

<style lang="scss">
.header {
  &-con {
    background: #333;
    height: 60px;
    padding: 0 2.5%;
    line-height: 60px;
    font-size: 14px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
    .avatar {
      height: 60px;
      img {
        vertical-align: middle;
      }
      span {
        margin-left: 30px;
        font-size: 20px;
        color: #ffffff;
        vertical-align: middle;
      }
    }
  }
}
</style>

