import { describe, expect, it } from "vitest";
import { fmtLvr, fmtMoney, fmtPct, fmtPrice } from "../lib/format";

describe("results formatters", () => {
  it("§4.4: formats max property prices with kept million decimals", () => {
    expect(fmtPrice(3100000)).toBe("$3.10M");
    expect(fmtPrice(999499)).toBe("$999k");
  });

  it("§4.4: formats exact money rows and rates", () => {
    expect(fmtMoney(15043)).toBe("$15,043");
    expect(fmtMoney(-1200)).toBe("-$1,200");
    expect(fmtPct(6.2, " p.a.")).toBe("6.20% p.a.");
    expect(fmtLvr(0.764)).toBe("76%");
  });
});
