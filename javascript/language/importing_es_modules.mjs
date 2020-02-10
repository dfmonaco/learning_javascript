// Importing the default and one other named function
import thisIsDefault, { toExport } from './es_modules.mjs';

console.log(thisIsDefault());
console.log(toExport());

// Importing everything that was exported into one object

// import thisIsDefault, * as importedStuff from './es_modules.mjs';

// console.log(importedStuff);
// console.log(importedStuff.toExport());
// console.log(importedStuff.add4(10));
// console.log(importedStuff.default());
// console.log(thisIsDefault());
