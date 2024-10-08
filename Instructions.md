# Week 6 Class Activity: Structural and Behavioral Design Patterns

In this activity, we will start with a version of the calculator that  
uses the State design pattern to implement operator precedence.

## Key Ideas

In this activity, we will follow these steps:
1. Understand how the `State` design pattern is used to implement operator precedence
2. Refactor the code to introduce the `Observer` design pattern.
3. Update the tests accordingly and run them to make sure that they still pass.
4. Refactor code to remove duplication/inefficiencies.

## Starter Code Overview

To enforce some consistency across implementations (and allow us to build on the same code in future activities), we will start with a Calculator that implements operator precedence using the State design pattern.

The solution was briefly reviewed during today's class, and the design pattern involves the following files:
  * File `calculator-state.interface.ts` declares an interface `ICalculatorState` that defines the functionality of the different states 
  * File `abstract-calculator-state.ts` defines an abstract class `AbstractCalculatorState` that implements `ICalculatorState`. This class contains functionality that is common to all states, and it maintains a reference to the context (i.e., a reference to an instance of `CalculatorModel`)
  * Files `entering-first-number-state.ts`, `entering-second-number-state.ts`, and `entering-third-number-state.ts` define states corresponding to the state machine that was shown in class. The methods in these classes (e.g. `digit` and `binaryOperator` define the state-specific behaviors of the corresponding operations)
  * Class `CalculatorModel` initializes the state machine and delegates all operations to it. It defines a method `changeState` that is invoked by the various concrete states when a state transition is required.


## Getting Started

To begin the activity, run `npm install` in the root of the starter code (location where package.json is present).
Once the installation is complete, run the test commands `npm run test`. You should see the output as below:

```bash
$ npm run test

> week-6-StructuralBehavioral-DP@1.0.0 test
> node scripts/jest.js

 PASS  src/models/calculator.model.spec.ts
  CalculatorModel
    ✓ should contain a CalculatorModel class that implements ICalculatorModel (1 ms)
    ✓ should display `13` when equals is clicked on `7 + 6` (1 ms)
    ✓ should display `5` when equals is clicked on `15 - 10` (1 ms)
    ✓ should display `21` when equals is clicked on `3 * 7` (1 ms)
    ✓ should display `12` when equals is clicked on `144 / 12` (1 ms)
    ✓ should display `14` when equals is clicked on `2 + 3 * 4`
    ✓ should return `90` when equals is clicked on `100 + 200 / 10 - 3 * 10`
    ✓ should display `82` when equals is clicked on `100 + 1 - 8 * 1 * 3 / 4 + 7 - 10 / 2 * 4

 PASS  src/index.spec.ts
  week6-structural-behavioral-DP
    CalculatorModel
      ✓ CalculatorModel exists

Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        0.453 s, estimated 1 s
Ran all test suites.
```

## Introducing the Observer Design Pattern

 ### Step 1
  - please study the code in the classes mentioned above, and make sure that you understand what roles they play in the `State` design pattern

### Step 2  
  We begin by defining our observer. This involves the following steps:

  - Define an interface `ICalculatorObserver` that declares a method 

    ```typescript
    update(message: string): void
    ```
 - Define a class `CalculatorObserver` that implements `ICalculatorObserver` by defining the update method so that it prints the message to standard output 
       
### Step 3
   Next, modify the class `CalculatorModel`, which is the subject in the `Observer` design pattern by 
  - maintaining an array of `ICalculatorObserver`s
  - adding methods `attach` and `detach` for adding and removing observers
  
### Step 4
  - now, define a method 

    ```typescript
    public notify(message: string): void 
    ```
in class `CalculatorModel` that notifies all of the observers of the message

  - note: the `notify` method also needs to be declared in the interface `IContext` that is used by the concrete state classes to refer to the `CalculatorModel`

### Step 5  
  - modify the code so that `notify` is invoked whenever the calculator performs a calculation
  
### Step 6  
  - modify the last test in file `calculator.model.spec.ts` so that it uses the observer
  - confirm that observer prints messages as expected

## Submission

In the root directory, run the command `npm run zip`. This command will generate a zip file called `submission.zip`. Upload the `submission.zip` file to Gradescope and tag your partner on Gradescope on the submission.
