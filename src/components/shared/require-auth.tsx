import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { Loader2 } from "lucide-react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { authenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (hasHydrated && !authenticated) {
      navigate("/", { replace: true });
    }
  }, [hasHydrated, authenticated, navigate]);

  // Enquanto não sabemos o estado real (hidratando) ou vamos redirecionar,
  // não renderiza a página protegida e evita "flash" de conteúdo.
  if (!hasHydrated || !authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return <>{children}</>;
}