import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Situations } from "@/components/site/Situations";
import { Process } from "@/components/site/Process";
import { About } from "@/components/site/About";
import { Stats } from "@/components/site/Stats";
import { Faq, FAQ_ITEMS } from "@/components/site/Faq";
import { LeadForm } from "@/components/site/LeadForm";
import { Contacts } from "@/components/site/Contacts";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { CONTACTS, OFFICES, SITE } from "@/config";

const TITLE = "Налоговый аудит и налоговые споры в Самаре | О. П. Городсков";
const DESCRIPTION =
  "Налоговый аудит, due diligence, сопровождение налоговых проверок, возражения и представление интересов в налоговом органе и арбитражном суде. Самара, опыт с 1995 года.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: `${SITE.legalName} — налоговый и финансовый аудит`,
  description: DESCRIPTION,
  telephone: "+7 927 701-36-36",
  email: CONTACTS.email,
  areaServed: "Самара, Самарская область",
  priceRange: "по запросу",
  founder: { "@type": "Person", name: SITE.ownerFullName },
  address: OFFICES.map((office) => ({
    "@type": "PostalAddress",
    streetAddress: office.address.replace("г. Самара, ", ""),
    addressLocality: "Самара",
    addressCountry: "RU",
  })),
  knowsAbout: [
    "Налоговый аудит",
    "Due diligence",
    "Налоговые споры",
    "Трансфертное ценообразование",
    "Бухгалтерское консультирование",
  ],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "ru_RU" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(JSON_LD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_LD) },
    ],
  }),
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Situations />
        <Process />
        <About />
        <Stats />
        <Faq />
        <LeadForm />
        <Contacts />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
