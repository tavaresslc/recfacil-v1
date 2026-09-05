import {
  Bot,
  BotMessageSquare,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send,
} from "lucide-react";
import type { SearchResult } from "@/types/search-result";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { type SubmitEvent, useState } from "react";
import { SEARCH_FORM_LIMIT } from "@/constants/env";

interface QuestionFormProps {
  result: SearchResult;
  authenticated: boolean;
}

export function QuestionForm({ result, authenticated }: QuestionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(true);

  const showQuestionIdeas = false;

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim() || !authenticated) return;

    const lastAnswer = answer;

    setIsLoading(true);
    setAnswer(null);

    const question = result.questionIdeas.find(
      (q) => q.question === query.trim(),
    );

    if (question) {
      setTimeout(() => {
        setAnswer(question.answer);
        setIsLoading(false);
        setLastQuery(query.trim());
      }, 1500);
      return;
    } else if (query.trim() === lastQuery) {
      setTimeout(() => {
        setAnswer(lastAnswer);
        setIsLoading(false);
      }, 1500);
      return;
    }

    try {
      console.log("Perguntando à IA:", query.trim());
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAnswer(`Resposta da IA para a pergunta: "${query.trim()}"`);
    } finally {
      setIsLoading(false);
      setLastQuery(query.trim());
    }
  }

  return (
    <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-6 rounded-md bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
            <Bot className="size-3.5 text-gray-50" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate select-none">
            Pergunte à IA
          </span>
          {!authenticated && (
            <span className="text-xs text-gray-400 hidden sm:inline">
              (Faça login para habilitar este recurso)
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFormOpen((prev) => !prev)}
        >
          {formOpen ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronUp className="size-4" />
          )}
        </Button>
      </div>
      {formOpen && (
        <div className="flex flex-col mt-3">
          {showQuestionIdeas && (
            <div className="flex gap-2 mb-3 w-full overflow-x-auto pb-1 scrollbar-thin">
              {result.questionIdeas.map((q) => (
                <Button
                  key={q.question}
                  variant="outline"
                  size="sm"
                  suppressHydrationWarning
                  className={`text-xs shrink-0 max-w-55 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors ${query === q.question && authenticated ? "bg-blue-50 border-blue-400 text-blue-600" : ""}`}
                  onClick={() => authenticated && setQuery(q.question)}
                  disabled={!authenticated || isLoading}
                >
                  <span className="block truncate">{q.question}</span>
                </Button>
              ))}
            </div>
          )}
          <form
            autoComplete="off"
            className="flex gap-2"
            onSubmit={authenticated ? handleSubmit : () => {}}
          >
            <InputGroup className="w-full">
              <InputGroupInput
                name="query"
                autoComplete="off"
                placeholder={`Pergunte sobre ${result.name}...`}
                value={authenticated ? query : ""}
                onChange={(e) => setQuery(e.target.value)}
                maxLength={SEARCH_FORM_LIMIT}
                disabled={!authenticated || isLoading}
                className="text-sm"
              />
              <InputGroupAddon>
                <BotMessageSquare className="size-4" />
              </InputGroupAddon>

              <InputGroupAddon align="inline-end">
                <span className="text-sm text-gray-500">
                  {query.length} / {SEARCH_FORM_LIMIT}
                </span>
              </InputGroupAddon>
            </InputGroup>
            <Button
              type="submit"
              className="px-3 py-2 bg-linear-to-br from-blue-600 to-purple-600 text-gray-50 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shrink-0"
              disabled={!authenticated || isLoading || !query.trim()}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </form>
          {lastQuery && authenticated && (
            <div className="mt-3 flex items-center gap-2">
              <div className="size-8 rounded-md bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="size-5 text-gray-50" />
              </div>
              <div className="flex items-center flex-1 min-w-0 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 shadow-sm">
                {answer ? (
                  answer
                ) : (
                  <span className="flex gap-1 items-center h-5">
                    <span
                      className="size-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="size-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="size-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
