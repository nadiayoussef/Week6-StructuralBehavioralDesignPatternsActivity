import { OperatorKeys } from '../enums/operator-keys.enum';
import { IContext, IStateData } from '../interfaces';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { StateData } from '../models/state-data.model';
import { EnteringFirstNumberState } from './entering-first-number-state';

export abstract class AbstractCalculatorState implements ICalculatorState {

  constructor(protected _context: IContext, protected _data: IStateData){}

  public abstract digit(digit: string): void;
  public abstract decimalSeparator(): void;
  public abstract binaryOperator(operator: OperatorKeys): void;
  public abstract equals(): void;

  public display(): string {
    return this._data.display();
  }

  public clear(): void {
    this._context.changeState(new EnteringFirstNumberState(this._context, new StateData.Builder().build()));
  }

  protected add(firstNumber: number, secondNumber: number): number {
    return (firstNumber + secondNumber);
  }

  protected subtract(firstNumber: number, secondNumber: number): number {
    return (firstNumber - secondNumber);
  }

  protected multiply(firstNumber: number, secondNumber: number): number {
    return (firstNumber * secondNumber);
  }

  protected divide(firstNumber: number, secondNumber: number): number {
    return (firstNumber / secondNumber);
  }
}
