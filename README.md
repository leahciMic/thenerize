# thenerize

thenerize walks the passed in objects prototype chain and creates methods
suitable for using in a promise chain. The methods take on the same name as
the original method with a prefix of 'then', and the first letter of the name
capitalized if it's not already.

## Install

```sh
npm install --save thenerize
```

## Usage

```js
const thenerize = require('thenerize');

var promise = new Promise((resolve, reject) => {
  resolve();
});

thenerize(console);

promise
  .then(console.thenLog('hello world'));

// will print hello world when promise resolves
```
