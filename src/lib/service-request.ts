type Listener = (serviceId: string) => void;

const listeners = new Set<Listener>();

/** Подписка формы на «Заказать эту услугу». */
export function onServiceRequest(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Подставить услугу в форму и проскроллить к ней. */
export function requestService(serviceId: string) {
  listeners.forEach((l) => l(serviceId));
  if (typeof document !== "undefined") {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
