/**
 * Config publica do site — fica inlineada no bundle.
 *
 * Turnstile site key e publica por design (Cloudflare valida origem via o secret
 * que fica no servidor). Nao e segredo, nao precisa esconder em env var.
 */

export const API_BASE = "https://app.cultivee.com.br";

/** Cloudflare Turnstile site key — cultivee.com.br + www + localhost. */
export const TURNSTILE_SITE_KEY = "0x4AAAAAADA5UqYETvPJLNoN";
