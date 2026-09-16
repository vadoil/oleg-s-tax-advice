import {
  FileWarning,
  Search,
  Receipt,
  Building2,
  UserCog,
  PackageSearch,
  Scale,
  Network,
} from "lucide-react";
import { Reveal } from "./Reveal";
import consultation from "@/assets/consultation.jpg";

const ITEMS = [
  { icon: FileWarning, text: "Пришло требование или вызов в налоговую" },
  { icon: Search, text: "Назначена выездная налоговая проверка" },
  { icon: Receipt, text: "Получен акт с доначислениями" },
  { icon: Building2, text: "Планируете купить бизнес или долю" },
  { icon: UserCog, text: "Сменился главный бухгалтер" },
  { icon: PackageSearch, text: "Есть подозрение на недостачу" },
  { icon: Scale, text: "Нужен независимый специалист для суда" },
  { icon: Network, text: "Есть сделки с взаимозависимыми лицами" },
];

export function Situations() {
  return (
    <section id="situations" className="section-y border-b border-hairline bg-surface">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Ситуации</p>
            <h2 className="mt-4 max-w-3xl text-3xl sm:text-4xl lg:text-5xl">Когда стоит обратиться</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">Чем раньше разобрана ситуация и собраны документы, тем больше времени остаётся на взвешенную позицию.</p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <div className="aspect-[16/7] overflow-hidden">
              <img src={consultation} alt="Разбор документов на консультации" loading="lazy" width={1408} height={912} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal as="li" key={item.text} delay={i * 50} className="border-b border-hairline p-6 lg:border-r">
              <item.icon className="size-6 stroke-[1.25] text-gold" aria-hidden="true" />
              <p className="mt-4 text-sm leading-relaxed">{item.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col items-start gap-4 border border-hairline bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <p className="font-serif text-lg md:text-xl">Узнайте, что делать в вашей ситуации</p>
          <a
            href="#contact-form"
            className="inline-flex shrink-0 items-center justify-center bg-gold px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Описать ситуацию
          </a>
        </Reveal>
      </div>
    </section>
  );
}
