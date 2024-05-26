import { formatNumber } from "../formatNumber";
import { describe, it, expect } from "vitest";

describe("formatNumber Function", () => {
  it("should format number greater than or equal to 1000000 correctly", () => {
    const num = 1500000;
    const expectedFormattedNum = "1.5M";

    const result = formatNumber(num);

    expect(result).toBe(expectedFormattedNum);
  });

  it("should format number greater than or equal to 1000 and less than 1000000 correctly", () => {
    const num = 5000;
    const expectedFormattedNum = "5K";

    const result = formatNumber(num);

    expect(result).toBe(expectedFormattedNum);
  });

  it("should return the original number if less than 1000", () => {
    const num = 500;
    const expectedFormattedNum = "500";

    const result = formatNumber(num);

    expect(result).toBe(expectedFormattedNum);
  });

  it("should format decimal number greater than or equal to 1000000 correctly", () => {
    const num = 1500000.5;
    const expectedFormattedNum = "1.5M";

    const result = formatNumber(num);

    expect(result).toBe(expectedFormattedNum);
  });

  it("should format decimal number greater than or equal to 1000 and less than 1000000 correctly", () => {
    const num = 5000.75;
    const expectedFormattedNum = "5K";

    const result = formatNumber(num);

    expect(result).toBe(expectedFormattedNum);
  });

  it("should return the original decimal number if less than 1000", () => {
    const num = 500.25;
    const expectedFormattedNum = "500.25";

    const result = formatNumber(num);

    expect(result).toBe(expectedFormattedNum);
  });
});
