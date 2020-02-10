// As you learned in the previous post, about 80% of the time there will be an
// object to the “left of the dot”. That’s why the first step you should take
// when figuring out what the this keyword is referencing is to “look to the
// left of the dot”. But, what if there is no dot?

// Explicit Binding
// Looking at the code we saw last post, what if instead of our greet function
// being a method on the user object, it was just its own standalone function.

function greet() {
  console.log(`Hello, my name is ${this.name}`);
}

const user = {
  name: 'Tyler',
  age: 27,
};

// We know that in order to tell what the this keyword is referencing we first
// have to look at where the function is being invoked. Now, this brings up the
// question, how can we invoke greet but have it be invoked with the this
// keyword referencing the user object. We can’t just do user.greet() like we
// did before because user doesn’t have a greet method. In JavaScript, every
// function contains a method which allows you to do exactly this and that
// method is named call.

// “call” is a method on every function that allows you to invoke the function
// specifying in what context the function will be invoked.

// With that in mind, we can invoke greet in the context of user with the following code -

greet.call(user);

// Again, call is a property on every function and the first argument you pass
// to it will be the context (or the focal object) in which the function is
// invoked. In other words, the first argument you pass to call will be what
// the this keyword inside that function is referencing.

// This is the foundation of rule #2 (Explicit Binding) because we’re
// explicitly (using .call), specifying what the this keyword is referencing.

// Now let’s modify our greet function just a little bit. What if we also
// wanted to pass in some arguments? Say along with their name, we also wanted
// to alert what languages they know. Something like this

function greet2(l1, l2, l3) {
  console.log(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`,
  );
}

// Now in order to pass arguments to a function being invoked with .call, you
// pass them in one by one after you specify the first argument which is the
// context.

const languages = ['JavaScript', 'Ruby', 'Python'];

greet2.call(user, languages[0], languages[1], languages[2]);

// This works and it shows how you can pass arguments to a function being
// invoked with .call. However, as you may have noticed, it’s a tad annoying to
// have to pass in the arguments one by one from our languages array. It would
// be nice if we could just pass in the whole array as the second argument and
// JavaScript would spread those out for us. Well good news for us, this is
// exactly what .apply does. .apply is the exact same thing as .call, but
// instead of passing in arguments one by one, you can pass in a single array
// and it will spread each element in the array out for you as arguments to the
// function.

// So now using .apply, our code can change into this (below) with everything else staying the same.

// greet.call(user, languages[0], languages[1], languages[2])
//
greet2.apply(user, languages);

// So far under our “Explicit Binding” rule, we’ve learned about .call as well
// as .apply which both allow you to invoke a function, specifying what the
// this keyword is going to be referencing inside of that function. The last
// part of this rule is .bind. .bind is the exact same as .call but instead of
// immediately invoking the function, it’ll return a new function that you can
// invoke at a later time. So if we look at our code from earlier, using .bind,
// it’ll look like this

const newFn = greet2.bind(user, languages[0], languages[1], languages[2]);

newFn(); // alerts "Hello, my name is Tyler and I know JavaScript, Ruby, and Python"
