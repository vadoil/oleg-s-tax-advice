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
    <section id="situations" className="section-y border-b border-hairline">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Ситуации</p>
          <h2 className="mt-4 max-w-3xl text-2xl sm:text-3xl lg:text-4xl">Когда стоит обратиться</h2>
        </Reveal>

        <ul className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal as="li" key={item.text} delay={i * 50} className="bg-background p-6">
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
