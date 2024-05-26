import { combineClasses } from "../styles";
import { describe, it, expect } from "vitest";

describe("combineClasses Function", () => {
  it("should combine CSSModuleClasses correctly", () => {
    const classes = ["class1", "class2", "class3"];
    const expectedCombinedClasses = "class1 class2 class3";

    const result = combineClasses(classes);

    expect(result).toBe(expectedCombinedClasses);
  });

  it("should ignore falsey values", () => {
    const classes = ["class1", undefined, "", false, "class2"];
    const expectedCombinedClasses = "class1 class2";

    const result = combineClasses(classes);

    expect(result).toBe(expectedCombinedClasses);
  });

  it("should handle a mixture of CSSModuleClasses, strings, and boolean values", () => {
    const classes = ["class1", undefined, "class2", true, "class3", false];
    const expectedCombinedClasses = "class1 class2 true class3";

    const result = combineClasses(classes);

    expect(result).toBe(expectedCombinedClasses);
  });
});
