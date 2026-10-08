interface JsonLdProps {
  data: object;
}

/** One JSON-LD script. `<` is escaped so content can never close the script element. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
