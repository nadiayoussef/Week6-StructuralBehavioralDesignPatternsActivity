
import { CalculatorModel } from './calculator.model';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ActionKeys } from '../enums/action-keys.enum';
import { assert } from 'console';

describe('CalculatorModel', (): void => {

  let calculator: ICalculatorModel;

  beforeEach((): void => {
    calculator = new CalculatorModel();
  });

  it('should contain a CalculatorModel class that implements ICalculatorModel', (): void => {

    expect(calculator).toBeDefined();

  });

  it('should display `13` when equals is clicked on `7 + 6`', (): void => {

    calculator.pressNumericKey(NumericKeys.SEVEN);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.SIX);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('13');

  });

  it('should display `5` when equals is clicked on `15 - 10`', (): void => {

    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.FIVE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('5');

  });

  it('should display `21` when equals is clicked on `3 * 7`', (): void => {

    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.SEVEN);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('21');

  });

  it('should display `12` when equals is clicked on `144 / 12`', (): void => {

    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('12');

  });

  it('should display `14` when equals is clicked on `2 + 3 * 4`', (): void => {

    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('14');

  });

  it('should return `90` when equals is clicked on `100 + 200 / 10 - 3 * 10`', (): void => {

    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual('90');

  });

  it('should display `82` when equals is clicked on `100 + 1 - 8 * 1 * 3 / 4 + 7 - 10 / 2 * 4', (): void => {

    calculator.pressNumericKey(NumericKeys.ONE);
    assert(calculator.display() === '1');
    calculator.pressNumericKey(NumericKeys.ZERO);
    assert(calculator.display() === '10');
    calculator.pressNumericKey(NumericKeys.ZERO);
    assert(calculator.display() === '100');
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    assert(calculator.display() === '100+');
    calculator.pressNumericKey(NumericKeys.ONE);
    assert(calculator.display() === '100+1');
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    assert(calculator.display() === '101-');
    calculator.pressNumericKey(NumericKeys.EIGHT);
    assert(calculator.display() === '101-8');
    calculator.pressOperatorKey(OperatorKeys.MULT);
    assert(calculator.display() === '101-8*');
    calculator.pressNumericKey(NumericKeys.ONE);
    assert(calculator.display() === '101-8*1');
    calculator.pressOperatorKey(OperatorKeys.MULT);
    assert(calculator.display() === '101-8*');
    calculator.pressNumericKey(NumericKeys.THREE);
    assert(calculator.display() === '101-8*3');
    calculator.pressOperatorKey(OperatorKeys.DIV);
    assert(calculator.display() === '101-24/');
    calculator.pressNumericKey(NumericKeys.FOUR);
    assert(calculator.display() === '101-24/4');
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    assert(calculator.display() === '95+');
    calculator.pressNumericKey(NumericKeys.SEVEN);
    assert(calculator.display() === '95+7');
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    assert(calculator.display() === '102-');
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    assert(calculator.display() === '102-10/');
    calculator.pressNumericKey(NumericKeys.TWO);
    assert(calculator.display() === '102-10/2');
    calculator.pressOperatorKey(OperatorKeys.MULT);
    assert(calculator.display() === '102-5*');
    calculator.pressNumericKey(NumericKeys.FOUR);
    assert(calculator.display() === '102-5*4');
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();
    expect(displayValue).toEqual('82');

  });



});
