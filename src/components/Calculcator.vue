<script setup lang="ts">
import { reactive } from "vue";

import { CalculatorKeyType, type CalculatorKeyMapInterface, type CalculatorKeyInterface, type CalculatorStateInterface } from "./Calculator.d";
import CalculatorHistory from "./CalculatorHistory.vue";
import CalculatorScreen from "./CalculatorScreen.vue";
import CalculatorKey from "./CalculatorKey.vue";

const KEY_MAP: CalculatorKeyMapInterface = {
  DIGIT_0: { key: "0", value: "0", type: CalculatorKeyType.Digit },
  DIGIT_1: { key: "1", value: "1", type: CalculatorKeyType.Digit },
  DIGIT_2: { key: "2", value: "2", type: CalculatorKeyType.Digit },
  DIGIT_3: { key: "3", value: "3", type: CalculatorKeyType.Digit },
  DIGIT_4: { key: "4", value: "4", type: CalculatorKeyType.Digit },
  DIGIT_5: { key: "5", value: "5", type: CalculatorKeyType.Digit },
  DIGIT_6: { key: "6", value: "6", type: CalculatorKeyType.Digit },
  DIGIT_7: { key: "7", value: "7", type: CalculatorKeyType.Digit },
  DIGIT_8: { key: "8", value: "8", type: CalculatorKeyType.Digit },
  DIGIT_9: { key: "9", value: "9", type: CalculatorKeyType.Digit },
  DIGIT_COMMA: { key: ".", value: ".", type: CalculatorKeyType.Digit },
  OPERATOR_ADD: { key: "+", value: "+", type: CalculatorKeyType.Operator },
  OPERATOR_SUBTRACT: { key: "-", value: "−", type: CalculatorKeyType.Operator }, // &minus;
  OPERATOR_MULTIPLY: { key: "*", value: "×", type: CalculatorKeyType.Operator }, // &times;
  OPERATOR_DIVIDE: { key: "/", value: "÷", type: CalculatorKeyType.Operator }, // &divide;
  OPERATOR_EQUAL: { key: "Enter", value: "=", type: CalculatorKeyType.Operator },
  FUN_CLEAR: { key: "Delete", value: "C", type: CalculatorKeyType.Function },
  FUN_PERCENT: { key: "", value: "%", type: CalculatorKeyType.Function }, // &percnt;
  FUN_INV: { key: "", value: "±", type: CalculatorKeyType.Function }, // &plusmn;
};

const state = reactive<CalculatorStateInterface>({
  result: 0,
  history: "",
  screen: "0",
  currentOperator: null,
  lastKeyPressed: null,
});

const isSelected = ({ value }: CalculatorKeyInterface) => {
  if (!state.lastKeyPressed) {
    return false;
  }
  return state.lastKeyPressed.value === value;
};

const lastKeyPressedIsOperator = () => {
  if (!state.lastKeyPressed) {
    return false;
  }
  return state.lastKeyPressed.type === CalculatorKeyType.Operator;
};

const addDigit = (digit: string) => {
  if (state.screen.toString().length > 8) {
    return;
  }
  if (digit === KEY_MAP.DIGIT_COMMA.value && state.screen.toString().indexOf(KEY_MAP.DIGIT_COMMA.value) >= 0) {
    return;
  }
  if (state.screen === KEY_MAP.DIGIT_0.value || lastKeyPressedIsOperator()) {
    state.screen = digit;
  } else {
    state.screen += digit;
  }
};

const doOperation = () => {
  if (lastKeyPressedIsOperator()) {
    return;
  }
  if (!state.currentOperator) {
    state.result = parseFloat(state.screen);
    return;
  }
  switch (state.currentOperator.value) {
    case KEY_MAP.OPERATOR_ADD.value: {
      state.result = state.result + parseFloat(state.screen);
      break;
    }
    case KEY_MAP.OPERATOR_SUBTRACT.value: {
      state.result = state.result - parseFloat(state.screen);
      break;
    }
    case KEY_MAP.OPERATOR_MULTIPLY.value: {
      state.result = state.result * parseFloat(state.screen);
      break;
    }
    case KEY_MAP.OPERATOR_DIVIDE.value: {
      state.result = state.result / parseFloat(state.screen);
      break;
    }
  }
  state.screen = state.result.toString();
};

const onPressed = (key: CalculatorKeyInterface) => {
  if (key.type === CalculatorKeyType.Digit) {
    addDigit(key.value);
  } else if (key.type == CalculatorKeyType.Operator) {
    doOperation();
    state.history = key.value === KEY_MAP.OPERATOR_EQUAL.value ? "" : `${state.result} ${key.value}`;
    state.currentOperator = key;
    // console.log("State: ", { state });
  } else {
    switch (key.value) {
      case KEY_MAP.FUN_CLEAR.value: {
        state.result = 0;
        state.history = "";
        state.screen = "0";
        state.currentOperator = null;
        break;
      }
      case KEY_MAP.FUN_INV.value: {
        state.screen = (-parseFloat(state.screen)).toString();
        break;
      }

      case KEY_MAP.FUN_PERCENT.value: {
        state.screen = (parseFloat(state.screen) * 0.01).toString();
        break;
      }
    }
  }
  state.lastKeyPressed = key;
};

window.addEventListener("keydown", (event) => {
  for (const [_, key] of Object.entries(KEY_MAP)) {
    if (event.key === key.key) {
      onPressed(key);
      event.preventDefault();
      break;
    }
  }
});
</script>

<template>
  <h1>Calculator app with <img src="../assets/logo.svg" alt="Logo Vue.js" class="logo" /><span class="green">ue.js</span></h1>
  <div class="calculator">
    <CalculatorHistory v-bind:value="state.history" />
    <CalculatorScreen v-bind:value="state.screen" />
    <div class="calculator__keyboard">
      <CalculatorKey v-bind:props="KEY_MAP.FUN_CLEAR" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.FUN_INV" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.FUN_PERCENT" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="{ ...KEY_MAP.OPERATOR_DIVIDE, isSelected: isSelected(KEY_MAP.OPERATOR_DIVIDE) }" v-on:onPressed="onPressed" />

      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_7" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_8" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_9" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="{ ...KEY_MAP.OPERATOR_MULTIPLY, isSelected: isSelected(KEY_MAP.OPERATOR_MULTIPLY) }" v-on:onPressed="onPressed" />

      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_4" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_5" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_6" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="{ ...KEY_MAP.OPERATOR_SUBTRACT, isSelected: isSelected(KEY_MAP.OPERATOR_SUBTRACT) }" v-on:onPressed="onPressed" />

      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_1" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_2" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_3" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="{ ...KEY_MAP.OPERATOR_ADD, isSelected: isSelected(KEY_MAP.OPERATOR_ADD) }" v-on:onPressed="onPressed" />

      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_0" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.DIGIT_COMMA" v-on:onPressed="onPressed" />
      <CalculatorKey v-bind:props="KEY_MAP.OPERATOR_EQUAL" v-on:onPressed="onPressed" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: "Helvetica Neue", sans-serif;
  text-align: center;
}

.logo {
  display: inline-block;
  height: 100%;
  vertical-align: bottom;
  margin-bottom: 0.6rem;
}

.green {
  color: var(--text-light-green);
}
.calculator {
  display: flex;
  flex-direction: column;
  max-inline-size: var(--calculator-width);
  border-radius: 1.5rem;
  overflow: hidden;
  background-color: var(--background-color);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15), 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  color: var(--text-color);
  user-select: none;
  margin: 0 auto;
}

.calculator__keyboard {
  display: grid;
  grid-template-columns: repeat(var(--columns-count), 1fr);
  margin: var(--margin-key);
}
</style>
