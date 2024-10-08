
import { OperatorKeys } from '../enums';

export interface IStateData {
  firstBuffer: string;
  secondBuffer: string;
  thirdBuffer: string;
  firstOperator: OperatorKeys;
  secondOperator: OperatorKeys;
  display(): string;
}
