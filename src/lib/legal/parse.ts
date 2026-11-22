export type LegalBlock =
  | { type: "title"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "table"; rows: string[][] };

function isHeading(line: string): boolean {
  return /^\d+\.\s+\S/.test(line);
}

function isTableRow(line: string): boolean {
  return line.split(" | ").length >= 3;
}

/** Format headings and provider tables. Every source line is kept. */
export function parseLegal(raw: string): LegalBlock[] {
  const lines = raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const blocks: LegalBlock[] = [];
  if (lines.length === 0) return blocks;

  blocks.push({ type: "title", text: lines[0] });

  let index = 1;
  while (index < lines.length) {
    if (isTableRow(lines[index])) {
      const rows: string[][] = [];
      while (index < lines.length && isTableRow(lines[index])) {
        rows.push(lines[index].split(" | ").map((cell) => cell.trim()));
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }
    if (isHeading(lines[index])) {
      blocks.push({ type: "heading", text: lines[index] });
      index += 1;
      continue;
    }
    blocks.push({ type: "paragraph", text: lines[index] });
    index += 1;
  }

  return blocks;
}

export function legalText(blocks: LegalBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "table") return block.rows.map((row) => row.join(" | ")).join("\n");
      return block.text;
    })
    .join("\n");
}
