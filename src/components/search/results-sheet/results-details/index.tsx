import { Bot } from "lucide-react";
import type { SearchResult } from "@/types/search-result";
import { useAuthStore } from "@/lib/store/auth-store";
import { UserInfo } from "./user-info";
import { QuestionForm } from "./question-form";

interface ResultDetailsProps {
  result: SearchResult | null;
  color: (compatibilidade: number) => string;
  onBack: () => void;
}

export function ResultDetails({ result, color, onBack }: ResultDetailsProps) {
  const { authenticated } = useAuthStore();

  return (
    <div
      className={`${result ? "flex" : "hidden sm:flex"} flex-1 w-full flex-col overflow-hidden`}
    >
      {result ? (
        <>
          <UserInfo
            result={result}
            color={color}
            authenticated={authenticated}
            onBack={onBack}
          />
          <QuestionForm
            key={result.id}
            result={result}
            authenticated={authenticated}
          />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 select-none">
          <div className="size-16 rounded-2xl bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
            <Bot className="size-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Selecione um profissional
          </h3>
          <p className="text-gray-500 text-sm mt-2 max-w-xs">
            Clique em um profissional na lista para ver detalhes e conversar com
            a IA sobre o perfil
          </p>
        </div>
      )}
    </div>
  );
}
