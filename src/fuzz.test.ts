import { fuzz, fc } from "./index";

describe("Basic functionality tests", () => {
  it("fuzzes integers", () => {
    fuzz(fc.integer())((n: number) => expect(n).toEqual(n));
  });

  const natFuzz = fuzz(fc.nat());
  it("makes it easier to generate fuzz tests", () => {
    natFuzz((n: number) => expect(n).toEqual(n));
  });

  it("lets you reuse the same setup for multiple tests", () => {
    natFuzz((n: number) => expect(n - n).toEqual(0));
  });
});

describe("Readme tests", () => {
  const square = (n: number) => n * n;

  it("runs a test the verbose way", () => {
    fc.assert(
      fc.property(fc.integer(), (n: number) => {
        expect(square(n)).toEqual(n * n);
      }),
    );
  });

  it("runs a test using `fuzz`", () => {
    fuzz(fc.integer())((n: number) => expect(square(n)).toEqual(n * n));
  });

  const expectSquare = (n: number) => expect(square(n)).toEqual(n * n);
  it("accepts predefined assertions", () => {
    fuzz(fc.integer())(expectSquare);
  });
});
