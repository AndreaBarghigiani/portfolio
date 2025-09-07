---
title: Replicate the classNames function
date: 2025-01-09
tags: JavaScript, GFE 75 
seo:
  title: Replicate the classnames function
  description: The classNames function is one of my favourite helpers when I create components. It plays so nicely with Tailwind and thanks to this GFE 75 challenge.
  type: article
  keywords: JavaScript, GFE 75
---
I am pretty sure that if you're reading this article, you are a FrontEnd Developer, and if your focus is on the React library, the package `classnames` (or `class`) should ring a bell.

If it doesn't, well probably you haven't such need yet or maybe you're deep into Styled Components.

It does not even matter. In the third challenge of the GFE 75 interview questions that you can find in the GreatFrontEnd platform, you're gonna **build your own**. All you have to understand now is what this function does.

### What `classnames` package do?

In JSX if you have the need to conditionally apply a `class` to an HTML element, one of the quickest approaches it to turn the `className` string into a template string and use ternaries to add/remove the class based on the component state.

Here's an example on how it could be accomplished:

```tsx
export default function Text({
  text,
  isMobile = false,
  bgColor = 'red',
}: {
  text: string;
  isMobile: boolean;
  bgColor: 'blue' | 'red' | 'green';
}) {
  return (
    <p
      className={`text-white flex gap-4
				${isMobile && 'flex-col'} 
				${bgColor === 'blue' ? 'bg-blue-400' : 'bg-stone-400'}
			`}
    >
      {text}
    </p>
  );
}
```

This little example is also probably wrong because I don't properly check that each class added will have a space in front of it. But this is one of the reasons that pushed me away from this kind of approach.

Generally speaking, while there's nothing wrong with it, I like to reduce the number or complexity of ternary operators I use in my JSX, especially if they grow.

In the specific case of `classnames`, we have a powerful function that's able to take different data structures and return a simple string of classes that we can attach to our HTML element.

The same paragraph that we used earlier, could be written like so:

```tsx
export default function Text({
  text,
  isMobile = false,
  bgColor = 'red',
}: {
  text: string;
  isMobile: boolean;
  bgColor: 'blue' | 'red' | 'green';
}) {
	const pClass = classNames('text-white flex gap-4 bg-stone-400', {
		'flex-col': isMobile,
		'bg-blue-400': bgColor === 'blue',
		'bg-green-400': bgColor === 'green',
	});
	
	return (
		<p className={pClass}>
		  {text}
		</p>
	);
}
```

As you can see, this syntax separates the logic of building the string of classes for the element from the actual part where we use it.

Besides the fact that you can always put it inline if you do not like this approach, the thing that I find really powerful is that `classNames` can accept any kind of data as an argument. In the example, we saw how it handles `string` and `objects`, but it can also accept `array` and recursively iterate over it.

I suggest you to have a look at the [Usage section of the package description](https://github.com/JedWatson/classnames?tab=readme-ov-file#usage), you'll also discover that we can also have **dynamic classes** that read the value from the component props or state!

Enough talking, let's check with what code we get welcomed from the challenge.

##### Use Cases

```js
classNames('foo', 'bar'); // 'foo bar'
classNames('foo', { bar: true }); // 'foo bar'
classNames({ 'foo-bar': true }); // 'foo-bar'
classNames({ 'foo-bar': false }); // ''
classNames({ foo: true }, { bar: true }); // 'foo bar'
classNames({ foo: true, bar: true }); // 'foo bar'
classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
classNames(['foo', 'bar', 'qux']) // 'foo bar qux'
classNames('foo', ['bar', { qux: false, baz: true }]); // 'foo bar baz
```

These examples should give you a hint on how the `classNames` function works internally. In the case of a `string` or `number`, the function simply converts the numbers and returns a string, with each argument separated by a space.

If in the list of arguments it finds an `object`, it then loops over each of its keys (that will also be used as the class string itself) and adds to the returning string only the keys that have a value of `true`.

If it's an array instead, it must loop over each item and behave according to the implementation we just defined.

I already started to have some ideas about it, then I checked the starting code:

```ts
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  throw 'Not implemented!';
}
```

Don't get distracted by the extended type definitions. What caught my attention was the presence of the `...args` rest operator that made `classNames` accept an array containing all the parameters passed to the function. While I hinted at you before, this moment changed the way I wanted to call `classNames` recursively, since I was accepting an array of possible values, I had to handle the case that the first item of `args` is an array itself.

Instead of recursively calling `classNames`, I created a closure function that gets called on each item of `args`.

```ts
export default function classNames(...args: Array<ClassValue>): string {
  // The variable holding the list of classes
  let classnames: string[] = []
  
  // The closure that will update the list of classes
  function processItem(item: ClassValue) {
    // 1. Check if item is not falsy, aka we can work with the value
    
    // 2. Define actions on item type. It's the recursive function.
      // 2.a. If array, recursively call processItem
      // 2.b. If object, iterate over its keys and conditionally add new classes
      // 2.c. If number or  string, just add the class
  }
  
  // Call processItem for each item in args
  args.forEach(processItem); 
  
  return classnames.join(' ')
}
```

Following the plan let's start to implement each step, starting by the check for falsy values.

```ts
function processItem(item: ClassValue) {
	if (!item) return;
}
```

Now that we have a value that we can work on, it's time to check its type and decide the next step to take.

I thought of creating a utility function able to return a string able to tell me if the value was an `array`, `object`, `string`, or `number`, but in the end, I was just duplicating the logic for a minor advantage.

So, I decided to keep things simple and leave the logic inside the function:

```ts
function processItem(item: ClassValue) {
  if (!item) return;

  // 2. Block to define processes based on item type, it's the recursive function
  if (Array.isArray(item)) {
    // 2.a. If array, recursively call processItem
  } else if (typeof item === 'object') {
    // 2.b. If object, iterate over its keys and conditionally add new classes
  } else if (typeof item === 'string' || typeof item === 'number') {
    // 2.c. If number or  string, just add the class
  }
}
```

Let's start with the simplest thing: what to do if the `item` is a `string` or a `number`. In this case, all we need to do is add the value to the `classnames` array, making sure it's a `string`.

```ts
/* ... */

} else if (typeof item === 'string' || typeof item === 'number') {
  classnames.push(item.toString());
}

/* ... */
```

As simple as that.

Now we move one step above, and we start to handle the case where an `item` is an `object`.

> This check came after the `Array.isArray(item)` check because if we were to do a `typeof item === 'object'` on an array, we set the wrong logic since Array **is** an object type.

```ts
/* ... */

} else if (typeof item === 'object') {
  Object.entries(item).forEach(([key, value]) => {
    if (value) classnames.push(key);
  });
}
/* else if('string' || 'number") */

/* ... */
```

This snippet does a lot, but I didn't feel of creating variables because I thought it was straightforward, let's check what it does anyway:

- We convert all proprieties inside the object into an array, thanks `Object.entries`.
    
- We loop over each item and destructure its values as `key` and `value`. `key` will be the class name/s we want to apply while `value` will coerced into a truthy or falsy value.
    
- In case `value` is truthy, we add the item to `classnames` array.
    

Now, for the part you were waiting for, what do we do if the `item` is an array and it holds multiple values we want to process?

Well, it's time for some recursion!

You heard that right, in case `item` is an array, we recursively call `prosessItem` to loop over each item contained and decide the action in case `item` is an `object`, a `string`, a `number`, or a new Array itself!

```ts
if (Array.isArray(item)) {
  item.forEach(processItem);
}
```

Thanks to the `Array.isArray` built-in method, I will ensure that the `item` I am currently processing is an array. Then, I will pass each value into the same `processItem` function that I've defined.

The check will start again, ending in a value I can add to `classnames`.

> If you're curious about `item.forEach(processItem)` call, instead of relying on something like `item.forEach(subItem => processItem(subItem))` I want to tell you that this is not magic. Many built-in array methods automatically pass arguments to the callback functions we use, and since we reference `processItem`, we pass all the attributes to it. The ones that the function will not use are ignored.

Now that we have handled all the cases it's time to check the entire `classNames` function once more:

```ts
export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  let classnames: string[] = []
  
  function processItem(item: ClassValue) {
    if(!item) return;

    if (Array.isArray(item)) {
      item.forEach(processItem);
    } else if (typeof item === 'object') {
      Object.entries(item).forEach(([key, value]) => {
        if (value) classnames.push(key);
      });
    } else if (typeof item === 'string' || typeof item === 'number') {
      classnames.push(item.toString());
    }
  }

  args.forEach(processItem);
  
  return classnames.join(' ')
}
```

### Compare with proposed solutions

If this is not the first article you have read about my GreatFrontEnd experience, you know that after describing how I came up with my solution, I like to dive deep into the platform's proposed solutions.

It's a good exercise that allows me to reflect on the code I just wrote, analyze it, and discover different approaches.

In this case, the platform proposes three different solutions and a follow-up (in case you want to filter out duplicate classes). I will not share here each solution, in the end [this challenge is even free](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/classnames) so as usual my advice is just to create an account on GreatFrontEnd and start practicing.

What I'll do instead is to summarize the different approaches and talk about the main difference between my code and the solutions:

1. **Pure recursive function**: the first solution involves the call of `classNames` itself. That has been my first attempt, but while I was typing a TypeScript error about the arguments made me doubt about it. Happy to say that the proposed solution works well, and probably my was just a typo.
    
2. **Inner recursive helper that modifies an external value**: this has been my approach in this article. Even though inside the solution we have the `classNamesImpl` closure, it pratically does the same of our `processItem` one.
    
3. **Inner recursive helper that modifies the argument**: even though this is still a closure, as the previous approach, here we pass the `classnames` value to each call of the `classNamesImpl`, making the relation explicit with the array that holds all classes and passing the new one to the next call of `classNamesImpl`.
    

Let's talk about the findings that I had while comparing my code with the proposed solutions.

I am quite happy that, while I do not recursively call `classNames`, my solution is close to the one proposed by the first approach. However, I also found some approaches, which are also repeated in other solutions, that could have improved the readability of my code.

First and foremost, we need to talk again about _talking variable names_.

All the proposed solutions have `const argType = typeof item`. Instead of repeating `typeof item ===` at each check, the developer that proposed the solutions decided to create a simple variable that held such value and reduced the complexity of each check while reducing the need for comments in the code.

An approach that I found interesting is that for the second and third solutions, the ones where we create a named inner recursive helper function, the loop `args.forEach` is present **inside** the function itself.

```ts
export default function classNames(...args: Array<ClassValue>): string {
  let classnames: string[] = []
  
  function classNamesImpl(...args: Array<ClassValue>) {
      args.forEach((arg) => {
        // Apply logic on arg type
      })
  }
  
  // Call implementation by spreading args
  classNamesImpl(...args);

  // Return a string of classnames
  return classnames.join(' ');
}
```

While this is a valid approach, I preferred to keep the loop separate from the function and make it process just a single item.

If you aim to maximize compatibility with older browsers that run pre-ES2017 syntax, instead of `Object.entries`, you could leverage a different approach when handling objects. However, I do not want to ruin all the fun, so I invite you once more to [solve the challenge yourself](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/classnames?fpr=cupofcraft) (or just check the solutions).