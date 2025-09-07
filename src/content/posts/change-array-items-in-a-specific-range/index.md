---
title: Chage array items in a specific range
date: 2024-12-18
tags: JavaScript, array
seo:
  title: Chage array items in a specific range
  description: Arrays are powerful data structures, and we have many standard methods to work with them. Let's learn how to create our owns.
  type: article
  keywords: JavaScript, array
---
[GreatFrontEnd](https://www.greatfrontend.com?fpr=cupofcraft) is becoming my go-to resource for new tasks, tasks that could be asked in an interview setting. It also gives me so many more ideas for topics to write about.

I think that's a win-win situation, don't you?

Anyway, let's get back on track and discuss a new challenge I was working on. The brief was quite simple:

> Build a `fill` function that fills an array with values from `start` up to, but not including `end`. The function must mutate the array.

Here's the arguments accepted:

- `array`: the array to fill    
- `value`: the value to fill the `array` with
- `[start=0]`: the start position
- `[end=array.length]`: the end position

I want to be open and honest in my articles, so do you know what happened? I ended up not finishing the challenge.

When I approach these task I have a specific set of requirements that I want to follow:
- searching on the web or documentation (thanks, [Dash](https://kapeli.com/dash)) is allowed
- chatting with an AI is allowed **only if** the questions that I make do not involve the solution. For example, in this case, I am allowed to discuss the approach that I could take but not have the AI produce any code for me
- don't spend more than 30 min per task (probably for some advanced tasks it won’t be enough)

Before presenting the solution proposed from the platform and my elaboration, I want you to know **why** I failed because there's a lesson that could also be helpful to you.

I failed because I got **too in love with my idea**.

You see, solving problems requires a part of memory and another of creativity. With the first, you scan your brain, looking for something similar that you've already encountered, while with the last, you just start to go off, experiment, and have fun.

In this case, I was too focused on the first part. While trying to solve the exercise, knowledge of `splice`, `slice`, and `at` came to mind, and I started to write a lot of code to make my code respect the specs and pass the tests.

Then the time expired, and my code was still not working.

In an interview situation, this doesn't look good. Not only because you couldn't solve the task they gave you but **especially** because you let your convictions pull you in a direction that wasn't viable. You weren't _"brave"_ enough to trash the first approach and experiment with something different.

This is why I decided to work with coding challenges and side projects while looking for my next position. While you're focused on the code, you also learn something different that will empower your soft skills and the way you work.

In this case, I learned that I must trash ideas and experiment with new approaches sooner.

Back to the code, though, which was the solution proposed by GFE?

## The accepted solution
```js
/**
 * @param {Array} array - The array to fill.
 * @param {*} value - The value to fill the array with.
 * @param {number} [start=0] - The start position.
 * @param {number} [end=array.length] - The end position.
 * @return {Array} Returns the filled array.
 */
export default function fill(array, value, start = 0, end = array.length) {
  const length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  if (end > length) {
    end = length + 1;
  }

  if (end < 0) {
    end += length;
  }

  for (let i = start; i < Math.min(end, length); i++) {
    array[i] = value;
  }

  return array;
}
```

The code works, and it's also easy to reach since each step is defined by an `if`. But I couldn't help myself as see this code and think about how to make it shorter and even easier to understand.

Let's try to define block by block what this function does.

```js
const length = array.length
```

This should be simple; since we will refer many times to the `array.length` value, we will use the variable `length` to save some typing.

```js
if(start < 0){
	start = -start > length ? 0 : length + start;
}
```

Let's begin with the real logic. Since the function we're building does not require accepting negative indexes, the first thing we do is check if the user of the function has passed a negative number by mistake. If so, we will turn the value into a positive number, and we will check if it is greater than the length of our array. If it is, we will start from the beginning of the array by returning `0`; otherwise, we will convert the index into a positive value by adding `length` to `star` so we will be able to use it inside the `for` loop at the end.

```js
if (end > length) {
	end = length + 1;
}
```

Your `for` loop will not run for `end` values, which could be too high. Because if you think about it, if a user inserts an enormous number for `end` and the `array` has only 5 values, our loop will run for no reason. While I understand why this block exists, I wouldn't say I like it because it makes things more confusing.

```js
if (end < 0) {
	end += length;
}
```

And since `end` cannot be negative, well, not even smaller than `start` for that matter, we set at the `length` of the array. If you are thinking _"shouldn't it be_ **_greater_** _than_ `length`, as we did earlier?", you'll need to check the condition of the `for` loop to understand why.

```js
for (let i = start; i < Math.min(end, length); i++){
	array[i] = value
}
```

This is the real deal, the part of the code where we **modify the array's items** and solve the challenge.

First and foremost, we have the `i` variable set at the same value as `start`, which will begin our substitution. Then we check if the current index is still lower than the minimum number between `end` and `length`, and as usual in a `for` loop, if the condition in the middle is `true` - `i` is lower than `end` or `length` - we keep increasing the index.

Then, we will use the index to access the specific position of the array and swap any value that it holds with the `value` passed to the `fill()` function.

## My take on the solution

While this function does what it is requested, personally, I didn't like much how the logic was playing out.

Not that there is something wrong, but I believe that once you find the solution to your task, if you can, you should spend some time and think about optimizing it for both machines (_performance_) and humans (_readability_).

So I've started to check the code, and I started to ask myself:
- shall I reorganize and/or reduce the code that solves the challenge?
- is it possible to simplify the `if`s used and streamline the thinking behind its value?
- there are some array methods that will simplify the code?

Let's start from the last, as far as I've experimented, there is no good array method that lets you loop in an array and that allows you to set a `start` and `end` value. You could achieve something readable with `reduce,` but it increases the complexity of the code, so it's better to avoid it.

But I've found quite satisfying the other two points.

The first thing that I tackled has been the logic for `start` and `end`, and I've been able to made just one-liners.

```js
start = Math.max(start < 0 ? start + length : start, 0);
end = Math.min(end < 0 ? end + length : end, length);
```

The code we had before was using a ternary, so why not use them to just create a one-liner?

For the `start`, we're always interested in the greatest number that we can calculate, that's why we use `Math.max`, then starts (no pun intended) the logic and I think you're gonna like the following deep dive.

Let's start with something these functions have in common: they both use a `Math` method that accepts two or more arguments. In both situations, we use the first ternary operator to generate the first value, and the second is just our base. Now let's discuss the logic of each.

If `start` is negative, we just add to it the value of `length`. Even if the result of `start + length` is still negative, we will still return `0` because we have `Math.max` that considers `0` (the last value we pass to the function) greater than the negative number.

If instead, `end` is a negative value passed by the user, we add `length` to it to convert the negative index to its corresponding positive one. Otherwise, we just return `end`. And in order to get the value that we will use in our `for`, we have to find the minimum value between the `end` that we just calculated and the `length` of the array.

Once we have them, we can setup the same `for` loop as before. Just a little bit simplified:

```js
for (let i = start; i < end; i++) {
    array[i] = value;
}
```

From my perspective, this `for` loop is even simpler to understand (and maybe also more performant) than the one we had before. And that's especially true because we do not use `Math.min` in each loop to understand which value use for `end`, we just use the value we calculated few lines above.

That's it.

```ts
export default function fill<T>(
  array: Array<T>,
  value: any,
  start: number = 0,
  end: number = array.length,
): Array<T> {
  const length = array.length;

  // Normalize indices
  start = Math.max(start < 0 ? start + length : start, 0);
  end = Math.min(end < 0 ? end + length : end, length);

  // Fill the array in the specified range
  for (let i = start; i < end; i++) {
    array[i] = value;
  }

  return array;
}
```

I hope you found this article as useful as it has been for me to write it. I'll keep writing these deep dives on GreatFrontEnd challenges because I am using it extensively to practice my tech interview capabilities since I am looking for a new position 😅