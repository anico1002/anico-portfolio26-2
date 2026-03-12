/**
 * Parses a project's content.txt file.
 *
 * Format:
 *   key: value          ← single-line metadata at the top
 *
 *   [overview]          ← named block (multi-line, default locale)
 *   Long text here...
 *
 *   [overview.es]       ← same block, Spanish locale variant
 *   Texto en español...
 *
 *   [stats]             ← each line: "value | label"
 *   29 | Screens Designed
 *
 *   [links]             ← each line: "label | url"
 *   View on Behance | https://...
 */

export interface ContentMeta {
  name?: string;
  subtitle?: string;
  client?: string;
  category?: string;
  year?: string;
  role?: string;
  deliverables?: string;
  tags?: string;
  aspect_ratio?: string;
  order?: number;
}

export interface ContentLink {
  label: string;
  url: string;
}

export interface ContentStat {
  value: string;
  label: string;
}

export type ContentTextBlock = {
  overview?: string;
  challenge?: string;
  process?: string;
  outcome?: string;
};

export interface ParsedContent {
  meta: ContentMeta;
  overview?: string;
  challenge?: string;
  process?: string;
  outcome?: string;
  stats: ContentStat[];
  links: ContentLink[];
  /** Locale variants: key = locale code ("es", "fr", …) */
  locales: Record<string, ContentTextBlock>;
}

export function parseContent(text: string): ParsedContent {
  const lines = text.split(/\r?\n/);
  const result: ParsedContent = { meta: {}, stats: [], links: [], locales: {} };

  let currentBlock: string | null = null;
  let currentLocale: string | null = null; // null = default locale
  let blockLines: string[] = [];

  const TEXT_BLOCKS = new Set(["overview", "challenge", "process", "outcome"]);

  function flushBlock() {
    if (currentBlock === null) return;
    const content = blockLines.join("\n").trim();

    if (currentLocale !== null && TEXT_BLOCKS.has(currentBlock)) {
      // Locale variant → store in locales map
      if (!result.locales[currentLocale]) result.locales[currentLocale] = {};
      (result.locales[currentLocale] as Record<string, string>)[currentBlock] = content;
    } else {
      switch (currentBlock) {
        case "overview":  result.overview  = content; break;
        case "challenge": result.challenge = content; break;
        case "process":   result.process   = content; break;
        case "outcome":   result.outcome   = content; break;
        case "stats":
          result.stats = content
            .split("\n")
            .filter((l) => l.includes("|"))
            .map((l) => {
              const idx = l.indexOf("|");
              return { value: l.slice(0, idx).trim(), label: l.slice(idx + 1).trim() };
            });
          break;
        case "links":
          result.links = content
            .split("\n")
            .filter((l) => l.includes("|"))
            .map((l) => {
              const idx = l.indexOf("|");
              return { label: l.slice(0, idx).trim(), url: l.slice(idx + 1).trim() };
            });
          break;
      }
    }

    blockLines = [];
    currentBlock = null;
    currentLocale = null;
  }

  for (const line of lines) {
    // Block header: [overview], [overview.es], [stats], etc.
    const blockMatch = line.match(/^\[(\w+)(?:\.(\w+))?\]\s*$/);
    if (blockMatch) {
      flushBlock();
      currentBlock  = blockMatch[1].toLowerCase();
      currentLocale = blockMatch[2]?.toLowerCase() ?? null;
      continue;
    }

    if (currentBlock !== null) {
      blockLines.push(line);
      continue;
    }

    // Key: value line (metadata)
    const kvMatch = line.match(/^(\w+):\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase();
      const val = kvMatch[2].trim();
      if (key === "order") {
        result.meta.order = parseInt(val) || 0;
      } else {
        (result.meta as Record<string, string>)[key] = val;
      }
    }
  }

  flushBlock();
  return result;
}
