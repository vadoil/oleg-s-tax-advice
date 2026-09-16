import { Reveal } from "./Reveal";

const STATS = [
  { value: "30+", label: "лет в финансах и налогах" },
  { value: "2012", label: "год начала частной практики" },
  { value: "13", label: "направлений услуг" },
  { value: "2", label: "офиса в Самаре" },
];

export function Stats() {
  return (
    <section className="border-b border-hairline bg-navy">
      <div className="container-page">
        <dl className="grid gap-px bg-navy-soft sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="bg-navy px-6 py-10 text-center">
              <dt className="font-serif text-4xl text-gold-soft md:text-5xl">{s.value}</dt>
              <dd className="mt-3 text-sm text-on-navy-muted">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
