import { generateCacheKey } from "../cacheKeyGenerator";
import { describe, it, expect } from "vitest";

describe("generateCacheKey Function", () => {
  it("should generate cache key with basePath and params", () => {
    const basePath = "/api/data";
    const params = { id: 123, name: "John", age: 30 };
    const expectedKey = "/api/data?id=123&name=John&age=30";

    const result = generateCacheKey(basePath, params);

    expect(result).toBe(expectedKey);
  });

  it("should encode special characters in parameters", () => {
    const basePath = "/api/data";
    const params = { id: 123, name: "John Smith", age: 30 };
    const expectedKey = "/api/data?id=123&name=John%20Smith&age=30";

    const result = generateCacheKey(basePath, params);

    expect(result).toBe(expectedKey);
  });

  it("should handle empty params object", () => {
    const basePath = "/api/data";
    const params = {};
    const expectedKey = "/api/data";

    const result = generateCacheKey(basePath, params);

    expect(result).toBe(expectedKey);
  });

  it("should handle basePath without trailing slash", () => {
    const basePath = "/api/data";
    const params = { id: 123 };
    const expectedKey = "/api/data?id=123";

    const result = generateCacheKey(basePath, params);

    expect(result).toBe(expectedKey);
  });

  it("should handle basePath with trailing slash", () => {
    const basePath = "/api/data/";
    const params = { id: 123 };
    const expectedKey = "/api/data/?id=123";

    const result = generateCacheKey(basePath, params);

    expect(result).toBe(expectedKey);
  });
});
