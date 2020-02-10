// Problem: we need a way to share functionality for different objects

// solution 1:
// create an object to contain all the common functionality
const SharedLogic = {
  foo(x) {
    this.fooArg = x;
    return x - 5;
  },
  bar(x) {
    this.barArg = x;
    return x * 3;
  },
  something: 'hi from shared logic',
};

// and use Object.create to delegate properties to the previous object
const someObject = Object.create(SharedLogic);
someObject.hello = 'HI';

console.log(someObject.foo(10));
console.log(someObject.fooArg);

// define a constructor function to make the object creation repeatable:
//
function ObjectCreator(arg1, arg2) {
  const newObject = Object.create(SharedLogic);
  newObject.prop1 = arg1;
  newObject.prop2 = arg2;
  return newObject;
}

const instance = ObjectCreator('hi from arg', 'hi from another arg');


console.log(instance.prop1);
console.log(instance.prop2);
console.log(instance.something);
console.log(instance.foo(23));
console.log(instance.bar(-5));


// A PROTOTYPE IS A PROPERTY THAT EVERY FUNCTION HAS THAT POINTS TO AN OBJECT
// EXCEPT FOR ARROW FUNCTIONS, THEY DON'T HAVE A PROTOTYPE
function someFunc() {}

console.log(typeof (someFunc.prototype));

const arrowFunc = () => { };

console.log(typeof (arrowFunc.prototype));

// A PROTOTYPE IS A PROPERTY THAT EVERY FUNCTION HAS THAT POINTS TO AN OBJECT
// EXCEPT FOR ARROW FUNCTIONS, THEY DON'T HAVE A PROTOTYPE

// Solution 2:
// Use the constructor function prototype object to store common logic
function ImprovedObjectCreator(oneArg, otherArg) {
  const newInstance = Object.create(ImprovedObjectCreator.prototype);

  newInstance.prop1 = oneArg;
  newInstance.prop2 = otherArg;

  return newInstance;
}

ImprovedObjectCreator.prototype.aMethod = function (x) {
  console.log(`substracting 5 from ${x}`);
  this.addedPropFromPrototypeFunction = `${this.prop1} I was added from prototype`;
  return x - 5;
};

const obj = ImprovedObjectCreator('from arg', 'from other arg');

console.log(obj.prop2);
console.log(obj.aMethod(23));
console.log(obj.addedPropFromPrototypeFunction);

const obj2 = ImprovedObjectCreator('from arg for other obj',
  'from other arg for other obj');

console.log(obj2.prop2);
console.log(obj2.aMethod(-123));
console.log(obj2.addedPropFromPrototypeFunction);

// Solution 3:
// Use the "new" keyword

function ImprovedObjectCreatorUsingNew(oneArg, otherArg) {
  // javascript automatically setups delegation
  // when using the 'new' keyboard before function call
  // const this = Object.create(ImprovedObjectCreatorUsingNew.prototype);

  this.prop1 = oneArg;
  this.prop2 = otherArg;

  // return this;
}

ImprovedObjectCreatorUsingNew.prototype.hi = 'hi from prototype!!';

const instanceCreatedWithNew = new ImprovedObjectCreatorUsingNew(1, 2);

console.log(instanceCreatedWithNew.prop2);
console.log(instanceCreatedWithNew.hi);

// Solution 4
// use the new class syntax
// this way is just syntactical sugar for the previous method

class ThisIsaClass {
  constructor(x, y) {
    this.prop1 = x;
    this.prop3 = y;
  }

  someMethod(foo) {
    return `${foo} | that was the arg for a method call and this ${this.prop1}
      is from constructor`;
  }

  // static methods are not added to the class prototype but to the class objecvt
  // so they are not available for instances
  static thisIsAClassMethod() {
    return 'hi from class method';
  }
}

const classInstance = new ThisIsaClass(432, 53);

console.log('^^^^^^^^^^^^^^^^^^^^^');
console.log(classInstance.prop3);
console.log(classInstance.someMethod('pipi'));
console.log(classInstance.thisIsAClassMethod);
console.log(ThisIsaClass.thisIsAClassMethod());
console.log('^^^^^^^^^^^^^^^^^^^^^');

// every prototype has a constructor property that points to the original function

function func() {}

console.log(func.prototype.constructor === func);
console.log(classInstance.constructor.thisIsAClassMethod());
