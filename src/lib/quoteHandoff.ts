import { postFormPayload } from "@/lib/formSubmit";

export const QUOTE_NOTES_KEY = "prime-quote-notes";
export const QUOTE_TYPE_KEY = "prime-quote-type";

export function sendQuoteNotes(notes: string, projectType?: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(QUOTE_NOTES_KEY, notes.trim());
  if (projectType) sessionStorage.setItem(QUOTE_TYPE_KEY, projectType);
  window.dispatchEvent(new Event("prime-quote-notes"));
  const el = document.getElementById("contact");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  window.history.replaceState(null, "", "#contact");
}

export function consumeQuoteNotes(): { notes: string; projectType?: string } | null {
  if (typeof window === "undefined") return null;
  const notes = sessionStorage.getItem(QUOTE_NOTES_KEY);
  const projectType = sessionStorage.getItem(QUOTE_TYPE_KEY) ?? undefined;
  if (!notes) return null;
  sessionStorage.removeItem(QUOTE_NOTES_KEY);
  sessionStorage.removeItem(QUOTE_TYPE_KEY);
  return { notes, projectType };
}

/** POST a short summary to Formspree (if configured), then hand off into the quote form. */
export async function sendToolQuote(notes: string, source: string) {
  await postFormPayload({
    _subject: `Prime Rebar tool quote — ${source}`,
    source,
    message: notes,
  });
  sendQuoteNotes(notes);
}
