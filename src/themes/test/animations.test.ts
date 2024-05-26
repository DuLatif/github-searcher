import { describe, expect, test } from "vitest";
import { readFileSync } from "fs";

describe("Theme Animations", () => {
  test("should match scss animations snapshot", () => {
    expect(readFileSync(__dirname + "./../animations.scss")).toMatchSnapshot();
  });
});
