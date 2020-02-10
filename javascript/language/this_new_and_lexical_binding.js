// Up until this point we’ve covered the “Implicit” binding and the “Explicit”
// binding. Next, and the third rule for figuring out what the this keyword is
// referencing, is called the new binding. If you’re unfamiliar with the new
// keyword in JavaScript, whenever you invoke a function with the new keyword,
// under the hood, the JavaScript interpretor will create a brand new object
// for you and call it this. So, naturally, if a function was called with new,
// the this keyword is referencing that new object that the interpretor
// created.

function User(name, age) {
  /*
    Under the hood, JavaScript creates a new object called `this`
    which delegates to the User's prototype on failed lookups. If a
    function is called with the new keyword, then it's this new object
    that interpretor created that the this keyword is referencing.
  */

  this.name = name;
  this.age = age;
}

const me = new User('Tyler', 27)

// Lexical Binding
// At this point, we’re on our 4th rule and you may be feeling a bit
// overwhelmed. That’s fair. The this keyword in JavaScript is arguably more
// complex than it should be. Here’s the good news, this next rule is the most
// intuitive.

// Odds are you’ve heard of and used an arrow function before. They’re new as
// of ES6. They allow you to write functions in a more concise format.
//
const friends = ['pepe', 'toto'];

friends.map((friend) => friend.name);

// Even more than conciseness, arrow functions have a much more intuitive
// approach when it comes to this keyword. Unlike normal functions, arrow
// functions don’t have their own this. Instead, this is determined lexically.
// That’s a fancy way of saying this is determined how you’d expect, following
// the normal variable lookup rules. Let’s continue with the example we used
// earlier. Now, instead of having languages and greet as separate from the
// object, let’s combine them.

// Earlier we assumed that the languages array would always have a length of 3.
// By doing so, we were able to use hardcoded variables like l1, l2, and l3.
// Let’s make greet a little more intelligent now and assume that languages can
// be of any length. To do this, we’ll use .reduce in order to create our
// string.

// const user = {
//   name: 'Tyler',
//   age: 27,
//   languages: ['JavaScript', 'Ruby', 'Python'],
//   greet() {
//     const hello = `Hello, my name is ${this.name} and I know`

//     const langs = this.languages.reduce(function (str, lang, i) {
//       if (i === this.languages.length - 1) {
//         return `${str} and ${lang}.`
//       }

//       return `${str} ${lang},`
//     }, "")

//     console.log(hello + langs)
//   }
// }

// That’s a lot more code but the end result should be the same. When we invoke
// user.greet(), we expect to see Hello, my name is Tyler and I know
// JavaScript, Ruby, and Python.. Sadly, there’s an error. Can you spot it?
// Grab the code above and run it in your console. You’ll notice it’s throwing
// the error Uncaught TypeError: Cannot read property 'length' of undefined.
// Gross. The only place we’re using .length is on line 9, so we know our error
// is there.

// if (i === this.languages.length - 1) {}

// According to our error, this.langauges is undefined. Let’s walk through our
// steps to figure out what that this keyword is referencing cause clearly,
// it’s not referencing user at it should be. First, we need to look at where
// the function is being invoked. Wait? Where is the function being invoked?
// The function is being passed to .reduce so we have no idea. We never
// actually see the invocation of our anonymous function since JavaScript does
// that itself in the implementation of .reduce. That’s the problem. We need to
// specify that we want the anonymous function we pass to .reduce to be invoked
// in the context of user. That way this.languages will reference
// user.languages. As we learned above, we can use .bind.

const user = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`

    const langs = this.languages.reduce(function (str, lang, i) {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`;
      }

      return `${str} ${lang},`;
    }.bind(this), '');

    console.log(hello + langs)
  }
}

user.greet();

// So we’ve seen how .bind solves the issue, but what does this have to do with
// arrow functions. Earlier I said that with arrow functions "this is
// determined lexically. That’s a fancy way of saying this is determined how
// you’d expect, following the normal variable lookup rules."

// In the code above, following just your natural intuition, what would the
// this keyword reference inside of the anonymous function? For me, it should
// reference user. There’s no reason to create a new context just because I had
// to pass a new function to .reduce. And with that intuition comes the often
// overlooked value of arrow functions. If we re-write the code above and do
// nothing but use an anonymous arrow function instead of an anonymous function
// declaration, everything “just works”.

const user2 = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`;

    const langs = this.languages.reduce((str, lang, i) => {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`;
      }

      return `${str} ${lang},`;
    }, '');

    console.log(hello + langs);
  },
};

user2.greet();

// Again the reason for this because with arrow functions, this is determined
// “lexically”. Arrow functions don’t have their own this. Instead, just like
// with variable lookups, the JavaScript interpretor will look to the enclosing
// (parent) scope to determine what this is referencing.

// So putting all of our rules into practice, whenever I see the this keyword
// inside of a function, these are the steps I take in order to figure out what
// it’s referencing.

// 1. Look to where the function was invoked.
//
// 2. Is there an object to the left of the dot? If so, that’s what the “this”
//    keyword is referencing. If not, continue to #3.
//
// 3. Was the function invoked with “call”, “apply”, or “bind”? If so, it’ll
//    explicitly state what the “this” keyword is referencing. If not, continue
//    to #4.
//
// 4. Was the function invoked using the “new” keyword? If so, the “this”
//    keyword is referencing the newly created object that was made by the
//    JavaScript interpreter. If not, continue to #5.
//
// 5. Is “this” inside of an arrow function? If so, its reference may be found
// lexically in the enclosing (parent) scope.
