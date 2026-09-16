import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Send, MessageCircle, Phone, Mail, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { CONTACTS, FORM_ENDPOINT, METRIKA_GOALS } from "@/config";
import { ALL_SERVICES } from "@/data/services";
import { onServiceRequest } from "@/lib/service-request";
import { reachGoal } from "@/lib/metrika";

type Status = "idle" | "loading" | "success" | "error";

function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);
  const p = digits.slice(1);
  let out = "+7";
  if (p.length) out += ` (${p.slice(0, 3)}`;
  if (p.length >= 3) out += `) ${p.slice(3, 6)}`;
  if (p.length >= 6) out += `-${p.slice(6, 8)}`;
  if (p.length >= 8) out += `-${p.slice(8, 10)}`;
  return out;
}

function collectUtm() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key.toLowerCase().startsWith("utm_")) utm[key.toLowerCase()] = value;
  });
  return utm;
}

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("Звонок");
  const [service, setService] = useState("other");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const honeypot = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  useEffect(() => onServiceRequest((id) => {
    setService(id);
    window.setTimeout(() => serviceRef.current?.focus(), 500);
  }), []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    if (phone.replace(/\D/g, "").length !== 11) next.phone = "Укажите телефон полностью";
    if (!consent) next.consent = "Без согласия мы не можем обработать заявку";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (honeypot.current?.value) return; // спам-бот

    setStatus("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          contact_method: contactMethod,
          service:
            ALL_SERVICES.find((s) => s.id === service)?.title ?? "Другое / не знаю",
          message: message.trim(),
          page_url: typeof window !== "undefined" ? window.location.href : "",
          ...collectUtm(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reachGoal(METRIKA_GOALS.formSubmit);
      setName("");
      setPhone("");
      setMessage("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full border border-on-navy/25 bg-transparent px-4 py-3 text-on-navy placeholder:text-on-navy/45 focus:border-gold focus:outline-none";

  return (
    <section id="contact-form" className="bg-navy text-on-navy">
      <div className="container-page section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Заявка</p>
          <h2 className="mt-4 text-2xl text-on-navy sm:text-3xl lg:text-4xl">Опишите задачу</h2>
          <p className="mt-5 max-w-md leading-relaxed text-on-navy-muted">
            Расскажите о ситуации в свободной форме. Отвечу, какие документы нужны, что можно
            сделать и сколько это займёт времени.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal(METRIKA_GOALS.telegramClick)}
              className="inline-flex items-center justify-center gap-2 border border-on-navy/30 px-6 py-4 text-sm font-semibold text-on-navy transition-colors hover:border-gold hover:text-gold-soft"
            >
              <Send className="size-4" aria-hidden="true" /> Написать в Telegram
            </a>
            <a
              href={CONTACTS.max}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reachGoal(METRIKA_GOALS.maxClick)}
              className="inline-flex items-center justify-center gap-2 border border-on-navy/30 px-6 py-4 text-sm font-semibold text-on-navy transition-colors hover:border-gold hover:text-gold-soft"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> Написать в MAX
            </a>
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <a
              href={CONTACTS.phoneHref}
              onClick={() => reachGoal(METRIKA_GOALS.phoneClick)}
              className="flex items-center gap-3 hover:text-gold-soft"
            >
              <Phone className="size-4 text-gold" aria-hidden="true" /> {CONTACTS.phoneDisplay}
            </a>
            <a href={CONTACTS.emailHref} className="flex items-center gap-3 hover:text-gold-soft">
              <Mail className="size-4 text-gold" aria-hidden="true" /> {CONTACTS.email}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          {status === "success" ? (
            <div className="border border-gold/50 p-8" role="status">
              <CheckCircle2 className="size-8 text-gold" aria-hidden="true" />
              <h3 className="mt-4 text-xl text-on-navy">Заявка отправлена</h3>
              <p className="mt-3 text-on-navy-muted">
                Свяжемся с вами в течение рабочего дня.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-semibold text-gold-soft underline underline-offset-4"
              >
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <input
                ref={honeypot}
                type="text"
                name="company_site"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="lead-name" className="mb-2 block text-sm text-on-navy-muted">
                  Имя<span className="text-gold">*</span>
                </label>
                <input
                  id="lead-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "lead-name-error" : undefined}
                  className={fieldClass}
                  placeholder="Как к вам обращаться"
                />
                {errors.name && (
                  <p id="lead-name-error" className="mt-2 text-xs text-gold-soft">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="lead-phone" className="mb-2 block text-sm text-on-navy-muted">
                  Телефон<span className="text-gold">*</span>
                </label>
                <input
                  id="lead-phone"
                  value={phone}
                  inputMode="tel"
                  autoComplete="tel"
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  onFocus={() => !phone && setPhone("+7")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                  className={fieldClass}
                  placeholder="+7 (___) ___-__-__"
                />
                {errors.phone && (
                  <p id="lead-phone-error" className="mt-2 text-xs text-gold-soft">{errors.phone}</p>
                )}
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm text-on-navy-muted">Как связаться</legend>
                <div className="flex flex-wrap gap-3">
                  {["Telegram", "MAX", "Звонок"].map((option) => (
                    <label
                      key={option}
                      className={`cursor-pointer border px-5 py-2.5 text-sm transition-colors ${
                        contactMethod === option
                          ? "border-gold text-gold-soft"
                          : "border-on-navy/25 text-on-navy-muted hover:border-on-navy/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="contact_method"
                        value={option}
                        checked={contactMethod === option}
                        onChange={() => setContactMethod(option)}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor="lead-service" className="mb-2 block text-sm text-on-navy-muted">
                  Услуга
                </label>
                <select
                  id="lead-service"
                  ref={serviceRef}
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${fieldClass} [&>option]:text-foreground`}
                >
                  {ALL_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Другое / не знаю</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lead-message" className="mb-2 block text-sm text-on-navy-muted">
                  Кратко о ситуации
                </label>
                <textarea
                  id="lead-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={fieldClass}
                  placeholder="Что произошло, какие документы есть, какие сроки"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="lead-consent" className="flex items-start gap-3 text-sm text-on-navy-muted">
                  <input
                    id="lead-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-invalid={!!errors.consent}
                    className="mt-1 size-4 accent-[var(--gold)]"
                  />
                  <span>
                    Согласен на обработку персональных данных в соответствии с{" "}
                    <Link to="/privacy" className="text-gold-soft underline underline-offset-4">
                      Политикой конфиденциальности
                    </Link>
                    <span className="text-gold">*</span>
                  </span>
                </label>
                {errors.consent && <p className="mt-2 text-xs text-gold-soft">{errors.consent}</p>}
              </div>

              {status === "error" && (
                <div className="flex gap-3 border border-gold/50 p-4 text-sm sm:col-span-2" role="alert">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-on-navy-muted">
                    Не удалось отправить заявку. Позвоните по телефону{" "}
                    <a href={CONTACTS.phoneHref} className="text-gold-soft underline underline-offset-4">
                      {CONTACTS.phoneDisplay}
                    </a>{" "}
                    или напишите в{" "}
                    <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="text-gold-soft underline underline-offset-4">
                      Telegram
                    </a>
                    .
                  </p>
                </div>
              )}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 bg-gold px-8 py-4 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                  {status === "loading" ? "Отправляем…" : "Отправить заявку"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
