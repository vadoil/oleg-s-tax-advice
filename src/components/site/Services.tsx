import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SERVICE_GROUPS, type Service } from "@/data/services";
import { requestService } from "@/lib/service-request";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `service-panel-${service.id}`;

  return (
    <Reveal as="article" delay={index * 60} className="flex flex-col border border-hairline bg-card p-6 md:p-7">
      <h3 className="font-serif text-lg leading-snug md:text-xl">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy hover:text-gold"
      >
        Подробнее
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <div id={panelId} className="mt-5 space-y-5 border-t border-hairline pt-5">
          <div>
            <p className="eyebrow">Когда нужно</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {service.when.map((item) => (
                <li key={item} className="pl-4 -indent-4 before:mr-2 before:text-gold before:content-['—']">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Что входит</p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {service.includes.map((item) => (
                <li key={item} className="pl-4 -indent-4 before:mr-2 before:text-gold before:content-['—']">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Результат</p>
            <p className="mt-2 text-sm text-muted-foreground">{service.result}</p>
          </div>
          <button
            type="button"
            onClick={() => requestService(service.id)}
            className="inline-flex w-full items-center justify-center bg-navy px-5 py-3 text-sm font-semibold text-on-navy transition-colors hover:bg-navy-soft sm:w-auto"
          >
            Заказать эту услугу
          </button>
        </div>
      )}
    </Reveal>
  );
}

export function Services() {
  const [activeGroup, setActiveGroup] = useState(SERVICE_GROUPS[0].id);
  const group = SERVICE_GROUPS.find((g) => g.id === activeGroup) ?? SERVICE_GROUPS[0];

  return (
    <section id="services" className="section-y border-b border-hairline bg-surface">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Направления</p>
          <h2 className="mt-4 max-w-3xl text-2xl sm:text-3xl lg:text-4xl">
            Услуги для организаций и индивидуальных предпринимателей
          </h2>
        </Reveal>

        <div role="tablist" aria-label="Направления услуг" className="mt-10 flex flex-wrap gap-px border border-hairline bg-hairline">
          {SERVICE_GROUPS.map((g) => (
            <button
              key={g.id}
              role="tab"
              type="button"
              aria-selected={g.id === activeGroup}
              onClick={() => setActiveGroup(g.id)}
              className={cn(
                "flex-1 basis-[45%] px-4 py-4 text-left text-sm font-semibold transition-colors sm:basis-0 sm:text-center",
                g.id === activeGroup
                  ? "bg-navy text-on-navy"
                  : "bg-background text-foreground/75 hover:text-gold",
              )}
            >
              <span className="mr-2 text-gold">{g.letter}.</span>
              {g.title}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{group.description}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {group.services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
