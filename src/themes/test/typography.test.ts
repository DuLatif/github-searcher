import { describe, expect, test } from "vitest";
import { readFileSync } from "fs";

describe("Theme Typography", () => {
  test("should match scss typography variabel snapshot", () => {
    expect(readFileSync(__dirname + "./../typography.scss")).toMatchSnapshot();
  });
});
