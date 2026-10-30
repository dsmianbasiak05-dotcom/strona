import Link from "next/link";
import type { CSSProperties } from "react";
import { services } from "@/content/services";
import { servicesContent } from "@/content/home";
import { sectionIds } from "@/config/navigation";
import type { Service } from "@/types/content";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceIcon } from "@/components/ui/service-icon";
import { ArrowIcon } from "@/components/ui/arrow-icon";

/** Until a dedicated service page exists, cards lead to the contact form with the topic preselected. */
function serviceHref(service: Service) {
  return service.href ?? `/?temat=${service.id}#${sectionIds.contact}`;
}

export function Services() {
  return (
    <section id={sectionIds.services} aria-labelledby="services-title" className="section-y bg-cream">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeader
            id="services-title"
            eyebrow={servicesContent.eyebrow}
            title={servicesContent.title}
            className="lg:col-span-7"
            titleClassName="max-w-[16ch]"
          />
          <p data-reveal className="max-w-[36rem] leading-relaxed text-stone-deep lg:col-span-4 lg:col-start-9 lg:pb-2">
            {servicesContent.lead}
          </p>
        </div>

        <ul className="mt-16 grid border-t border-l border-ink/12 sm:grid-cols-2 lg:mt-24 xl:grid-cols-4">
          {services.map((service, index) => (
            <li
              key={service.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="border-r border-b border-ink/12"
            >
              <article className="group relative flex h-full flex-col p-7 transition-colors duration-700 ease-premium hover:bg-paper sm:p-9 xl:min-h-[30rem]">
                <div className="flex items-start justify-between gap-6">
                  <span className="font-serif text-[1.0625rem] text-stone-deep italic">{service.number}</span>
                  <ServiceIcon
                    name={service.icon}
                    className="text-stone transition-[color,transform] duration-700 ease-premium group-hover:-translate-y-1 group-hover:text-ink"
                  />
                </div>

                <h3 className="mt-14 font-serif text-h3 xl:mt-auto">{service.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-stone-deep">{service.description}</p>

                <Link
                  href={serviceHref(service)}
                  className="mt-8 inline-flex min-h-11 items-center gap-3 self-start text-[0.75rem] font-semibold tracking-[0.08em] uppercase after:absolute after:inset-0 after:content-['']"
                >
                  {servicesContent.linkLabel}
                  <span className="sr-only">: {service.title}</span>
                  <ArrowIcon className="transition-transform duration-500 ease-premium group-hover:translate-x-1" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
