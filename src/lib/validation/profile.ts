import type { FieldName } from "@/types/user";
import { CHUNK_LIMIT } from "@/constants/env";

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export { CHUNK_LIMIT };

export const REQUIRED_FIELDS: FieldName[] = [
  "name",
  "title",
  "email",
  "city",
  "state",
];

export function validateField(field: FieldName, value: string): string | null {
  const cleanValue = value ? value.trim() : "";

  switch (field) {
    case "name":
      if (!cleanValue) return "Informe seu nome completo";
      if (cleanValue.length < 3) return "Nome muito curto";
      if (cleanValue.split(/\s+/).filter((s) => s.length > 0).length < 2) return "Informe nome e sobrenome";
      if (/\d/.test(cleanValue)) return "Nome não pode conter números";
      if (/[!@#$%^&*(),.?":{}|<>_]/.test(cleanValue)) return "Nome não pode conter caracteres especiais";
      return null;
    case "title":
      if (!cleanValue) return "Informe seu cargo/título";
      if (cleanValue.length < 2) return "Cargo muito curto";
      if (/^[^a-zA-Z0-9]+$/.test(cleanValue)) return "Informe um cargo válido";
      return null;
    case "email":
      if (!cleanValue) return "Email é obrigatório";
      if (!emailRegex.test(cleanValue)) return "Email inválido";
      return null;
    case "phone": {
      if (!value) return null;
      const digits = value.replace(/\D/g, "");
      if (digits.length !== 10 && digits.length !== 11)
        return "Telefone incompleto";
      if (/^(\d)\1+$/.test(digits)) return "Telefone inválido";
      return null;
    }
    case "city":
      return value ? null : "Selecione uma cidade";
    case "state":
      return value ? null : "Selecione um estado";
    case "linkedin":
      if (!value) return null;
      if (!urlRegex.test(value)) return "Link inválido";
      if (!/linkedin\.com\/in\/[a-zA-Z0-9-]+/.test(value))
        return "Deve ser um link do LinkedIn";
      return null;
    case "portfolio":
      if (!value) return null;
      if (!urlRegex.test(value)) return "Link inválido";
      return null;
    default:
      return null;
  }
}

export function validateChunks(chunks: string[]): string | null {
  if (!chunks || chunks.length === 0) {
    return "Adicione pelo menos um chunk";
  }

  const trimmedChunks = chunks.map(c => c.trim());

  if (trimmedChunks.some((c) => !c)) {
    return "Remova ou preencha os chunks vazios";
  }

  if (trimmedChunks.some((c) => c.length > CHUNK_LIMIT)) {
    return `Cada chunk deve ter no máximo ${CHUNK_LIMIT} caracteres`;
  }

  if (trimmedChunks.some((c) => c.split(/\s+/).length < 3)) {
    return "Escreva forma mais detalhada (mínimo de 3 palavras)";
  }

  const uniqueChunks = new Set(trimmedChunks.map(c => c.toLowerCase()));
  if (uniqueChunks.size !== trimmedChunks.length) {
    return "Remova as linhas duplicadas";
  }

  const hasLowEffort = trimmedChunks.some(c => /(.)\1{4,}/.test(c));
  if (hasLowEffort) {
    return "Por favor, evite repetições excessivas de caracteres";
  }

  return null;
}