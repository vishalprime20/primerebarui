"use client";

import type { ReactNode } from "react";
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
    <footer className="border-t border-black/10 bg-ink">
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
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(link.href);
                  }}
                  className="focus-ring text-muted transition-colors hover:text-ink-text"
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
            <p className="text-ink-text">{SITE.contact.address.name}</p>
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

      <div className="border-t border-black/8">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Swedesboro fabrication · Tri-state delivery</p>
        </div>
      </div>

      <div className="bg-[#3d4246]">
        <div className="container-site flex items-center justify-end gap-2.5 py-3">
          <SocialLink
            href={SITE.social.facebook}
            label="Facebook"
            className="bg-[#1877F2]"
          >
            <FacebookIcon />
          </SocialLink>
          <SocialLink
            href={SITE.social.linkedin}
            label="LinkedIn"
            className="bg-[#0A66C2]"
          >
            <LinkedInIcon />
          </SocialLink>
          <SocialLink
            href={SITE.social.twitter}
            label="Twitter"
            className="bg-[#1D9BF0]"
          >
            <TwitterIcon />
          </SocialLink>
          <SocialLink
            href={SITE.social.whatsapp}
            label="WhatsApp"
            className="h-11 w-11 rounded-full bg-[#25D366]"
          >
            <WhatsAppIcon />
          </SocialLink>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const classes = `inline-flex h-8 w-8 items-center justify-center rounded-[3px] text-white transition-opacity hover:opacity-85 ${className}`;
  if (!href) {
    return (
      <span className={classes} aria-label={label} title={label}>
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`focus-ring ${classes}`}
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.27V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M23.95 4.57a9.82 9.82 0 0 1-2.83.78 4.93 4.93 0 0 0 2.16-2.72 9.86 9.86 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.38 4.48A13.94 13.94 0 0 1 1.67 3.15a4.93 4.93 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.94 4.94 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.9 13.9 0 0 0 7.55 2.21c9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63A10 10 0 0 0 24 4.59z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.74.46 3.44 1.33 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.76 14.16c-.24.68-1.4 1.24-1.93 1.32-.5.07-1.13.1-1.82-.11-.42-.14-.95-.31-1.64-.6-2.88-1.25-4.76-4.15-4.9-4.34-.15-.2-1.2-1.59-1.2-3.03 0-1.44.75-2.15 1.02-2.44.26-.3.58-.37.77-.37h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.64 2.05 1.13 1.01 2.08 1.33 2.37 1.48.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.26.1 1.68.79 1.97.94.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}
