/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_OPENROUTER_API_KEY?: string;
    [key: string]: string | boolean | undefined;
  }
}