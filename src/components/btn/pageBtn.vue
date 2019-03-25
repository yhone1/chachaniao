<template>
  <a href="javascript:void(0)" class="controlA" @click="controlPage">' + i + '</a>
</template>

<script>
export default {
  name: 'page-btn'
}
</script>

<style scoped>
  .controlA{
    height: 18px;
    width: 18px;
    display: inline-block;
    text-align: center;
    line-height: 17px;
    margin: 10px;
    text-decoration: none;
    border:1px #333 solid;
    color: #333;
    border-radius: 10%;
    transition: .1s all;
  }
  .controlA:hover{
    background-color: #333;
    color: white;
    border-radius: 50%;
    transform: scale(1.2);
  }
</style>
