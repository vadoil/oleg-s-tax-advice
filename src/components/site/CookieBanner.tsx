import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "cookie-consent-v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* localStorage недоступен */
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Уведомление об использовании cookie"
      className="fixed inset-x-0 bottom-14 z-50 border-t border-hairline bg-background md:bottom-0"
    >
      <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Сайт использует cookie и обрабатывает данные посетителей для корректной работы и
          статистики. Подробнее —{" "}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-gold">
            в политике конфиденциальности
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {
              /* игнорируем */
            }
            setVisible(false);
          }}
          className="shrink-0 bg-navy px-6 py-3 text-sm font-semibold text-on-navy hover:bg-navy-soft"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
