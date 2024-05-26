import { describe, expect, test } from "vitest";
import { readFileSync } from "fs";

describe("Theme Color", () => {
  test("should match scss colors variables snapshot", () => {
    expect(readFileSync(__dirname + "./../colors.scss")).toMatchSnapshot();
  });
});
