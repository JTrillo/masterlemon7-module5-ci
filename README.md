# masterlemon7-module5-ci
Lemoncode Front-End Master, 7th edition. Module 5 exercise.

[![Build Status](https://travis-ci.com/JTrillo/masterlemon7-module5-ci.svg?branch=master)](https://travis-ci.com/JTrillo/masterlemon7-module5-ci)

## Steps followed

### 1. Install testing libraries
```bash
npm i -D jest @types/jest ts-jest
npm i -D @testing-library/react @testing-library/jest-dom
npm i -D @testing-library/react-hooks react-test-renderer
```

### 2. Add jest configuration
* Create folder `./config/test`
* In this same folder, create file `setup-after.ts`. This file is necessary when we use `jest-dom` from testing-library, and its content should be this:
```ts
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
```
* In this same folder, create file `jest.json` with this content
```json
{
  "rootDir": "../../",
  "preset": "ts-jest",
  "restoreMocks": true,
  "setupFilesAfterEnv": ["<rootDir>/config/test/setup-after.ts"], // jest-dom
  "moduleDirectories": ["<rootDir>/src", "node_modules"]
}
```
* Finally, add two new scripts to `package.json`
```diff
"scripts": {
  "start": "run-p -l start:dev start:mock-server",
  "start:dev": "webpack-dev-server",
  "start:mock-server": "cd ./server && npm start",
- "postinstall": "cd ./server && npm i"
+ "postinstall": "cd ./server && npm i",
+ "test": "jest -c ./config/test/jest.json --verbose",
+ "test:watch": "npm run test -- --watchAll -i"
},
```

### 3. Add debug configuration

To debug jest specs we will use Visual Studio Code. As we know, VS Code provides by default a node debugger. In order to debug Node.js code, this editor need a file called `launch.json`. On tab *Debug* of VS Code we can select an option to create automatically this file on this route `./.vscode`

We have to modifiy original auto created content with this content
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest single run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "-c",
        "./config/test/jest.json",
        "--verbose",
        "-i",
        "--no-cache"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest watch run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "-c",
        "./config/test/jest.json",
        "--verbose",
        "-i",
        "--no-cache",
        "--watchAll"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest selected file",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "${fileBasenameNoExtension}",
        "-c",
        "./config/test/jest.json",
        "--verbose",
        "-i",
        "--no-cache",
        "--watchAll"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### 4. Add tests:
* [common/mappers/collection.mapper.spec.ts](./src/common/mappers/collection.mapper.spec.ts)
* [pods/hotel-collection/hotel-collection.mapper.spec.ts](./src/pods/hotel-collection/hotel-collection.mapper.spec.ts)
* [common/components/forms/text-field.spec.tsx](./src/common/components/forms/text-field.spec.tsx)
* [pods/hotel-collection/hotel-collection.hook.spec.ts](./src/pods/hotel-collection/hotel-collection.hook.spec.ts)
* [pods/login/login.component.spec.tsx](./src/pods/login/login.component.spec.tsx)
* [pods/login/login.container.spec.tsx](./src/pods/login/login.container.spec.tsx)
* [pods/hotel-collection/hotel-collection.component.spec.tsx](./src/pods/hotel-collection/hotel-collection.component.spec.tsx)
* [pods/hotel-collection/hotel-collection.container.spec.tsx](./src/pods/hotel-collection/hotel-collection.container.spec.tsx)

### 5. Add coverage configuration
* Create file `./config/test/jest.coverage.json`. Is almost the same as `jest.json`.
```diff
{
  "rootDir": "../../",
  "preset": "ts-jest",
  "restoreMocks": true,
  "setupFilesAfterEnv": ["<rootDir>/config/test/setup-after.ts"],
  "moduleDirectories": ["<rootDir>/src", "node_modules"],
+ "collectCoverage": true
}
```
* Install `rimraf` as a development dependency.
```bash
npm i -D rimraf
```
* Add two new scripts on `package.json`
```diff
"scripts": {
  "start": "run-p -l start:dev start:mock-server",
  "start:dev": "webpack-dev-server",
  "start:mock-server": "cd ./server && npm start",
  "postinstall": "cd ./server && npm i",
  "test": "jest -c ./config/test/jest.json --verbose",
- "test:watch": "npm run test -- --watchAll -i"
+ "test:watch": "npm run test -- --watchAll -i",
+ "pretest:coverage": "rimraf coverage",
+ "test:coverage": "jest -c ./config/test/jest.coverage.json"
},
```

### 6. Add travis-ci coverage
We only have to create `.travis.yml` file on root folder. Its content should be:
```yml
language: node_js
node_js:
  - "10"
install:
  - npm install
script:
  - npm test
```