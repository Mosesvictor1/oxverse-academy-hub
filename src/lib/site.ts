export const SITE = {
  phone: "+2348148462776",
  phoneDisplay: "+234 8148462776",
  whatsapp: "2348148462776",
  email: "hello@oxverse.academy",
  address: "No 82, Century Bus Stop, Ago Palace Way, Okota, Lagos.",
  addressShort: "Okota, Lagos",
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
