
### Currency Converter
## Task
#### Description

**Header with Exchange Rates**
- Display current exchange rates (USD, EUR) against UAH in the header.
- Exchange rates are fetched from a public API.

**Currency Conversion Component**
- Each currency has its own input and select elements.
- Separate input+select for the first currency and separate input+select for the second currency.
- The input is used to specify the number of units to convert.
- Each select should have at least three currencies: UAH, USD, EUR.
- Conversion should work in both directions:
  - Changing the value in the first currency should update the value in the second, and vice versa.
  - Changing the currency in either select should correctly update the conversion values for both currencies.

## Implementation

I implemented this task using Angular. The application fetches current exchange rates from a public API and displays them in the header. The currency conversion component allows users to input values and select currencies, automatically updating conversion rates in both directions based on user input and selected currencies.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
