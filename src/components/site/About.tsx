import { User } from "lucide-react";
import { SITE } from "@/config";
import { Reveal } from "./Reveal";

const PRINCIPLES = [
  "Конфиденциальность: сведения о клиенте и его документах не раскрываются третьим лицам.",
  "Работа строго в рамках закона: без схем, обещаний «договориться» и серых решений.",
  "Письменная фиксация результатов: выводы и рекомендации оформляются документом.",
  "Реалистичная оценка перспектив спора, в том числе когда перспективы слабые.",
];

export function About() {
  return (
    <section id="about" className="section-y border-b border-hairline">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div
            className="flex aspect-[4/5] w-full items-center justify-center border border-hairline bg-surface"
            role="img"
            aria-label="Место для фотографии специалиста"
          >
            <div className="text-center">
              <User className="mx-auto size-10 stroke-[1] text-muted-foreground" aria-hidden="true" />
              <p className="mt-3 px-6 text-xs text-muted-foreground">[ЗАПОЛНИТЬ: фотография]</p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow">О специалисте</p>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl">{SITE.ownerFullName}</h2>
            <p className="mt-2 text-sm text-muted-foreground">[ПРОВЕРИТЬ написание фамилии]</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Профессиональный стаж в финансах и налогах с {SITE.experienceSince} года. Индивидуальный
              предприниматель с {SITE.ipRegisteredAt}. Работаю с организациями и индивидуальными
              предпринимателями: аудит и налоговые проверки, налоговые споры, консультирование,
              письменные заключения.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
            <Reveal className="bg-background p-6">
              <h3 className="text-base">Образование и квалификация</h3>
              <p className="mt-3 text-sm text-muted-foreground">[ЗАПОЛНИТЬ: образование, аттестаты, повышение квалификации]</p>
            </Reveal>
            <Reveal delay={80} className="bg-background p-6">
              <h3 className="text-base">Членство в СРО / реестровый номер</h3>
              <p className="mt-3 text-sm text-muted-foreground">[ЗАПОЛНИТЬ: наименование СРО и реестровый номер]</p>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <h3 className="text-base">Принципы работы</h3>
            <ul className="mt-4 space-y-3">
              {PRINCIPLES.map((p) => (
                <li key={p} className="border-l-2 border-gold pl-4 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
