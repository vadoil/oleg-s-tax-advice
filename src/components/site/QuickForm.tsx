import { useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { FORM_ENDPOINT, METRIKA_GOALS, CONTACTS } from "@/config";
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

type Props = {
  /** Тема заявки, уходит в поле service */
  topic: string;
  /** Тёмный фон (тёмно-синяя секция) */
  dark?: boolean;
  submitLabel?: string;
  id?: string;
};

/** Короткая форма в 2 поля — для первого экрана и CTA-блоков. */
export function QuickForm({ topic, dark = false, submitLabel = "Получить консультацию", id }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);

  const field = dark
    ? "w-full border border-on-navy/25 bg-transparent px-4 py-3.5 text-on-navy placeholder:text-on-navy/45 focus:border-gold focus:outline-none"
    : "w-full border border-hairline bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";
  const muted = dark ? "text-on-navy-muted" : "text-muted-foreground";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot.current?.value) return;
    if (name.trim().length < 2) return setError("Укажите имя");
    if (phone.replace(/\D/g, "").length !== 11) return setError("Укажите телефон полностью");
    setError("");
    setStatus("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          contact_method: "Звонок",
          service: topic,
          message: "",
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error("failed");
      reachGoal(METRIKA_GOALS.formSubmit);
      setStatus("success");
      setName("");
      setPhone("");
    } catch {
      setStatus("error");
      setError("Не удалось отправить. Позвоните: " + CONTACTS.phoneDisplay);
    }
  }

  if (status === "success") {
    return (
      <div className={`flex items-start gap-3 border p-5 ${dark ? "border-gold/50" : "border-hairline bg-background"}`} role="status">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
        <p className={`text-sm leading-relaxed ${muted}`}>
          Заявка отправлена. Свяжемся с вами в течение рабочего дня.
        </p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
      <input ref={honeypot} type="text" name="company_site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input
        aria-label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        className={field}
        placeholder="Имя"
      />
      <input
        aria-label="Телефон"
        value={phone}
        inputMode="tel"
        autoComplete="tel"
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        onFocus={() => !phone && setPhone("+7")}
        className={field}
        placeholder="+7 (___) ___-__-__"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        {submitLabel}
        {status !== "loading" && <ArrowRight className="size-4" aria-hidden="true" />}
      </button>
      <p className={`text-xs leading-relaxed sm:col-span-3 ${error ? "text-gold" : muted}`}>
        {error || (
          <>
            Нажимая кнопку, вы соглашаетесь с{" "}
            <Link to="/privacy" className="underline underline-offset-4">
              Политикой конфиденциальности
            </Link>
            . Перезвоним в течение рабочего дня.
          </>
        )}
      </p>
    </form>
  );
}
