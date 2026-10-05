import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center section-pad">
      <div className="container-site text-center">
        <p className="font-display text-sm tracking-[0.22em] text-accent">404</p>
        <h1 className="mt-3 font-display text-5xl tracking-[0.06em] text-ink-text">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          That page doesn’t exist. Head back to Prime Rebar’s home or jump to
          contact.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/">Back Home</Button>
          <Button href="/#contact" variant="secondary">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
