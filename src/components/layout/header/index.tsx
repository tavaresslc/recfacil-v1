import { ArrowLeft, LogOut, Save, Sparkles, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HeaderButton } from "./header-button";
import { useAuthStore } from "@/lib/store/auth-store";
import { useProfileFormStore } from "@/lib/store/profile-form-store";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import googleIcon from "@/assets/google.svg";

const HOME_PATH = "/";
const PROFILE_PATH = "/profile";

export function Header() {
  const { pathname: pathName } = useLocation();
  const { authenticated, logout } = useAuthStore();
  const googleLogin = useGoogleAuth();
  const { submit, canSubmit, submitting } = useProfileFormStore();

  const isHomePage = pathName === HOME_PATH;
  const isProfilePage = pathName === PROFILE_PATH;

  return (
    <header className="flex items-center justify-between gap-3 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 border-b border-gray-200 flex-wrap">
      <Logo isHomePage={isHomePage} />

      {!authenticated ? (
        <HeaderButton
          icon={<img src={googleIcon} alt="Google" className="w-5 h-5" />}
          label="Entrar com Google"
          onClick={() => googleLogin?.()}
        />
      ) : isProfilePage ? (
        <div className="flex items-center gap-2 sm:gap-4">
          <HeaderButton
            icon={<ArrowLeft className="size-5" />}
            label="Voltar"
            href={HOME_PATH}
          />
          <HeaderButton
            icon={<Save className="size-5" />}
            label="Salvar"
            onClick={() => submit?.()}
            disabled={!submit || !canSubmit || submitting}
            loading={submitting}
          />
        </div>
      ) : isHomePage ? (
        <div className="flex items-center gap-2 sm:gap-4">
          <HeaderButton
            icon={<User className="size-5" />}
            label="Meu Perfil"
            href={PROFILE_PATH}
          />
          <HeaderButton
            icon={<LogOut className="size-5" />}
            label="Sair"
            onClick={logout}
          />
        </div>
      ) : null}
    </header>
  );
}

interface LogoProps {
  isHomePage: boolean;
}

function Logo({ isHomePage }: LogoProps) {
  return (
    <Link
      to={HOME_PATH}
      draggable={false}
      className={`flex items-center gap-2 select-none ${
        isHomePage
          ? "cursor-auto"
          : "cursor-pointer hover:opacity-60 transition-opacity duration-300"
      }`}
    >
      <div className="inline-flex items-center justify-center size-8 sm:size-9 rounded-xl bg-linear-to-br from-blue-600 to-purple-600 shrink-0">
        <Sparkles className="size-4 sm:size-5 text-gray-50" />
      </div>
      <span className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">
        RecFacil
      </span>
    </Link>
  );
}
