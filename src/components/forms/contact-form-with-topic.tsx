"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/forms/contact-form";

/** Reads ?temat=… (set by service cards) so the matching interest is preselected. */
export function ContactFormWithTopic({ deliveryConfigured }: { deliveryConfigured: boolean }) {
  const topic = useSearchParams().get("temat");
  return <ContactForm initialTopic={topic} deliveryConfigured={deliveryConfigured} />;
}
