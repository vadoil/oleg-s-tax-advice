import { YANDEX_METRIKA_ID } from "@/config";

declare global {
  interface Window {
    ym?: (id: number, action: string, target?: string) => void;
  }
}

/** Отправка цели в Яндекс.Метрику (безопасно, если счётчик не подключён). */
export function reachGoal(goal: string) {
  if (typeof window === "undefined") return;
  const id = Number(YANDEX_METRIKA_ID);
  if (!id || typeof window.ym !== "function") return;
  window.ym(id, "reachGoal", goal);
}
