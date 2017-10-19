# Functional Programming with Ramda
A small and basic introduction into functional programming with Ramda.
It reflects *my* experiences with the matter and is from a very practical point of view.

So I don't guarantee that everything I say here is 100% right - mind me, I am also still in the process o learning.
However, I want to show how with little knowledge you can already achieve great readability and structurcal improvements in Code when using FP, especially with the awesome library Ramda.

## Presentation Notes
### What is Functional Programming?
- there are a lot of good blog posts and explanations going into detail
- more often those posts approach the matter on a mathematical level, as that is actually where FP is basically coming from
- I'll try to explain it a little bit more _practical_ and _easy_ here:
    - builds on the principle that almost *everything* is a function. You can do functional programming almost completely without a single variable assignment - however, this is very strict and practically we don't do it that way very often
    - functions should almost always be pure - meaning that for the same input, they always return the same output (no internal state)
    - difference between OOP and FP is actually very easy: OOP is _o.f()_, FP is _f(o)_;
    - state should always be immutable. To change an object, you always create a new one as a copy from the old with the changed values
    => this might sound imperformant or unpractical, but once you get used to it, it actually isn't (at least for me).
    => However, code readability and stability is improved drastically by this.
- FP builds a lot on top of **composition** (which OOP would also if people did it right :P )

### What is Ramda?
- Basically a utility library like lodash & underscore, but based on FP principles
- main difference: While the latter expect the data to work upon FIRST and then the callback, ramda turns it around, e.g:

```
_.forEach([1,2,3], (val) => console.log(val));
ramda.forEach((val) =>  console.log(val), [1,2,3]);

```

- To understand *why* it does it and what great advantages this brings, I'll have to explain currying first:

### Currying
Currying is the process of applying the arguments of a function in several function calls instead of all at once.
The functions logic only gets executed as soon as ALL arguments where applied. This is best explaiend by example:

```

// A normal function with two arguments
const myFunction = (param1, param2) => { console.log(`I got called with ${param1} ${param2}` };
myFunction('Hello', 'World') // I got called with Hello World

// Now lets curry it
import {curry} from 'ramda';
const myCurriedFunction = curry(myFunction);
const myCurriedHelloFunction = myCurriedFunction('Hello'); // does NOT execute the function, but stores the first arugment

```



