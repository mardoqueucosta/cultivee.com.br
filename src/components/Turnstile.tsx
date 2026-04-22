import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget (adaptado do biopdi-nextjs para Vite/SPA).
 *
 * - Carrega o script do challenges.cloudflare.com uma vez por pagina (idempotente).
 * - Renderiza o widget explicitamente com `render="explicit"` + callback `onTurnstileLoad`.
 * - Callbacks (onVerify/onExpire/onError) ficam em refs — trocar callbacks nao re-renderiza
 *   o widget (que perderia o token e forcaria o usuario a clicar de novo).
 *
 * Site key e configurada em src/lib/config.ts (publica — fica no bundle).
 */

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (errorCode?: string) => void;
  size?: "normal" | "compact" | "flexible";
  theme?: "light" | "dark" | "auto";
}

export function Turnstile({ siteKey, onVerify, onExpire, onError, size = "flexible", theme = "light" }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const mountedRef = useRef(true);

  // Callbacks em refs — mudar o prop onVerify nao re-renderiza o widget
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!siteKey) {
      console.warn("[TURNSTILE] Site key ausente — widget desativado, forms passam sem token");
      onVerifyRef.current("turnstile-disabled");
      return;
    }

    mountedRef.current = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return;

      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      if (!mountedRef.current) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onVerifyRef.current(token),
        "expired-callback": () => onExpireRef.current?.(),
        "error-callback": (errorCode: string) => {
          console.error("[TURNSTILE] Widget error:", errorCode);
          onErrorRef.current?.(errorCode);
        },
        retry: "auto",
        "retry-interval": 5000,
        theme,
        size,
      });
    };

    const scriptExists = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
    if (!scriptExists) {
      const callbackName = "onTurnstileLoad";
      window[callbackName] = () => {
        if (mountedRef.current) renderWidget();
      };
      const script = document.createElement("script");
      script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=${callbackName}`;
      script.async = true;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
    } else {
      // Script foi adicionado mas ainda nao carregou — polling
      intervalId = setInterval(() => {
        if (window.turnstile) {
          if (intervalId) clearInterval(intervalId);
          intervalId = null;
          if (mountedRef.current) renderWidget();
        }
      }, 100);
    }

    return () => {
      mountedRef.current = false;
      if (intervalId) clearInterval(intervalId);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  return <div ref={containerRef} />;
}
