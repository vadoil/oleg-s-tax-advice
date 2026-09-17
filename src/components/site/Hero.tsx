import { Send, MessageCircle, ArrowRight } from "lucide-react";
import { CONTACTS, METRIKA_GOALS } from "@/config";
import { reachGoal } from "@/lib/metrika";
import { Reveal } from "./Reveal";
import { QuickForm } from "./QuickForm";
import expertPortrait from "@/assets/expert-portrait.jpg";


const FACTS = [
  { value: "С 1995 года", label: "в финансах и налогах" },
  { value: "ИП с 2012 года", label: "частная практика" },
  { value: "Самара", label: "ул. Ленинская и ул. Киевская" },
  { value: "Организации и ИП", label: "любые системы налогообложения" },
];

export function Hero() {
  return (
    <section id="top" className="overflow-hidden border-b border-hairline bg-editorial">
      <div className="container-page grid items-center gap-12 py-12 lg:min-h-[740px] lg:grid-cols-12 lg:gap-12 lg:py-16">
        <Reveal className="order-2 lg:order-1 lg:col-span-7 lg:pr-8">
          <p className="eyebrow">Частная практика · Самара</p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl">
            Налоговый аудит, due diligence и защита в налоговых спорах
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Выявляем налоговые риски до проверки, сопровождаем проверки, готовим возражения и
            представляем интересы в налоговом органе и арбитражном суде. Опыт в финансах и налогах
            с 1995 года.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 bg-navy px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-on-navy transition-colors hover:bg-gold"
            >
              Обсудить задачу <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal(METRIKA_GOALS.telegramClick)}
              className="inline-flex items-center justify-center gap-2 border-b border-navy py-3 text-sm font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
            >
              <Send className="size-4" aria-hidden="true" /> Написать в Telegram
            </a>
            <a
              href={CONTACTS.max}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal(METRIKA_GOALS.maxClick)}
              className="inline-flex items-center justify-center gap-2 border-b border-navy py-3 text-sm font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> Написать в MAX
            </a>
          </div>

          <div className="mt-10 border border-hairline bg-background p-6 md:p-7">
            <p className="eyebrow">Быстрая заявка</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Оставьте имя и телефон — перезвоню и разберу вашу ситуацию.
            </p>
            <div className="mt-5">
              <QuickForm topic="Быстрая заявка с первого экрана" submitLabel="Перезвоните мне" />
            </div>
          </div>
        </Reveal>


        <Reveal delay={120} className="relative order-1 lg:order-2 lg:col-span-5 lg:pl-4">
          <div className="relative mx-auto max-w-[470px]">
            <div className="aspect-[4/5] overflow-hidden bg-surface">
              <img
                src={expertPortrait}
                alt="Деловой портрет специалиста — демонстрационное изображение"
                width={1200}
                height={1504}
                fetchPriority="high"
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className="absolute -bottom-8 left-4 max-w-[270px] border-l-4 border-gold bg-background p-6 shadow-editorial sm:-left-8 sm:p-8">
              <p className="eyebrow">Опыт и практика</p>
              <p className="mt-3 font-serif text-2xl leading-tight text-navy">30+ лет в финансах и налогах</p>
              <p className="mt-3 text-[11px] text-muted-foreground">[ЗАМЕНИТЬ: на реальную фотографию специалиста]</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-page pb-14 pt-8 lg:pb-20">
        <dl className="grid gap-8 border-t border-hairline pt-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {FACTS.map((fact) => (
            <div key={fact.value} className="group">
              <div className="mb-5 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
              <dt className="font-serif text-xl text-navy">{fact.value}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
