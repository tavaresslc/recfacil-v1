/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_SEARCH_FORM_LIMIT: string;
  readonly VITE_CHUNK_LIMIT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
