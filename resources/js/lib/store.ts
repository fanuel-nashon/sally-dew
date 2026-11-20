// Your WhatsApp number in international format, digits only (no +, spaces or leading 0).
// Example: 255712345678
export const WHATSAPP_NUMBER = '2557XXXXXXXX';

export function whatsappOrderLink(message: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}