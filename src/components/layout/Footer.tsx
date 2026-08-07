"use client";

import { NAV_LINKS, SITE } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToHash = (href: string) => {
    const id = href.replace("#", "");
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "#home");
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <BrandLogo size="footer" />
          <p className="mt-4 max-w-md text-muted">{SITE.tagline}</p>
          <p className="mt-3 max-w-md text-sm text-steel">
            Full-service fabrication in {SITE.contact.facility} — delivering
            across the tri-state area.
          </p>
        </div>

        <div>
          <p className="font-display text-sm tracking-[0.18em] text-steel-light">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(link.href);
                  }}
                  className="focus-ring text-muted transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm tracking-[0.18em] text-steel-light">
            Contact
          </p>
          <address className="mt-4 not-italic text-muted">
            <p className="text-white">{SITE.contact.address.name}</p>
            <p>{SITE.contact.address.line1}</p>
            <p>
              {SITE.contact.address.city}, {SITE.contact.address.state}{" "}
              {SITE.contact.address.zip}
            </p>
            <p className="mt-3">{SITE.contact.person}</p>
            <p className="mt-2">
              <a
                href={SITE.contact.phoneHref}
                className="focus-ring text-accent hover:text-accent-hover"
              >
                {SITE.contact.phone}
              </a>
            </p>
            <p>
              <a
                href={SITE.contact.emailHref}
                className="focus-ring text-accent hover:text-accent-hover"
              >
                {SITE.contact.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Swedesboro fabrication · Tri-state delivery</p>
        </div>
      </div>
    </footer>
  );
}
