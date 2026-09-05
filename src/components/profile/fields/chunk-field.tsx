import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { CHUNK_LIMIT } from "@/lib/validation/profile";

interface ChunkFieldProps {
  index: number;
  chunk: string;
  chunks: string[];
  onChange: (value: string[]) => void;
  onBlur: () => void;
  disabled?: boolean;
}

export function ChunkField({
  index,
  chunk,
  chunks,
  onChange,
  onBlur,
  disabled,
}: ChunkFieldProps) {
  return (
    <Field key={index} className="border border-gray-200 rounded-lg p-4">
      <Textarea
        className="resize-none"
        placeholder={`Descreva seu chunk (máx. ${CHUNK_LIMIT} caracteres)`}
        value={chunk}
        maxLength={CHUNK_LIMIT}
        onBlur={() => onBlur()}
        onChange={(v) => {
          const newChunks = [...chunks];
          newChunks[index] = v.target.value;
          onChange(newChunks);
        }}
        disabled={disabled}
      />
      <div className="flex items-center justify-between px-2">
        <span className="text-xs text-gray-400">
          {chunk.length}/{CHUNK_LIMIT} caracteres
        </span>
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          onClick={() => {
            const newChunks = [...chunks];
            newChunks.splice(index, 1);
            onChange(newChunks);
          }}
          disabled={disabled}
        >
          <Trash className="size-4" />
          <span>Remover</span>
        </Button>
      </div>
    </Field>
  );
}