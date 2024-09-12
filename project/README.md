# UUGame
Test assignment

Task: Mini-game.
A 10x10 grid of squares (blue) is provided, along with a "Start" button, an input field (N - time in milliseconds), and a score line (player/computer).

After pressing the "Start" button:

A random cell on the grid (blue) is highlighted (turns yellow).
If the player manages to click on the highlighted cell (yellow) within N milliseconds, the cell turns (and remains) green, and the player earns one point.
If the player fails to click the cell (yellow) within this time, the cell turns (and remains) red, and a point is awarded to the computer.
If either the player or the computer reaches 10 points, the game ends, and the player should see a message displaying the game results in a popup modal window (do not use the standard alert window), otherwise, the game continues from step one.
The game should be implemented using: Angular 15+, HTML 5, CSS 3, RxJS (without using ngrx).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
