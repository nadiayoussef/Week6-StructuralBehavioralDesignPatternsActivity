
import { NumericKeys } from '../enums';
import { IContext, IStateData } from '../interfaces';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { StateData } from '../models/state-data.model';
import { EnteringFirstNumberState } from './entering-first-number-state';

// in the ErrorState, pressing "C" will reset the calculator to its original state; other keys have no effect
export class ErrorState implements ICalculatorState {

  public constructor(private _context: IContext, private _data: IStateData) { }

  public digit(key: NumericKeys): void {
    const newData: IStateData = new StateData.Builder()
      .withFirstBuffer(key)
      .build();
    this._context.changeState(new EnteringFirstNumberState(this._context, newData));
  }

  public decimalSeparator(): void {
    const newData: IStateData = new StateData.Builder()
      .withFirstBuffer('0.')
      .build();
    this._context.changeState(new EnteringFirstNumberState(this._context, newData));
  }

  public binaryOperator(): void {
    this._context.changeState(new ErrorState(this._context, this._data));
  }

  public equals(): void {
    this._context.changeState(new ErrorState(this._context, this._data));
  }

  public clear(): void {
    this._context.changeState(new EnteringFirstNumberState(this._context, new StateData.Builder().build()));
  }

  public display(): string {
    return 'ERR';
  }

}
