import { Link } from "@tanstack/react-router";
import { CONTACTS, SITE } from "@/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy pb-20 text-on-navy-muted md:pb-0">
      <div className="container-page grid gap-8 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-on-navy">{SITE.legalName}</p>
          <p className="mt-3 text-sm">ИНН: {SITE.inn}</p>
          <p className="text-sm">ОГРНИП: {SITE.ogrnip}</p>
        </div>
        <div className="text-sm">
          <p>{CONTACTS.phoneDisplay}</p>
          <p className="mt-1">{CONTACTS.email}</p>
          <p className="mt-3">г. Самара</p>
        </div>
        <div className="text-sm">
          <Link to="/privacy" className="underline underline-offset-4 hover:text-gold-soft">
            Политика конфиденциальности
          </Link>
          <p className="mt-4">
            Частная консультационная практика. Не является государственным органом.
          </p>
        </div>
      </div>
      <div className="border-t border-navy-soft">
        <div className="container-page py-5 text-xs">© {year} {SITE.legalName}</div>
      </div>
    </footer>
  );
}
