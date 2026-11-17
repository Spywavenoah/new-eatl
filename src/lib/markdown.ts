/**
 * Small, dependency-free Markdown renderer.
 * Everything is HTML-escaped first, so AI-agent supplied content can never
 * inject script tags or event handlers. Only a safe subset is converted.
 */

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const safeUrl = (raw: string) => {
  const url = raw.trim();
  if (/^(https?:\/\/|mailto:|\/|#)/i.test(url) && !/^javascript:/i.test(url)) return url;
  return "#";
};

function inline(text: string): string {
  let out = escapeHtml(text);
  // inline code first so its content is not formatted further
  out = out.replace(/`([^`]+)`/g, (_m, code) => `<code class="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-brand-red">${code}</code>`);
  // images then links
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_m, alt, url, title) => {
    const src = safeUrl(url);
    return `<img src="${src}" alt="${alt}"${title ? ` title="${title}"` : ""} loading="lazy" class="my-6 w-full rounded-xl border border-line object-cover" />`;
  });
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, url) => {
    const href = safeUrl(url);
    const external = /^https?:\/\//i.test(href);
    return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""} class="font-semibold text-brand-green underline decoration-brand-green/30 underline-offset-2 hover:text-brand-red">${label}</a>`;
  });
  // bold / italic / strikethrough
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  out = out.replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/(^|[\s(])_([^_\n]+)_/g, "$1<em>$2</em>");
  out = out.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  // bare urls
  out = out.replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer" class="break-words font-semibold text-brand-green underline underline-offset-2">$2</a>');
  return out;
}

export function renderMarkdown(markdown: string): string {
  const src = (markdown || "").replace(/\r\n/g, "\n").trim();
  if (!src) return "";

  const blocks: string[] = [];
  src
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .forEach((block) => {
      // fenced code
      const fence = block.match(/^```([a-z0-9-]*)\n([\s\S]*?)```$/i);
      if (fence) {
        blocks.push(
          `<pre class="my-6 overflow-x-auto rounded-xl bg-ink p-4 text-[13px] leading-relaxed text-white/90"><code>${escapeHtml(fence[2].trim())}</code></pre>`,
        );
        return;
      }
      // heading
      const heading = block.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        const level = heading[1].length;
        const text = inline(heading[2]);
        const sizes: Record<number, string> = {
          1: "mt-10 mb-4 font-heading text-3xl font-bold leading-tight",
          2: "mt-10 mb-3 font-heading text-2xl font-bold leading-tight",
          3: "mt-8 mb-2.5 font-heading text-xl font-bold",
          4: "mt-6 mb-2 font-heading text-lg font-bold",
          5: "mt-5 mb-1.5 font-heading text-base font-bold uppercase tracking-wide text-muted",
          6: "mt-5 mb-1.5 font-heading text-sm font-bold uppercase tracking-wide text-muted",
        };
        blocks.push(`<h${level} class="${sizes[level]} text-ink">${text}</h${level}>`);
        return;
      }
      // horizontal rule
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(block)) {
        blocks.push('<hr class="my-8 border-line" />');
        return;
      }
      // blockquote
      if (/^>\s?/.test(block)) {
        const quote = block
          .split("\n")
          .map((l) => l.replace(/^>\s?/, ""))
          .join("\n");
        blocks.push(
          `<blockquote class="my-6 border-l-4 border-brand-red bg-surface px-5 py-4 text-[15px] italic leading-relaxed text-ink/85">${inline(quote)}</blockquote>`,
        );
        return;
      }
      // lists
      const lines = block.split("\n");
      const isUl = lines.every((l) => /^\s*[-*+]\s+/.test(l));
      const isOl = lines.every((l) => /^\s*\d+[.)]\s+/.test(l));
      if (isUl || isOl) {
        const items = lines
          .map((l) => l.replace(/^\s*(?:[-*+]|\d+[.)])\s+/, ""))
          .map((l) => `<li class="pl-1.5">${inline(l)}</li>`)
          .join("");
        blocks.push(
          isUl
            ? `<ul class="check-list my-5 space-y-2 text-[15px] leading-relaxed text-ink/85">${items}</ul>`
            : `<ol class="my-5 list-decimal space-y-2 pl-6 text-[15px] leading-relaxed text-ink/85">${items}</ol>`,
        );
        return;
      }
      // paragraph
      blocks.push(`<p class="my-4 text-[15px] leading-relaxed text-ink/85">${inline(block.replace(/\n/g, " "))}</p>`);
    });

  return blocks.join("\n");
}

export function plainText(markdown: string, max = 240): string {
  const text = (markdown || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export function readingMinutes(markdown: string): number {
  const words = plainText(markdown, 100000).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(input: string): string {
  const base = (input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120)
    .replace(/^-|-$/g, "");
  return base || `post-${Date.now()}`;
}
