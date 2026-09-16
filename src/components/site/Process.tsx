import { Reveal } from "./Reveal";

const STEPS = [
  { title: "Заявка", text: "Звонок, сообщение в мессенджер или форма на сайте." },
  { title: "Анализ ситуации и документов", text: "Изучаю вводные, документы и сроки по вашему делу." },
  { title: "Предложение", text: "Объём работ, сроки и стоимость фиксируются до начала работы." },
  { title: "Выполнение работ", text: "Проверка, подготовка документов или представление интересов." },
  { title: "Итоговый отчёт", text: "Письменный результат и дальнейшее сопровождение при необходимости." },
];

export function Process() {
  return (
    <section id="process" className="section-y border-b border-hairline bg-surface">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Порядок работы</p>
          <h2 className="mt-4 max-w-3xl text-2xl sm:text-3xl lg:text-4xl">Как мы работаем</h2>
        </Reveal>

        <ol className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-5">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 60} className="bg-background p-6">
              <span className="font-serif text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-base leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-8 border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted-foreground">
          <p>Стоимость рассчитывается индивидуально после анализа задачи.</p>
          <p className="mt-1">[ПРОВЕРИТЬ: есть ли бесплатная первичная консультация]</p>
        </Reveal>
      </div>
    </section>
  );
}
