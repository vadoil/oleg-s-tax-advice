/**
 * Единый файл настроек сайта.
 * Все контакты, ссылки и идентификаторы меняются только здесь.
 */

export const SITE = {
  ownerShortName: "О. П. Городсков",
  ownerFullName: "Городсков Олег Петрович", // [ПРОВЕРИТЬ фамилию]
  legalName: "ИП Городсков Олег Петрович", // [ПРОВЕРИТЬ фамилию]
  tagline: "Налоговый и финансовый аудит",
  inn: "[ЗАПОЛНИТЬ ИНН]",
  ogrnip: "[ЗАПОЛНИТЬ ОГРНИП]",
  ipRegisteredAt: "10.11.2012",
  experienceSince: 1995,
  workingHours: "[ЗАПОЛНИТЬ режим работы]",
  city: "Самара",
} as const;

export const CONTACTS = {
  phoneDisplay: "8 927 701-36-36",
  phoneHref: "tel:+79277013636",
  email: "YSV63@mail.ru",
  emailHref: "mailto:YSV63@mail.ru",
  telegram: "https://t.me/USERNAME", // [ЗАПОЛНИТЬ ссылку на Telegram]
  max: "https://max.ru/USERNAME", // [ЗАПОЛНИТЬ ссылку на MAX]
} as const;

export const OFFICES = [
  {
    id: "leninskaya",
    title: "Офис на Ленинской",
    address: "г. Самара, ул. Ленинская, 22В", // [ПРОВЕРИТЬ: 228 или 22В]
    note: "[ПРОВЕРИТЬ номер дома]",
  },
  {
    id: "kievskaya",
    title: "Офис на Киевской",
    address: "г. Самара, ул. Киевская, д. 15", // [ПРОВЕРИТЬ]
    note: "[ПРОВЕРИТЬ адрес]",
  },
] as const;

/** Адрес обработчика формы на вашем хостинге (PHP-скрипт). */
export const FORM_ENDPOINT = "/send.php";

/** Яндекс.Метрика: номер счётчика. Пусто — счётчик не подключается. */
export const YANDEX_METRIKA_ID = ""; // [ЗАПОЛНИТЬ номер счётчика Яндекс.Метрики]

/** Цели Яндекс.Метрики */
export const METRIKA_GOALS = {
  formSubmit: "form_submit",
  telegramClick: "telegram_click",
  maxClick: "max_click",
  phoneClick: "phone_click",
} as const;

/** Встраиваемая Яндекс.Карта (конструктор карт → код виджета). */
export const YANDEX_MAP_EMBED_SRC = ""; // [ЗАПОЛНИТЬ ссылку на виджет Яндекс.Карт]

export const PRIVACY_UPDATED_AT = "[ЗАПОЛНИТЬ дату редакции]";
