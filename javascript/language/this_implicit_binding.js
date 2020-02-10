// Before diving into the specifics of the this keyword in JavaScript,
// it’s important to take a step back and first look at why the this
// keyword exists in the first place. The this keyword allows you to
// reuse functions with different contexts.
// Said differently, the “this” keyword allows you to decide which
// object should be focal when invoking a function or a method.
// Everything we talk about after this will build upon that idea.
// We want to be able to reuse functions or methods in different
// contexts or with different objects.

// The first thing we’ll look at is how to tell what the this keyword is referencing.
// The first and most important question you need to ask yourself when
// you’re trying to answer this question is “Where is this function being invoked?”.
// The only way you can tell what the this keyword is referencing is by
// looking at where the function using the this keyword was invoked.

// To demonstrate this with an example you’re already familiar with,
// say we had a greet function that took in a name an alerted a welcome message.

function greet(name) {
  console.log(`Hello, my name is ${name}`);
}

// If I were to ask you exactly what greet was going to alert,
// what would your answer be? Given only the function definition,
// it’s impossible to know.
// To know what name is, you’d have to look at the function invocation of greet.

greet('Tyler');

// It’s the exact same idea with figuring out what the this keyword is referencing.
// You can even think about the this keyword as you would a normal argument
// to a function - it’s going to change based on how the function is invoked.

// Now that you know the first step to figuring out what the this keyword
// is referencing is to look at where the function is being invoked,
// what’s next? To help us with the next step, we’re going to establish
// 4 rules or guidelines.

// Implicit Binding
// Explicit Binding
// new Binding
// Lexical Binding
// Implicit Binding

// Remember, the goal here is to be able to look at a function definition using
// the this keyword and tell what this is referencing. The first and most common
// rule for doing that is called the Implicit Binding. I’d say it’ll tell you
// what the this keyword is referencing about 80% of the time.

// Let’s say we had an object that looked like this

const user = {
  name: 'Tyler',
  age: 27,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// Now, if you were to invoke the greet method on the user object, you’d do so
// be using dot notation.

user.greet();

// This brings us to the main keypoint of the implicit binding rule. In order to
// figure out what the this keyword is referencing, first, look to the left of
// the dot when the function is invoked. If there is a “dot”, look to the left
// of that dot to find the object that the this keyword is referencing.

// In the example above, user is to “the left of the dot” which means the this
// keyword is referencing the user object. So, it’s as if, inside the greet
// method, the JavaScript interpretor changes this to user.

// greet() {
  // console.log(`Hello, my name is ${this.name}`)
  // console.log(`Hello, my name is ${user.name}`) // Tyler
// }

// Let’s take a look at a similar, but a slightly more advanced example. Now,
// instead of just having a name, age, and greet property, let’s also give our
// user object a mother property which also has a name and greet property.

const user2 = {
  name: 'Tyler',
  age: 27,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
  mother: {
    name: 'Stacey',
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    },
  },
};

// Now the question becomes, what is each invocation below going to alert?

user2.greet();
user2.mother.greet();

// Whenever we’re trying to figure out what the this keyword is referencing, we
// need to look to the invocation and see what’s to the “left of the dot”. In
// the first invocation, user is to the left of the dot which means this is
// going to reference user. In the second invocation, mother is to the left of
// the dot which means this is going to reference mother.

user2.greet(); // Tyler
user2.mother.greet(); // Stacey

// As mentioned earlier, about 80% of the time there will be an object to the
// “left of the dot”. That’s why the first step you should take when figuring
// out what the this keyword is referencing is to “look to the left of the dot”.
// But, what if there is no dot? We’ll cover that in the next section.
