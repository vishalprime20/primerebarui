export const SITE = {
  name: "Prime Rebar",
  tagline: "Leading Rebar Fabricator in New York & New Jersey",
  about:
    "At Prime Rebar, our top priority is you. We pride ourselves on providing exceptional customer service with a speedy turnaround and competitive prices.",
  aboutFacility:
    "With our full-service fabrication facility in Swedesboro, New Jersey, we are well situated to deliver steel efficiently across the tri-state area.",
  yearEstablished: 2015,
  projectsCompleted: 1400,
  /** Combined Total Tonnage from both Prime Rebar project workbooks. */
  totalTonnage: 172737,
  contact: {
    person: "Shiya Lax",
    phone: "908.707.1234",
    phoneHref: "tel:9087071234",
    email: "office@primerebar.com",
    emailHref: "mailto:office@primerebar.com",
    website: "https://www.primerebar.com/",
    address: {
      name: "PRIME REBAR",
      line1: "121 High Hill Rd",
      city: "Swedesboro",
      state: "NJ",
      zip: "08085",
      full: "121 High Hill Rd, Swedesboro, NJ 08085",
    },
    facility: "Swedesboro, New Jersey",
    quoteRecipients: ["office@primerebar.com", "vishal@primerebar.com"],
  },
  social: {
    facebook: "https://www.facebook.com/rebarfabrication/",
    linkedin: "",
    twitter: "",
    whatsapp: "https://wa.me/19087071234?text=Hey",
  },
} as const;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Gallery" },
  { href: "#tools", label: "Tools" },
  { href: "#contact", label: "Contact" },
] as const;
