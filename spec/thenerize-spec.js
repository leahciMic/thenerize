'use strict';
const thenerize = require('../thenerize.js');

describe('thenerize', () => {
  describe('simple objects', function() {
    it('should contain thenerized methods', function() {
      var obj = {
        method1: function() {

        },
        method2: function() {

        }
      };
      thenerize(obj);
      expect(obj).toEqual(jasmine.objectContaining({
        thenMethod1: jasmine.any(Function),
        thenMethod2: jasmine.any(Function)
      }));
    });
  });

  describe('prototype hierarchies', function() {
    class A {
      a() {

      }
    }
    class B extends A {
      b() {

      }
    }
    class C extends B {
      c(a) {
        return a + 'bar';
      }
    }

    let obj;

    beforeEach(() => {
      obj = new C();
      thenerize(obj);
    });

    it('should have thenerized all methods on prototype chain', () => {
      expect(obj).toEqual(jasmine.objectContaining({
        thenC: jasmine.any(Function),
        thenB: jasmine.any(Function),
        thenA: jasmine.any(Function)
      }));
    });

    describe('thenerized methods', () => {
      it('should behave expectedly', () => {
        expect(obj.thenC('foo')()).toEqual('foobar');
      });
    });
  });  
});
