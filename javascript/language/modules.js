// A module has 3 parts:
// IMPORTS - dependencies
// CODE    - functionality
// EXPORTS - external interface (API)
//
// Benefits:
// * Reusability - npm packages
// * Composability - should be easily deletable, explicit API and dependencies
// * Isolation - easier to understand and work with focused functionality
// * Leverage - open source libraries
// * Organization - namespacing

// 1. WITH NAMED FUNCTION WRAPPERS MANY VARIABLES
// ARE ADDED TO GLOBAL NAMESPACE: APP AND GETUSERSWRAPPER

const APP = {};

function getUsersWrapper() {
  const users = ['diego', 'juan'];

  function getUsersFromWrapper() {
    return users;
  }

  APP.getUsers = getUsersFromWrapper;
}

getUsersWrapper();


// 2. WITH ANONYMOUS IIFES ONLY APP IS ADDED TO THE GLOBAL NAMESPACE


// eslint-disable-next-line func-names
(function () {
  const users = ['diego', 'luis'];

  function getUsersFromIIFE() {
    return users;
  }

  APP.getUsers2 = getUsersFromIIFE;
}());

// Problems with IIFEs pattern for modules:
// - Still need to add at least one variable to globla namespace -> posible collisions
// - The order of the scripts is important as APP must always be defined first

// 3. COMMONJS MODULES
//
// Natively baked into Node but they do not work asynchronously and
// are not supported on browsers,
// that's why we use a module bundler (webpack) to transform all files written
// with CommonJs modules into a single file that can be run on the browser

// Each file always has his own module

const users = ['diego', 'luis'];

function getUsers() {
  return users;
}

// Explict exporting variables into exports object
module.exports.getUsers = getUsers;
module.exports.hello = 'hola!';

// 3. ES Modules
//
// - Support Async
// - use "import" keyword instead of require
// - use "export function foo() {}" syntax instead of "module.exports.foo = foo" object
