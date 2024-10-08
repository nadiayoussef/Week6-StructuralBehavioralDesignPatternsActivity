import { OperatorKeys } from '../enums/operator-keys.enum';
import { IContext, IStateData } from '../interfaces';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { StateData } from '../models/state-data.model';
import { AbstractCalculatorState } from './abstract-calculator-state';
import { EnteringFirstNumberState } from './entering-first-number-state';
import { EnteringThirdNumberState } from './entering-third-number-state';
import { ErrorState } from './error.state';

export class EnteringSecondNumberState extends AbstractCalculatorState implements ICalculatorState {
  public constructor(context: IContext, data: IStateData) {
    super(context, data);
  }

  public digit(digit: string): void {
    this._data.secondBuffer =
      this._data.secondBuffer === '0' && digit !== '0' ? digit : this._data.secondBuffer + digit;
  }

  public decimalSeparator(): void {
    if (this._data.secondBuffer.indexOf('.') === -1) {
      // ignore if the number already has a decimal separator
      this._data.secondBuffer += '.';
    }
  }

  public binaryOperator(operator: OperatorKeys): void {
    switch (operator) {
      case OperatorKeys.PLUS: // in case of + or - after having entered two numbers, apply the first operator and stay in this state
      case OperatorKeys.MINUS: // (or go to ErrorState in case of division by zero)
        this.evaluateWhenLowPrecedenceNext(operator);
        break;
      case OperatorKeys.DIV: // if we press * or / after having entered two numbers
      case OperatorKeys.MULT:
        this.evaluateWhenHighPrecedenceNext(operator);
        break;
      default:
        throw new Error('Invalid Operator');
    }
  }

  public equals(): void {
    const firstNumber: number = parseFloat(
      this._data.firstBuffer === '' ? '0' : this._data.firstBuffer
    );
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );

    switch (this._data.firstOperator) {
      case OperatorKeys.PLUS:
        this._context.changeState(
          new EnteringFirstNumberState(
            this._context,
            new StateData.Builder()
              .withFirstBuffer(this.add(firstNumber, secondNumber).toString())
              .build()
          )
        );
        break;
      case OperatorKeys.MINUS:
        this._context.changeState(
          new EnteringFirstNumberState(
            this._context,
            new StateData.Builder()
              .withFirstBuffer(this.subtract(firstNumber, secondNumber).toString())
              .build()
          )
        );
        break;
      case OperatorKeys.MULT:
        this._context.changeState(
          new EnteringFirstNumberState(
            this._context,
            new StateData.Builder()
              .withFirstBuffer(this.multiply(firstNumber, secondNumber).toString())
              .build()
          )
        );
        break;
      case OperatorKeys.DIV:
        this._context.changeState(
          new EnteringFirstNumberState(
            this._context,
            new StateData.Builder()
              .withFirstBuffer(this.divide(firstNumber, secondNumber).toString())
              .build()
          )
        );
        break;
      default:
        this._context.changeState(new ErrorState(this._context, this._data));
    }
  }

  private evaluateWhenLowPrecedenceNext(nextOperator: OperatorKeys): void {
    const firstNumber: number = parseFloat(
      this._data.firstBuffer === '' ? '0' : this._data.firstBuffer
    );
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );

    switch (this._data.firstOperator) {
      case OperatorKeys.PLUS:
        this._data.firstBuffer = this.add(firstNumber, secondNumber).toString();
        break;
      case OperatorKeys.MINUS:
        this._data.firstBuffer = this.subtract(firstNumber, secondNumber).toString();
        break;
      case OperatorKeys.MULT:
        this._data.firstBuffer = this.multiply(firstNumber, secondNumber).toString();
        break;
      case OperatorKeys.DIV:
        if (secondNumber !== 0) {
          this._data.firstBuffer = this.divide(firstNumber, secondNumber).toString();
        } else {
          this._context.changeState(new ErrorState(this._context, this._data));
        }
        break;
      default:
        this._context.changeState(new ErrorState(this._context, this._data));
    }
    this._data.secondBuffer = '';
    this._data.firstOperator = nextOperator;
  }

  private evaluateWhenHighPrecedenceNext(nextOperator: OperatorKeys): void {
    const firstNumber: number = parseFloat(
      this._data.firstBuffer === '' ? '0' : this._data.firstBuffer
    );
    const secondNumber: number = parseFloat(
      this._data.secondBuffer === '' ? '0' : this._data.secondBuffer
    );

    switch (this._data.firstOperator) {
      case OperatorKeys.MULT:
        // If the first operator was *, apply it
        this._data.firstBuffer = this.multiply(firstNumber, secondNumber).toString();
        this._data.secondBuffer = '';
        this._data.firstOperator = nextOperator;
        break;
      case OperatorKeys.DIV:
        // If the first operator was /, apply it
        if (secondNumber === 0) {
          // check for div by zero
          this._context.changeState(new ErrorState(this._context, this._data));
        } else {
          this._data.firstBuffer = this.divide(firstNumber, secondNumber).toString();
          this._data.secondBuffer = '';
          this._data.firstOperator = nextOperator;
        }
        break;
      case OperatorKeys.PLUS:
      case OperatorKeys.MINUS:
        const newData: IStateData = new StateData.Builder()
          .withFirstBuffer(this._data.firstBuffer)
          .withSecondBuffer(this._data.secondBuffer)
          .withFirstOperator(this._data.firstOperator)
          .withSecondOperator(nextOperator)
          .build();
        this._context.changeState(new EnteringThirdNumberState(this._context, newData));
        break;
      default:
        this._context.changeState(new ErrorState(this._context, this._data));
    }
  }
}

