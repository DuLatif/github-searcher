import { describe, expect, test } from "vitest";
import { readFileSync } from "fs";

describe("Theme Spacing", () => {
  test("should match scss spacing variable snapshot", () => {
    expect(readFileSync(__dirname + "./../spacing.scss")).toMatchSnapshot();
  });
});
