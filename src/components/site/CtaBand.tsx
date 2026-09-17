import { ShieldCheck, Clock3, FileCheck2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { QuickForm } from "./QuickForm";

const POINTS = [
  { icon: Clock3, title: "Ответ в течение рабочего дня", text: "Перезваниваем и уточняем вводные по вашей ситуации." },
  { icon: FileCheck2, title: "Понятный план действий", text: "Что можно сделать, какие документы нужны и в какие сроки." },
  { icon: ShieldCheck, title: "Конфиденциальность", text: "Документы и обстоятельства дела не передаются третьим лицам." },
];

/** Маркетинговый блок с короткой формой — между разделами. */
export function CtaBand() {
  return (
    <section className="bg-navy text-on-navy">
      <div className="container-page section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Первый шаг</p>
          <h2 className="mt-4 text-2xl text-on-navy sm:text-3xl lg:text-4xl">
            Разбор вашей ситуации по телефону
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-on-navy-muted">
            Оставьте имя и телефон — уточню обстоятельства, скажу, какие документы понадобятся,
            и обозначу реалистичные варианты действий.
          </p>
          <div className="mt-8">
            <QuickForm topic="Быстрая заявка — разбор ситуации" dark submitLabel="Жду звонка" />
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7 lg:pl-8">
          <ul className="grid gap-px bg-on-navy/15 sm:grid-cols-3 lg:grid-cols-1">
            {POINTS.map((p) => (
              <li key={p.title} className="bg-navy p-6 lg:p-7">
                <p.icon className="size-6 stroke-[1.25] text-gold" aria-hidden="true" />
                <h3 className="mt-4 text-base text-on-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-navy-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
