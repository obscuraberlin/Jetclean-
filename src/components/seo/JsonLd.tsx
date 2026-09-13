type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Rendert Schema.org-Daten als JSON-LD (XSS-sicher: `<` wird escaped). */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replaceAll('<', '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
