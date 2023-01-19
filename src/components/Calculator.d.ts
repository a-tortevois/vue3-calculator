export enum CalculatorKeyType {
  Digit = "digit",
  Operator = "operator",
  Function = "function",
}

export interface CalculatorKeyMapInterface {
  [key: string]: CalculatorKeyInterface;
}

export interface CalculatorKeyInterface {
  key: string;
  value: string;
  type: CalculatorKeyType;
  isSelected?: boolean;
}

export interface CalculatorStateInterface {
  result: number;
  history: string;
  screen: string;
  currentOperator: CalculatorKeyInterface | null;
  lastKeyPressed: CalculatorKeyInterface | null;
}
