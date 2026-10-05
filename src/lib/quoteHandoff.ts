export const QUOTE_NOTES_KEY = "prime-quote-notes";

export function sendQuoteNotes(notes: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(QUOTE_NOTES_KEY, notes.trim());
  window.dispatchEvent(new Event("prime-quote-notes"));
  const el = document.getElementById("contact");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  window.history.replaceState(null, "", "#contact");
}

export function consumeQuoteNotes(): string | null {
  if (typeof window === "undefined") return null;
  const notes = sessionStorage.getItem(QUOTE_NOTES_KEY);
  if (!notes) return null;
  sessionStorage.removeItem(QUOTE_NOTES_KEY);
  return notes;
}
