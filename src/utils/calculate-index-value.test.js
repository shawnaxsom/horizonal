import calculateIndexValue from "./calculate-index-value";

describe("calculate-index-value", () => {
  it("can calculate 100% index", () => {
    expect(calculateIndexValue(0, 50)).toEqual(100);
  });
});
