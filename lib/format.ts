/**
 * Pure, reusable formatting utilities. No brand data lives here.
 */

/** Strip everything but digits (and a leading +) from a phone/WhatsApp value. */
export function toDialable(value: string): string {
  const trimmed = value.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

/** Build a tel: href from a phone number. */
export function telHref(phone: string): string {
  return `tel:${toDialable(phone)}`;
}

/** Build a wa.me link with an optional prefilled message. */
export function whatsappHref(whatsapp: string, message?: string): string {
  const number = whatsapp.replace(/\D/g, "");
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
