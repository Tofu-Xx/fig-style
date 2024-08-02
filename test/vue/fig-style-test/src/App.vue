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
    transition:all.4s
    :has(input:focus){w220}">
    <input type="text" placeholder="请输入" class="
      wh() ta:center
      ::placeholder{c:#f82;fw700}
      hidPlaceholder()
      pos:relative
      z-index10">
  </span>
</template>

<style scoped>
  .fig-hidPlaceholder {
    --s: 1s;
    &::placeholder {
      transition: all var(--s);
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
</style>
