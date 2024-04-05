<script setup>
  import Header from "@/components/Header.vue";
</script>

<template>
  <Header></Header>
  <span w200 h50 pos:relative class="
    pseudoEl()
    ::after,::before{bor2px_#f82_solid;w100;h100%;pos:absolute;t0}
    ::after{l0;border-right:0}
    ::before{r0;border-left:0}
    :has(input:focus){w220;transition:all.4s}">
    <input type="text" placeholder="请输入" class="
      wh() text-align:center
      ::placeholder{c:#f82;fw700}
      :focus::placeholder{c:transparent;transition:all.4s}
      pos:relative
      z-index10">
  </span>
</template>

<style scoped></style>
