import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { GoogleProvider } from "@/components/shared/providers/google-provider";
import { TooltipProvider } from "../ui/tooltip";

export function AppLayout() {
  return (
    <GoogleProvider>
      <div className="h-dvh flex flex-col">
        <Header />
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </div>
    </GoogleProvider>
  );
}
