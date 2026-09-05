import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, MapPin, UserRound } from "lucide-react";
import type { SearchResult } from "@/types/search-result";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils/avatar";

interface UserInfoProps {
  result: SearchResult;
  color: (match: number) => string;
  authenticated: boolean;
  onBack: () => void;
}

export function UserInfo({
  result,
  color,
  authenticated,
  onBack,
}: UserInfoProps) {
  const profileButton = (
    <Button
      className="px-3 sm:px-4 py-2 bg-linear-to-br from-blue-600 to-purple-600 text-gray-50 text-xs sm:text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all whitespace-nowrap"
      disabled={!authenticated || !result.id}
      onClick={() => {
        if (authenticated && result.id) {
          window.open(
            `${import.meta.env.BASE_URL}profile/${result.id}`,
            "_blank",
          );
        }
      }}
    >
      <UserRound className="size-4" />
      Ver perfil completo
    </Button>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="sm:hidden -ml-2 mb-3 gap-1 text-gray-500"
      >
        <ArrowLeft className="size-4" />
        Voltar
      </Button>

      <div className="flex items-start gap-4">
        <Avatar className="size-16 shrink-0">
          <AvatarImage src={result.picture} className="rounded-2xl" />
          <AvatarFallback className="bg-gray-200 text-gray-500 rounded-2xl text-2xl font-semibold">
            {getInitials(result.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {result.name}
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">{result.title}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${color(result.chunks[0].match)}`}
              >
                {result.chunks[0].match}% match
              </span>
              {authenticated ? (
                profileButton
              ) : (
                <Tooltip>
                  <TooltipTrigger>{profileButton}</TooltipTrigger>
                  <TooltipContent side="bottom" className="text-gray-100 w-4/5">
                    Faça login para habilitar este recurso
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="size-4 shrink-0" />
              {result.city}, {result.uf}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2"></div>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <h3 className="text-normal font-semibold text-gray-600 ml-2 select-none">
          Chunk mais relevante
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed bg-gray-100 rounded-xl px-4 py-3">
          {result.chunks[0].content}
        </p>
      </div>
    </div>
  );
}
