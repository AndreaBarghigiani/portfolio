---
title: Add a new method to a prototype of an object
date: 2024-12-16
tags: JavaScript, prototype, object
seo:
  title: Add a new method to a prototype of an object
  description: Let's discover how it is possible to add a new method inside the prototype of an object
  type: article
  keywords: JavaScript, prototype, object
---
JavaScript is such a powerful language!

Even though it sometimes looks confusing, especially with some weird behavior around string comparison 😅, it is still one of my favorite languages to work with for its flexibility.

I was working on a task for GreatFrontEnd, and I was asked to create a `square` function for all the Arrays objects.

This requires me to jump on the **prototypal inheritance** of JavaScript itself. The approach on which the language bases its entire OOP capabilities.

It is out of my scope to define how this approach differs from the classical inheritance of OOP languages like Java, C++, or Python.

All I think you need to know to understand this article is: _"The prototyping approach is a mechanism where new objects inherit props and methods from a prototype object. While modern JavaScript includes_ `class` and `constructor` syntax like other OOP languages, they are just syntactic sugar over the prototype chain."

With that out of the way, I would like to spend some time discussing when it is a good idea and when not.

Oh right, maybe you just want to see the code for the `square` method that I was tasked to introduce inside the `Array.prototype`. Here you go:

```js
Array.prototype.square = function () {
  return this.map(num => num * num)
};
```

As you can see, it's a pretty simple method. You loop over the array that's calling the `square` method (the `this` keyword) with `map,` then multiply the current item for itself. I've used `map` because one of the task requirements was not to modify the current array.

Now you can call the method against any array in your codebase, when you will `myArray.square()` the JavaScript engine knows what to do and you can sit back and relax.

The thing is, is it a good idea to introduce a new method to the prototype (the blueprint) of an object that will be available everywhere?

There are pros and cons to it.

Some of the pros are:

- **performant reusability:** since the method you define will be shared across all instances of the object, the memory usage will be reduced.
    
- **enhance objects:** because you're adding functionalities right with the object.
    
- **custon domain-specific features:** maybe you're project if focused on text transformations, if so a `capitalize` method added to `String.prototype` maybe makes sense.
    
- **less boilerplate:** you don't need to import and wrap your objects around utility functions, like `squareArray(myArray)`
    

But it's not all good. Such changes, like modify the prototype of an object, needs to be approved by the entire team because also have some cons:

- **impact on all the codebase:** when you add something to prototype you're changing all of its instances, and this is especially dangerous when we use libraries that use the same name for a method, leading to bugs.
    
- **breaks encapsulation:** changing the structure of a built-in object makes harder to reason about code behavior.
    
- **compatibility issues:** what if a new version of JavaScript implements the same method name as you have in your code?
    
- **non-standard practice:** this approach was used a while ago, but today it's not considered standard anymore because we can leverage modules.
    

I don't know about you, but personally, I think it is not particularly helpful to add new methods to the built-in objects I use every day. It could be because I tend to work on many projects, and I find it more intuitive to reuse my utility functions instead of polluting an object's prototype.

So even though I completed the task by adding `square` to the prototype of `Array`, in my codebases, you'll find references to utility functions that I move from project to project.