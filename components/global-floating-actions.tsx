'use client'

import { AiChatbot } from './ai-chatbot'

export function GlobalFloatingActions() {
  return (
    <div className="global-floating-actions" aria-label="Floating quick actions">
      {/* Viewport-fixed WhatsApp CTA (bottom-left) */}
      <a
        href="https://wa.me/91920464875?text=Hello%2C%20I%E2%80%99m%20interested%20in%20B.S.%20HITECH%20APARTMENT.%20Please%20share%20more%20details."
        target="_blank"
        rel="noopener noreferrer"
        className="global-floating-whatsapp hero-carousel-whatsapp"
        aria-label="Chat on WhatsApp about B.S. HITECH APARTMENT"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.29-8.24 2.21 0 4.29.86 5.85 2.43a8.18 8.18 0 0 1 2.43 5.81c0 4.55-3.7 8.24-8.28 8.24zm4.54-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
        </svg>
      </a>

      {/* Viewport-fixed AI Chatbot button & dialog (bottom-right) */}
      <AiChatbot />
    </div>
  )
}
