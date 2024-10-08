import { OperatorKeys } from '../enums';
import { IStateData } from '../interfaces';

export class StateData implements IStateData {

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Builder = class Builder {

    private _firstBuffer: string = '';
    private _secondBuffer: string = '';
    private _thirdBuffer: string = '';
    private _firstOperator: OperatorKeys = <OperatorKeys>'';
    private _secondOperator: OperatorKeys = <OperatorKeys>'';

    public withFirstBuffer(buffer: string): Builder {
      this._firstBuffer = buffer;
      return this;
    }

    public withSecondBuffer(buffer: string): Builder {
      this._secondBuffer = buffer;
      return this;
    }

    public withThirdBuffer(buffer: string): Builder {
      this._thirdBuffer = buffer;
      return this;
    }

    public withFirstOperator(operator: OperatorKeys): Builder {
      this._firstOperator = operator;
      return this;
    }

    public withSecondOperator(operator: OperatorKeys): Builder {
      this._secondOperator = operator;
      return this;
    }

    public build(): IStateData {
      return new StateData(
        this._firstBuffer,
        this._secondBuffer,
        this._thirdBuffer,
        this._firstOperator,
        this._secondOperator
      );
    }
  };

  public constructor(
    private _firstBuffer: string,
    private _secondBuffer: string,
    private _thirdBuffer: string,
    private _firstOperator: OperatorKeys,
    private _secondOperator: OperatorKeys
  ) {}

  public get firstBuffer(): string {
    return this._firstBuffer;
  }

  public get secondBuffer(): string {
    return this._secondBuffer;
  }

  public get thirdBuffer(): string {
    return this._thirdBuffer;
  }

  public get firstOperator(): OperatorKeys {
    return this._firstOperator;
  }

  public get secondOperator(): OperatorKeys {
    return this._secondOperator;
  }

  public set firstBuffer(buffer: string) {
    this._firstBuffer = buffer;
  }

  public set secondBuffer(buffer: string) {
    this._secondBuffer = buffer;
  }

  public set thirdBuffer(buffer: string) {
    this._thirdBuffer = buffer;
  }

  public set firstOperator(operator: OperatorKeys) {
    this._firstOperator = operator;
  }

  public set secondOperator(operator: OperatorKeys) {
    this._secondOperator = operator;
  }

  public display(): string {
    return `${this._firstBuffer}${this._firstOperator}${this._secondBuffer}${this._secondOperator}${this._thirdBuffer}`;
  }
}

