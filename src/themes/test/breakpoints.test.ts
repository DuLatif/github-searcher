import { describe, expect, test } from "vitest";
import { readFileSync } from "fs";

describe("Theme Breakpoints", () => {
  test("should match scss breakpoints variable snapshot", () => {
    expect(readFileSync(__dirname + "./../breakpoints.scss")).toMatchSnapshot();
  });
});
