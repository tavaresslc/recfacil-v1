import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/header";

export function AppLayout() {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
