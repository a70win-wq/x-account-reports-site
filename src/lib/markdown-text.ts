import type { ReactNode } from "react";
import { isValidElement } from "react";

export function flattenNodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenNodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return flattenNodeText(node.props.children);
  }
  return "";
}

export function looksLikeMetaNote(text: string): boolean {
  return /來源|未 follow|\/workspace\/|資料截至|Grok Build|看不到寫看不到|未 follow／讚/.test(
    text,
  );
}
