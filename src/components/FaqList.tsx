export function FaqList({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <dl className="mt-8 max-w-3xl space-y-8">
      {items.map((item) => (
        <div key={item.question}>
          <dt className="font-display text-xl font-semibold text-navy">{item.question}</dt>
          <dd className="mt-3 text-base leading-relaxed text-muted">{item.answer}</dd>
        </div>
      ))}
    </dl>
  );
}
