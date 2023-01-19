<script setup lang="ts">
const props = defineProps<{ value: string }>();
</script>

<template>
  <div class="calculator__screen">{{ props.value }}</div>
</template>

<style scoped>
.calculator__screen {
  height: 8rem;
  padding: 0 1rem 0.75rem 1rem;
  display: flex;
  justify-content: end;
  align-items: flex-end;
  background-color: var(--screen-color);
  font-family: "Helvetica Neue", sans-serif;
  font-size: 5rem;
  font-weight: 500;
  overflow-x: hidden;
}
</style>
