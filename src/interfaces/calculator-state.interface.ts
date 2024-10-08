
import { OperatorKeys } from '../enums/operator-keys.enum';

export interface ICalculatorState {
  digit(digit: string): void;
  decimalSeparator(): void;
  binaryOperator(operator: OperatorKeys): void;
  equals(): void;
  clear(): void;
  display(): string;
}
