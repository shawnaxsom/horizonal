import calculateComfortIndex from "./calculate-comfort-index";

describe("calculate-comfort-index", () => {
  it("can calculate bad comfort index", () => {
    expect(
      calculateComfortIndex(
        {
          temperature: 90,
          precipProbability: 0.7,
          cloudCover: 0.7,
          windSpeed: 12,
        },
        60,
        80,
      ),
    ).toBeLessThan(50);
  });

  it("can calculate terrible comfort index", () => {
    expect(
      calculateComfortIndex(
        {
          temperature: 15,
          precipProbability: 0.7,
          cloudCover: 0.7,
          windSpeed: 12,
        },
        60,
        80,
      ),
    ).toBeLessThan(20);
  });

  it("can calculate good comfort index", () => {
    expect(
      calculateComfortIndex(
        {
          temperature: 70,
          precipProbability: 0.1,
          cloudCover: 0.1,
          windSpeed: 2,
        },
        60,
        80,
      ),
    ).toBeGreaterThan(70);
  });

  it("can calculate perfect index", () => {
    expect(
      calculateComfortIndex(
        {
          temperature: 70,
          precipProbability: 0.0,
          cloudCover: 0.0,
          windSpeed: 0,
        },
        60,
        80,
      ),
    ).toEqual(100);
  });
});
