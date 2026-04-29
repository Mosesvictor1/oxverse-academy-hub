export const SITE = {
  phone: "+2349138691147",
  phoneDisplay: "+234 913 869 1147",
  whatsapp: "2349138691147",
  email: "hello@oxverse.academy",
  address: "No 82, Century Bus Stop, Ago Palace Way, Okota, Lagos.",
  addressShort: "Okota, Lagos",
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;