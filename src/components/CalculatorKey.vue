<script setup lang="ts">
import { computed } from "vue";
import type { CalculatorKeyInterface } from "./Calculator.d";

// const props = defineProps<CalculatorKeyInterface>(); // this not working ...
// Tips to type the props:
// https://github.com/vuejs/core/issues/4294#issuecomment-1025210436
// https://github.com/vuejs/core/issues/4294#issuecomment-1350678720

// const { props } = defineProps<{ props: CalculatorKeyInterface }>(); // this is working but not valid https://eslint.vuejs.org/rules/no-setup-props-destructure.html

const props = defineProps<{ props: CalculatorKeyInterface }>();

// Type the emitted event and replace $emit
const emit = defineEmits<{ (event: "onPressed", value: CalculatorKeyInterface): void }>();

const getKeyClass = computed<string>(() => {
  if (props.props.value === "0") {
    return `calculator__key__digit-0`;
  } else {
    return `calculator__key__${props.props.type}`;
  }
});
</script>

<template>
  <div class="calculator__key" v-bind:class="[getKeyClass, props.props.isSelected ? 'calculator__key__selected' : '']" v-on:click="emit('onPressed', props.props)">
    {{ props.props.value }}
  </div>
</template>

<style scoped>
div.calculator__key {
  height: var(--size-key);
  width: var(--size-key);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 3rem;
  font-weight: 600;
  margin: var(--margin-key);
  cursor: pointer;
}

.calculator__key__digit {
  background-color: var(--digit-key);
  color: var(--text-color);
}

.calculator__key__operator {
  background-color: var(--operator-key);
}

.calculator__key__function {
  background-color: var(--function-key);
}

.calculator__key__digit-0 {
  grid-column-start: 1;
  grid-column-end: 3;
  width: calc((var(--size-key) + var(--margin-key)) * 2 + - var(--digit-0-padding-left)) !important;
  border-radius: calc(var(--size-key) / 2) !important;
  justify-content: start !important;
  padding-left: var(--digit-0-padding-left);
  background-color: var(--digit-key);
  color: var(--text-color);
}

.calculator__key__selected {
  background-color: var(--operator-selected);
  color: var(--operator-key);
}
</style>
