import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { GoogleProvider } from "@/components/shared/providers/google-provider";

export function AppLayout() {
  return (
    <GoogleProvider>
      <div className="h-dvh flex flex-col">
        <Header />
        <Outlet />
      </div>
    </GoogleProvider>
  );
}
