import { fuzz } from "./fuzz";
import fc from "fast-check";

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
