import { Send, MessageCircle, ArrowRight } from "lucide-react";
import { CONTACTS, METRIKA_GOALS } from "@/config";
import { reachGoal } from "@/lib/metrika";
import { Reveal } from "./Reveal";

const FACTS = [
  { value: "С 1995 года", label: "в финансах и налогах" },
  { value: "ИП с 2012 года", label: "частная практика" },
  { value: "Самара", label: "ул. Ленинская и ул. Киевская" },
  { value: "Организации и ИП", label: "любые системы налогообложения" },
];

export function Hero() {
  return (
    <section id="top" className="border-b border-hairline bg-background">
      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">Частная практика · Самара</p>
          <h1 className="mt-5 text-3xl leading-[1.15] sm:text-4xl lg:text-5xl">
            Налоговый аудит, due diligence и защита в налоговых спорах
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Выявляем налоговые риски до проверки, сопровождаем проверки, готовим возражения и
            представляем интересы в налоговом органе и арбитражном суде. Опыт в финансах и налогах
            с 1995 года.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Обсудить задачу <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal(METRIKA_GOALS.telegramClick)}
              className="inline-flex items-center justify-center gap-2 border border-navy px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-on-navy"
            >
              <Send className="size-4" aria-hidden="true" /> Написать в Telegram
            </a>
            <a
              href={CONTACTS.max}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal(METRIKA_GOALS.maxClick)}
              className="inline-flex items-center justify-center gap-2 border border-navy px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-on-navy"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> Написать в MAX
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <dl className="grid grid-cols-1 border border-hairline sm:grid-cols-2 lg:grid-cols-1">
            {FACTS.map((fact) => (
              <div key={fact.value} className="border-b border-hairline p-6 last:border-b-0 sm:[&:nth-last-child(-n+1)]:border-b-0">
                <dt className="font-serif text-xl text-navy">{fact.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
