import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACTS, OFFICES, SITE, YANDEX_MAP_EMBED_SRC, METRIKA_GOALS } from "@/config";
import { reachGoal } from "@/lib/metrika";
import { Reveal } from "./Reveal";

export function Contacts() {
  return (
    <section id="contacts" className="section-y border-b border-hairline">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Контакты</p>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl">Как связаться и где встретиться</h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ul className="grid gap-px border border-hairline bg-hairline">
              {OFFICES.map((office) => (
                <Reveal as="li" key={office.id} className="bg-background p-6">
                  <MapPin className="size-5 stroke-[1.25] text-gold" aria-hidden="true" />
                  <h3 className="mt-3 text-base">{office.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{office.address}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{office.note}</p>
                </Reveal>
              ))}
              <Reveal as="li" className="bg-background p-6">
                <div className="space-y-3 text-sm">
                  <a
                    href={CONTACTS.phoneHref}
                    onClick={() => reachGoal(METRIKA_GOALS.phoneClick)}
                    className="flex items-center gap-3 font-semibold hover:text-gold"
                  >
                    <Phone className="size-4 text-gold" aria-hidden="true" /> {CONTACTS.phoneDisplay}
                  </a>
                  <a href={CONTACTS.emailHref} className="flex items-center gap-3 hover:text-gold">
                    <Mail className="size-4 text-gold" aria-hidden="true" /> {CONTACTS.email}
                  </a>
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="size-4 text-gold" aria-hidden="true" /> {SITE.workingHours}
                  </p>
                </div>
              </Reveal>
            </ul>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <div className="h-full min-h-[320px] border border-hairline bg-surface">
              {YANDEX_MAP_EMBED_SRC ? (
                <iframe
                  src={YANDEX_MAP_EMBED_SRC}
                  title="Карта: офисы в Самаре"
                  loading="lazy"
                  className="h-full min-h-[320px] w-full border-0"
                />
              ) : (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center p-8 text-center">
                  <MapPin className="size-8 stroke-[1] text-muted-foreground" aria-hidden="true" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    [ЗАПОЛНИТЬ: код виджета Яндекс.Карт с двумя точками —
                    ул. Ленинская и ул. Киевская]
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
