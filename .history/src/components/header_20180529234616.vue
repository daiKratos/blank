<template lang="pug">
  header.header-con
    .avatar
      img(src='../assets/logo.png')
</template>

<style lang="scss">
.header {
  &-con {
    height: 60px;
    padding: 0 2.5%;
    line-height: 60px;
    font-size: 14px;
    margin: 0 auto 15px;
    background-color: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.08);
    display: flex;
    .avatar{
      height: 60px;
      img{
        vertical-align: middle
      }
    }
  }
}
</style>

