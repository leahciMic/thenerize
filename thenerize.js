'use strict';

var prototypeChain = require('get-prototype-chain');
var capitalize = require('lodash.capitalize');

const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

var getAllProperties = function(obj) {
  var chain = prototypeChain(obj);
  chain
    .filter(x => x !== Object.prototype)
    .map(obj => Object.getOwnPropertyNames(obj))
    .reduce((p, c) => {
      return p.concat(c);
    }, [])
    .filter(x => x !== 'constructor')
    .filter(onlyUnique)
    .forEach((key) => {
      const thenKey = 'then' + capitalize(key);
      obj[thenKey] = function() {
        const args = arguments;
        return () => {
          return obj[key].apply(obj, arguments);
        };
      };
    });
    return undefined;
};

module.exports = getAllProperties;
