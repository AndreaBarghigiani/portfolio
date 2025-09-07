---
title: Why you need Path Helpers in every Next.js application?
date: 2023-11-19
tags: Next.js, utility functions
seo:
  title: Why you need Path Helpers in every Next.js application?
  description: How to simplify your life by creating a single source of truth for all the paths in your application
  type: article
  keywords: Next.js, utility functions
---
Next.js is a powerful full-stack framework that will help you build everything you can imagine, but don't get fooled. The information that I am about to share with you can be easily applied to any other React application that uses any type of Router implementation (and even without it).

Have you ever worked on a project long enough where you needed to refactor part of it?

I am pretty sure you have, and most of the time, the refactor is a **huge** pain.

## What's the issue with refactoring?

Refactoring is a great practice, don't get me wrong. It allows you to improve your code under many aspects while also applying the new concepts you sweat to learn.

But it is also painful because it requires you to go through your entire code base and replace the old implementation in favor of the new one.

That's not always true because sometimes you've been able to write nice abstractions that allow you just to change the body of a function and keep the implementation as is.

When this happens, we feel like the best developers in the world, but that's not always the case. Especially when we talk about paths...

## How can a path be so harmful?

Paths are great. Many React applications will help our users to _make sense_ of the page they're watching and will allow them to get back to it (or share) by just copying the URL.

We, as developers, can leverage them with the auto code splitting and [colocation features](https://nextjs.org/docs/app/building-your-application/routing/colocation#safe-colocation-by-default) that the new Next.js `app/` folder has implemented. However, at the same time, we can still fall into some issues that will affect us while refactoring our code.

Next.js has always been famous for its [folder as route](https://nextjs.org/docs/app/building-your-application/routing#roles-of-folders-and-files) approach, and so many developers have loved this single feature (myself included) because it makes our life so much easier.

We no longer have to define our routes; thanks to this approach, we just need to create a folder and start coding. What a relief 🤩

At the same time, this ability can lead us to hardcode the URL inside our components.

```jsx
// In a standard Link component
<Link href={`/dashboard/${userId}`}>Dashboard</Link>

// In a redirect
redirect(`/post/${postId}`)

// Or even in a revalidatePath call
revalidatePath(`/(main)/posts`)
```

If you take each function call by itself, there's nothing wrong with them. This kind of code is totally fine, and we have seen it time and time again in pretty much all the applications we made (or we saw in a YouTube video or tutorial).

## The big path issue that nobody is talking about

However, they could be a pain to refactor based on the application size you're working on. What will happen if you need to reorganize the folders in your project?

Let's say that your project is growing, and you need to create siblings of your `dashboard/` folder because you will now have many other pages that will be available under authentication.

Thanks to the new `app/` folder, you know that you just need to leverage the [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) to create a `(auth)/` folder that will logically contain all the pages and components required for an authorized user.

If your application is quite small, you know that you have just to run a project search/replace for `/dashboard` > `/(auth)/dashboard,` and you'll most likely be fine.

But is this the kind of approach that you want to have? Would it be safe to rely on an editor feature hoping for the best?

## The Path Helpers to the rescue

This is a simple approach and it does not involve any kind of rocket science, but before going forward I want to give credit where credit is due.

The Path Helpers approach is not something that I came up with, I wish I had 😅, but instead it is something I learned from the [latest Stephen Grinder's course on Next.js](https://www.udemy.com/course/next-js-the-complete-developers-guide/).

> Stephen is **a great teacher** whom I have followed for many years and never been upset about the quality of his content. While here I am talking about his course on Next.js, in his Udemy profile you'll be able to find many other topics that will help you become a better developer. Does not matter if you are a FrontEnd, BackEnd or DevOps. Stephen has something for you that will help you out 😉

Now that you know who developed this idea, while I believe it's nothing new but just a smart approach, let me show how to implement it.

At this point, it should be clear that hardcoding the URL into our applications is not a good idea because:

- we can make a typing mistake
- we don't leverage the powers of our code editor in suggesting the right spelling
- we don't have any kind of type safety, we just rely on a template string
- we will waste a lot of time in changing the paths if we reorganize our project folders

So, how can we implement the Path Helper approach?

Well, it all starts from a single file.

You can approach this as you like, for my projects, I decided to create a `utils/paths/index.ts` file right under my `src/` folder (I like using it, but if you don't use `src/` you can just put it wherever you feel best).

I've created the `paths/` folder because I could split the `index.ts` file into many more if I need to organize my code even better, but this is not required at all.

```ts
// src/utils/paths/index.ts
const paths = {
  dashboard: (userId: string) => `/dashboard/${userId}`,
  userPosts: (userId: string, view: 'grid' | 'list') => 
    `/dashboard/${userId}/posts?view=${view}`,
  postShow: (postId: string) => `/post/${postId}`,
  postsIndex: () => `(main)/posts`, 
}

export default paths;
```

I understand that this is just a simple example and that you can even argue that's overkill, but if you ask me I **like working this way**. First and foremost, as I told you before, I like it because it gives me autocomplete and I do not have to get crazy to remember the exact path (I am really bad at it 😅).

So if you dig into this approach, from now on all you have to do to use the right path in your application is:

```ts
import paths from `@/utils/paths`

<Link href={paths.dashboard(userId)}>Dashboard</Link>

// In a redirect
redirect(paths.postShow(postId))

// Or even in a revalidatePath call
revalidatePath(paths.postsIndex())
```

Let me know what you think about this approach. I know that we "just" leverage a function to generate the URLs, but do you see the same benefits that I do or do you think that's just a waste of time?

I am really curious to know so don't be shy. Only if we confront each others we will be able to grow even more 😉