import { Suspense, type CSSProperties } from "react";
import { contactContent } from "@/content/home";
import { sectionIds } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { isContactDeliveryConfigured } from "@/lib/contact-delivery";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactFormWithTopic } from "@/components/forms/contact-form-with-topic";

export function Contact() {
  const deliveryConfigured = isContactDeliveryConfigured();
  const { email, phone } = siteConfig.contact;

  return (
    <section id={sectionIds.contact} aria-labelledby="contact-title" className="section-y bg-cream">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeader
            id="contact-title"
            eyebrow={contactContent.eyebrow}
            title={contactContent.title}
            titleClassName="max-w-[13ch]"
          />
          <p data-reveal className="mt-8 max-w-[30rem] text-lead text-stone-deep">
            {contactContent.lead}
          </p>

          <ol className="mt-12 max-w-[30rem]">
            {contactContent.steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                className="grid grid-cols-[2.5rem_1fr] border-t border-ink/12 py-5"
              >
                <span aria-hidden="true" className="font-serif text-stone-deep italic">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-[0.9375rem] font-semibold">{step.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-stone-deep">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          {(email || phone) && (
            <dl className="mt-10 grid gap-4 text-[0.9375rem]">
              {email && (
                <div>
                  <dt className="eyebrow text-stone-deep">E-mail</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${email}`} className="underline underline-offset-4">
                      {email}
                    </a>
                  </dd>
                </div>
              )}
              {phone && (
                <div>
                  <dt className="eyebrow text-stone-deep">Telefon</dt>
                  <dd className="mt-1">
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="underline underline-offset-4">
                      {phone}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div data-reveal className="relative bg-paper p-6 sm:p-10 lg:col-span-6 lg:col-start-7 xl:p-14">
          <Suspense fallback={<ContactForm deliveryConfigured={deliveryConfigured} />}>
            <ContactFormWithTopic deliveryConfigured={deliveryConfigured} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
