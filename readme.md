# Fuzz-check

Thin wrapper for certain parts of the [fast-check
package](https://github.com/dubzzz/fast-check). It currently only
supports property tests.

## Usage

``` bash
npm i -D fuzz-check
```

In your test files:

``` javascript
import { fuzz, fc } from "fuzz-check";

describe("Your tests go here", () => {
  it("subtracts a number from itself", () => {
    fuzz(fc.integer())((n: number) => expect(n - n).toEqual(0));
  });
});
```

The `fuzz` function is a higher order function that takes a number of
`Arbitrary<T>` parameters and returns a function that takes an
assertion. If you're familiar with the `fast-check` API: the last
argument goes in the second function, everything else goes in the first
one.

The `fc` export is a pure re-export of `fast-check`. As such, you don't
need it as a separate package if you're using this one.

## Motivation

When looking for a property/fuzz testing package for JS, the [fast-check
package](https://github.com/dubzzz/fast-check) was the only one I found
that looked decent, but I thought the API was a bit verbose, especially
when using TypeScript. I wanted something that was easier to use.

``` javascript
// examples
const square = (n: number) => n * n;

// using the standard fc methods
it("runs a test the verbose way", () => {
  fc.assert(
    fc.property(fc.integer(), (n: number) => {
      expect(square(n)).toEqual(n * n);
    }),
  );
});

// using the fuzz wrapper
it("runs a test using `fuzz`", () => {
  fuzz(fc.integer())((n: number) => expect(square(n)).toEqual(n * n));
});
```

And if you want to make it even shorter, you can define the assertion
outside of the function.

``` javascript
const expectSquare = (n: number) => expect(square(n)).toEqual(n * n);
it("accepts predefined assertions", () => {
  fuzz(fc.integer())(expectSquare);
});
```

By making `fuzz` a higher order function, we can even pre-apply
generators and reuse them over multiple tests:

``` javascript
const natFuzz = fuzz(fc.nat());
it("makes it easier to generate fuzz tests", () => {
  natFuzz((n: number) => expect(n).toEqual(n));
});

it("lets you reuse the same setup for multiple tests", () => {
  natFuzz((n: number) => expect(n - n).toEqual(0));
});
```

## Future goals?

Due to this being purely a function of me scratching my own itch, it
will likely continue to gain features as I find more things that I can
use. At the moment it covers my basic needs, but we'll see how it goes.
Any suggestions and pull requests are of course welcome :)

## Authors

Thomas Hartmann
