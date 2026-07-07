// Spec: results-page-spec.md §4.4 (formatting rules)
export function fmtPrice(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  return `$${Math.round(value / 1000)}k`;
}

export function fmtMoney(value: number) {
  const sign = value < 0 ? "-" : "";
  return `${sign}$${Math.abs(Math.round(value)).toLocaleString("en-AU")}`;
}

export function fmtMoneyShort(value: number) {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs >= 1000000) return `${sign}$${(abs / 1000000).toFixed(2)}M`;
  return `${sign}$${Math.round(abs / 1000)}k`;
}

export function fmtPct(value: number, suffix = "") {
  return `${value.toFixed(2)}%${suffix}`;
}

export function fmtLvr(value: number) {
  return `${Math.round(value * 100)}%`;
}
