import { OperatorKeys } from '../enums/operator-keys.enum';
import { IContext, IStateData } from '../interfaces';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { StateData } from '../models/state-data.model';
import { EnteringSecondNumberState } from './entering-second-number-state';
import { AbstractCalculatorState } from './abstract-calculator-state';

export class EnteringFirstNumberState extends AbstractCalculatorState implements ICalculatorState {

  public constructor(context: IContext, data: IStateData) {
    super(context, data);
  }

  public digit(digit: string): void {
    this._data.firstBuffer = this._data.firstBuffer === '0' && digit !== '0' ? digit : this._data.firstBuffer + digit;
  }

  public decimalSeparator(): void {
    if (this._data.firstBuffer.indexOf('.') === -1) {
      // ignore if the number already has a decimal separator
      this._data.firstBuffer += '.';
    }
  }

  public binaryOperator(operator: OperatorKeys): void {
    const newData: IStateData = new StateData.Builder()
      .withFirstBuffer(this._data.firstBuffer === '' ? '0' : this._data.firstBuffer)
      .withFirstOperator(operator)
      .build();

    this._context.changeState(
      new EnteringSecondNumberState(this._context, newData)
    );
  }

  public equals(): void {
    /* pressing equals after entering one number has no effect */
    this._context.changeState(this);
  }
}
