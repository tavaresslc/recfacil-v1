import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";
import { GOOGLE_CLIENT_ID } from "@/constants/env";

export function GoogleProvider({ children }: { children: ReactNode }) {
  if (!GOOGLE_CLIENT_ID) {
    console.warn(
      "VITE_GOOGLE_CLIENT_ID não definido - login com Google desabilitado.",
    );
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}