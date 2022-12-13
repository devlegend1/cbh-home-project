# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

There are two main problems with the original version of the function: duplicated logic and complex nested conditionals. The solution to the first problem was to pull the crypto operations out into a separate function called `createPartitionKey`. This is more semantically meaningful and prevents accidentally updating one place but not the other if the logic changes in the future. In order to make the control flow easier to understand, a guard clause is used to immediately return a default value if no argument is passed. The rest of the function can then assume that `event` is defined which removes a level of indentation. The original version of the function declares and initializes the variable `candidate` separately. This can be simplified by moving the conditional logic to an inline ternary expression at the site of declaration. The overall result is a function which can be read in a much more linear manner and does not require the reader to mentally track which values are defined as they navigate different branches of logic.
