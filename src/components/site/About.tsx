import { SITE } from "@/config";
import { Reveal } from "./Reveal";
import expertPortrait from "@/assets/expert-portrait.jpg";

const PRINCIPLES = [
  "Конфиденциальность: сведения о клиенте и его документах не раскрываются третьим лицам.",
  "Работа строго в рамках закона: без схем, обещаний «договориться» и серых решений.",
  "Письменная фиксация результатов: выводы и рекомендации оформляются документом.",
  "Реалистичная оценка перспектив спора, в том числе когда перспективы слабые.",
];

export function About() {
  return (
    <section id="about" className="section-y overflow-hidden border-b border-hairline bg-editorial">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-5">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img src={expertPortrait} alt="Демонстрационный деловой портрет специалиста" loading="lazy" width={1200} height={1504} className="h-full w-full object-cover object-top" />
          </div>
          <p className="absolute bottom-0 left-0 bg-background/95 px-5 py-3 text-[11px] text-muted-foreground">[ЗАМЕНИТЬ: на реальную фотографию]</p>
        </Reveal>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow">О специалисте</p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{SITE.ownerFullName}</h2>
            <p className="mt-2 text-sm text-muted-foreground">[ПРОВЕРИТЬ написание фамилии]</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Профессиональный стаж в финансах и налогах с {SITE.experienceSince} года. Индивидуальный
              предприниматель с {SITE.ipRegisteredAt}. Работаю с организациями и индивидуальными
              предпринимателями: аудит и налоговые проверки, налоговые споры, консультирование,
              письменные заключения.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 border-t border-hairline pt-8 sm:grid-cols-2">
            <Reveal>
              <h3 className="text-base">Образование и квалификация</h3>
              <p className="mt-3 text-sm text-muted-foreground">[ЗАПОЛНИТЬ: образование, аттестаты, повышение квалификации]</p>
            </Reveal>
            <Reveal delay={80}>
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
