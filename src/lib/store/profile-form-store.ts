import { create } from "zustand";

interface ProfileFormState {
  submit: (() => void) | null;
  canSubmit: boolean;
  submitting: boolean;
  registerForm: (handlers: {
    submit: () => void;
    canSubmit: boolean;
    submitting: boolean;
  }) => void;
  unregisterForm: () => void;
}

/**
 * Permite que o Header (fora da página de perfil) dispare o submit
 * do formulário e reflita seu estado (habilitado/carregando).
 */
export const useProfileFormStore = create<ProfileFormState>((set) => ({
  submit: null,
  canSubmit: false,
  submitting: false,
  registerForm: ({ submit, canSubmit, submitting }) =>
    set({ submit, canSubmit, submitting }),
  unregisterForm: () => set({ submit: null, canSubmit: false, submitting: false }),
}));