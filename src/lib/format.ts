export function formatFollowers(count: number): string {
  return `${count.toLocaleString("zh-Hant")} 粉`;
}

export function completenessLabel(value: "full" | "partial"): string {
  return value === "full" ? "完整" : "部分";
}
