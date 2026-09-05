import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";
import { Loader2, MapPin } from "lucide-react";
import { FormField } from "./form-field";

interface CityComboboxFieldProps {
  value: string;
  items: string[];
  disabled: boolean;
  loading?: boolean;
  loadError?: string | null;
  error?: string | null;
  touched: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function CityComboboxField({
  value,
  items,
  disabled,
  loading,
  loadError,
  error,
  onChange,
  onBlur,
}: CityComboboxFieldProps) {
  const showError = !!error;

  const placeholder = disabled
    ? "Selecione um estado primeiro"
    : loading
      ? "Carregando cidades..."
      : loadError
        ? "Erro ao carregar cidades"
        : "Selecione uma cidade";

  return (
    <FormField
      label="Cidade"
      required
      error={error}
      showError={showError}
      hint={!showError && loadError ? loadError : undefined}
    >
      <Combobox
        items={items}
        value={value}
        onValueChange={(v) => onChange(v ?? "")}
      >
        <ComboboxInput
          placeholder={placeholder}
          autoComplete="new-password"
          disabled={disabled || loading}
          onBlur={onBlur}
          className={
            showError ? "border-red-400 focus-visible:ring-red-300" : ""
          }
        >
          <InputGroupAddon>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <MapPin className="size-4" />
            )}
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxContent>
          <ComboboxEmpty>
            {loadError ? loadError : "Nenhuma cidade encontrada."}
          </ComboboxEmpty>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Cidades</ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </FormField>
  );
}