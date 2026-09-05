export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const IS_PROTOTIPO = import.meta.env.VITE_PROTOTIPO === "true";

export const SEARCH_FORM_LIMIT = parseInt(
  import.meta.env.VITE_SEARCH_FORM_LIMIT || "100",
  10,
);

export const CHUNK_LIMIT = parseInt(
  import.meta.env.VITE_CHUNK_LIMIT || "500",
  10,
);