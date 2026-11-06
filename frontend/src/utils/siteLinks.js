// Builds the WhatsApp chat link from the Site settings (the number has digits only).
export const whatsappLink = (contact) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;
