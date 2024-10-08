import { OperatorKeys } from '../enums/operator-keys.enum';
import { IContext, IStateData } from '../interfaces';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { StateData } from '../models/state-data.model';
import { AbstractCalculatorState } from './abstract-calculator-state';
import { EnteringFirstNumberState } from './entering-first-number-state';
import { EnteringSecondNumberState } from './entering-second-number-state';
import { ErrorState } from './error.state';

export class EnteringThirdNumberState extends AbstractCalculatorState implements ICalculatorState {
  public constructor(context: IContext, data: IStateData) {
    super(context, data);
  }

  public digit(digit: string): void {
    this._data.thirdBuffer =
      this._data.thirdBuffer === '0' && digit !== '0' ? digit : this._data.thirdBuffer + digit;
  }

  public decimalSeparator(): void {
    if (this._data.thirdBuffer.indexOf('.') === -1) {
      // ignore if the number already has a decimal separator
      this._data.thirdBuffer += '.';
    }
  }

  public binaryOperator(operator: OperatorKeys): void {
    // evaluate the entire expression and transition to EnteringSecondNumberState
    // (or ErrorState in case of division by zero)
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );
    const thirdNumber: number = parseFloat(
      this._data.thirdBuffer === '' ? '0' : this._data.thirdBuffer
    );

    switch (operator) {
      case OperatorKeys.MULT:
      case OperatorKeys.DIV:
        if (operator === OperatorKeys.DIV && thirdNumber === 0) {
          this._context.changeState(new ErrorState(this._context, this._data));
        } else {
          switch (this._data.secondOperator){ 
            case OperatorKeys.MULT:
              this._data.secondBuffer = this.multiply(secondNumber, thirdNumber).toString();
              this._data.thirdBuffer = '';
              break;
            case OperatorKeys.DIV:
              this._data.secondBuffer = this.divide(secondNumber, thirdNumber).toString();
              this._data.thirdBuffer = '';
              break;
          }
          this._data.secondOperator = operator;
        }
        break;
      case OperatorKeys.PLUS:
      case OperatorKeys.MINUS:
        this.evaluateWhenLowPrecedenceNext(operator);
        break;
      default:
        this._context.changeState(new ErrorState(this._context, this._data));
    }
  }

  public equals(): void {
    // evaluate the entire expression and transition to EnteringFirstNumberState
    // (or ErrorState in case of division by zero)
    const firstNumber: number = parseFloat(
      this._data.firstBuffer === '' ? '0' : this._data.firstBuffer
    );
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );
    const thirdNumber: number = parseFloat(
      this._data.thirdBuffer === '' ? '0' : this._data.thirdBuffer
    );
    let result: number;

    if (this._data.secondOperator === OperatorKeys.MULT) {
      result = parseFloat(this.multiply(secondNumber, thirdNumber).toString());
    } else {
      // (this._data.secondOperator === OperatorKeys.DIV)
      if (thirdNumber === 0) {
        this._context.changeState(new ErrorState(this._context, this._data));
        return;
      } else {
        result = parseFloat(this.divide(secondNumber, thirdNumber).toString());
      }
    }

    if (this._data.firstOperator === OperatorKeys.PLUS) {
      this._context.changeState(
        new EnteringFirstNumberState(
          this._context,
          new StateData.Builder().withFirstBuffer(this.add(firstNumber, result).toString()).build()
        )
      );
    } else {
      // (this._data.firstOperator === OperatorKeys.MINUS)
      this._context.changeState(
        new EnteringFirstNumberState(
          this._context,
          new StateData.Builder().withFirstBuffer(this.subtract(firstNumber, result).toString()).build()
        )
      );
    }
  }

  private evaluateWhenLowPrecedenceNext(nextOperator: OperatorKeys): void {
    const firstNumber: number = parseFloat(
      this._data.firstBuffer === '' ? '0' : this._data.firstBuffer
    );
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );
    const thirdNumber: number = parseFloat(
      this._data.thirdBuffer === '' ? '0' : this._data.thirdBuffer
    );

    let result: number;
    let newData: IStateData;

    switch (this._data.secondOperator) {
      case OperatorKeys.MULT:
        // result = secondNumber * thirdNumber;
        result = this.multiply(secondNumber, thirdNumber);
        if (this._data.firstOperator === OperatorKeys.PLUS) {
          // result = firstNumber + result;
          result = this.add(firstNumber, result);
        } else {
          // (this._data.firstOperator === OperatorKeys.MINUS)
          // result = firstNumber - result;
          result = this.subtract(firstNumber, result);
        }
        newData = new StateData.Builder()
          .withFirstBuffer(result.toString())
          .withFirstOperator(nextOperator)
          .build();
        this._context.changeState(new EnteringSecondNumberState(this._context, newData));
        break;
      case OperatorKeys.DIV:
        if (thirdNumber !== 0) {
          result = secondNumber / thirdNumber;
          if (this._data.firstOperator === OperatorKeys.PLUS) {
            result = this.add(firstNumber, result);
          } else {
            // (this._data.firstOperator === OperatorKeys.MINUS)
            result = this.subtract(firstNumber, result);
          }
          newData = new StateData.Builder()
            .withFirstBuffer(result.toString())
            .withFirstOperator(nextOperator)
            .build();
          this._context.changeState(new EnteringSecondNumberState(this._context, newData));
        } else {
          this._context.changeState(new ErrorState(this._context, this._data));
        }
        break;
      default:
        this._context.changeState(new ErrorState(this._context, this._data));
    }
  }
}
