import { Reveal } from "./Reveal";

const STATS = [
  { value: "30+", label: "лет в финансах и налогах" },
  { value: "2012", label: "год начала частной практики" },
  { value: "13", label: "направлений услуг" },
  { value: "2", label: "офиса в Самаре" },
];

export function Stats() {
  return (
    <section className="border-b border-hairline bg-editorial">
      <div className="container-page">
        <dl className="grid border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="border-b border-hairline px-6 py-12 text-center sm:border-r lg:py-16">
              <dt className="font-serif text-5xl text-gold md:text-6xl">{s.value}</dt>
              <dd className="mt-4 text-sm text-muted-foreground">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
