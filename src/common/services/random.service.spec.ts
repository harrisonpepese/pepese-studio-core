import { RandomService } from "./random.service";

describe("RandomService tests", () => {
  it("should return a random number between 1 and 10", () => {
    const result = RandomService.range(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it("should return a random float number between 1 and 10", () => {
    const result = RandomService.rangeFloat(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(11);
  });
});
