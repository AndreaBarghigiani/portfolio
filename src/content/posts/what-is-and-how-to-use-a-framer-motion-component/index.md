---
title: What is and how to use a Framer Motion Component
date: 2024-07-28
tags: Motion, animation
seo:
  title: What is and how to use a Framer Motion Component
  description: A motion component is a standard JSX component that allows us to enhance the React element with props from Framer Motion, which gives our elements special capabilities.
  type: article
  keywords: Motion, animation
---
A motion component is a standard JSX component that allows us to enhance the React element with props from Framer Motion, which gives our elements special capabilities.

The quickest way to use such a component is to import it from the library and use it in our `return` like so:

```js
import { motion } from "framer-motion";

const Component () => {
	return (
		<motion.div>
			<!-- Here you can insert your animated component -->
		</motion.div>
	)
}
```

It is all that is required to have a Framer Motion component that can accept specific properties that will allow us to run our animations.

### React component as Framer Motion component

Now I get it. You've installed Framer Motion, and you can't be bothered to refactor all your components to transform them into Framer Motion ones. Well, where it's needed, at least.

Let's assume you've created the perfect `Card` component and need to animate it for a couple of its instances.

Making it a complete Framer Motion component will be overkill. While the change is minor, the risk that it will break your app somewhere is still present. Also, creating a new `AnimatedCard` component that is an exact replica of the original but turned into a Framer Motion component will create a maintenance nightmare with all the duplicated code, especially if `Card` is not the only component that needs to be animated.

Lucky us, the team behind Framer Motion has our back.

If our component accepts `ref`, we can convert it into a Framer Motion one **just where we need the extra animation powers**.

```jsx
const Card = React.forwardRef((props, ref)) => {
	return <div ref="{ref}" />
}
```

All we have to do is to import the same `motion` but instead of using it in front of our element name, we can call it as a function and pass our component in it.

```jsx
import {motion} from 'framer-motion'
import {Card} from './Card'

const AnimatedCard = motion(Card)

const Page = () => {
	return (
		<AnimatedCard
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
		>
			<h1>Hello</h1>
		</AnimatedCard>
	)
}
```

And here you go; with your Framer Motion component available, you'll be able to animate as you wish.

PS: this is just a little note on Framer Motion and I use this space to collect the information I gather from my studies, so if you're curious to know more about Framer Motion and, but not only, React animation in general start following me 😉