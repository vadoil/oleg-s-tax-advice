import { useEffect, useState } from "react";
import { Menu, Phone, Send, X, MessageCircle } from "lucide-react";
import { CONTACTS, SITE, METRIKA_GOALS } from "@/config";
import { reachGoal } from "@/lib/metrika";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#services", label: "Услуги" },
  { href: "#situations", label: "Когда нужен" },
  { href: "#process", label: "Как работаем" },
  { href: "#about", label: "О специалисте" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hairline bg-editorial/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <a href="#top" className="flex min-w-0 flex-col leading-tight">
            <span className="font-serif text-base font-bold md:text-xl">{SITE.ownerShortName}</span>
            <span className="truncate text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:text-xs">
              {SITE.tagline}
            </span>
          </a>

          <nav aria-label="Основная навигация" className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-foreground/80 transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={CONTACTS.phoneHref}
              onClick={() => reachGoal(METRIKA_GOALS.phoneClick)}
              className="text-sm font-semibold whitespace-nowrap hover:text-gold"
            >
              {CONTACTS.phoneDisplay}
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center whitespace-nowrap border border-gold bg-gold px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-transparent hover:text-gold"
            >
              Получить консультацию
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center border border-hairline lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-hairline bg-background lg:hidden">
            <nav aria-label="Мобильная навигация" className="container-page flex flex-col py-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-hairline py-3.5 text-base"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact-form"
                onClick={() => setOpen(false)}
                className="mt-4 mb-3 inline-flex items-center justify-center bg-gold px-4 py-3 text-sm font-semibold text-accent-foreground"
              >
                Получить консультацию
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Плавающие кнопки связи на мобильных */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-px border-t border-navy-soft bg-navy md:hidden">
        <a
          href={CONTACTS.phoneHref}
          onClick={() => reachGoal(METRIKA_GOALS.phoneClick)}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-on-navy"
        >
          <Phone className="size-4" aria-hidden="true" /> Позвонить
        </a>
        <a
          href={CONTACTS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => reachGoal(METRIKA_GOALS.telegramClick)}
          className="flex flex-1 items-center justify-center gap-2 border-l border-navy-soft py-3.5 text-sm font-semibold text-on-navy"
        >
          <Send className="size-4" aria-hidden="true" /> Telegram
        </a>
        <a
          href={CONTACTS.max}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => reachGoal(METRIKA_GOALS.maxClick)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 border-l border-navy-soft py-3.5 text-sm font-semibold text-on-navy",
          )}
        >
          <MessageCircle className="size-4" aria-hidden="true" /> MAX
        </a>
      </div>
    </>
  );
}
