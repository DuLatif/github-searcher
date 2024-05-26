import { calculateTotalPages } from "../calculateTotalPages";
import { describe, it, expect } from "vitest";

describe("calculateTotalPages Function", () => {
  it("should calculate total pages correctly when totalItems is divisible by itemsPerPage", () => {
    const totalItems = 20;
    const itemsPerPage = 5;
    const expectedTotalPages = 4;

    const result = calculateTotalPages(totalItems, itemsPerPage);

    expect(result).toBe(expectedTotalPages);
  });

  it("should calculate total pages correctly when totalItems is not divisible by itemsPerPage", () => {
    const totalItems = 23;
    const itemsPerPage = 5;
    const expectedTotalPages = 5;

    const result = calculateTotalPages(totalItems, itemsPerPage);

    expect(result).toBe(expectedTotalPages);
  });

  it("should throw an error when itemsPerPage is 0", () => {
    const totalItems = 20;
    const itemsPerPage = 0;

    expect(() => calculateTotalPages(totalItems, itemsPerPage)).toThrow(
      "itemsPerPage must be greater than 0"
    );
  });

  it("should throw an error when itemsPerPage is negative", () => {
    const totalItems = 20;
    const itemsPerPage = -5;

    expect(() => calculateTotalPages(totalItems, itemsPerPage)).toThrow(
      "itemsPerPage must be greater than 0"
    );
  });

  it("should return 0 pages when totalItems is 0", () => {
    const totalItems = 0;
    const itemsPerPage = 10;
    const expectedTotalPages = 0;

    const result = calculateTotalPages(totalItems, itemsPerPage);

    expect(result).toBe(expectedTotalPages);
  });
});
