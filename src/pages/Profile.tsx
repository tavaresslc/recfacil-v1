import { RequireAuth } from "@/components/shared/require-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TextField } from "@/components/profile/fields/text-field";
import { SelectField } from "@/components/profile/fields/select-field";
import { CityComboboxField } from "@/components/profile/fields/city-combobox-field";
import { UFS } from "@/constants/ufs";
import { useAuthStore } from "@/lib/store/auth-store";
import { useProfileFormStore } from "@/lib/store/profile-form-store";
import {
  AlertCircle,
  AlertTriangle,
  Briefcase,
  Check,
  IdCard,
  Link,
  Mail,
  Map,
  Plus,
  Smartphone,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCitiesByUf } from "@/hooks/use-cities-by-uf";
import { maskPhone, getInitialsOrFallback } from "@/lib/utils";
import {
  REQUIRED_FIELDS,
  validateChunks,
  validateField,
} from "@/lib/validation/profile";
import type { FieldName, User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { ChunkField } from "@/components/profile/fields/chunk-field";
import { AlertModal } from "@/components/shared/alert-modal";
import { useBlocker } from "react-router-dom";
import linkedinIcon from "@/assets/linkedin.svg";

export default function Profile() {
  const { user: authUser } = useAuthStore();
  const state = useAuthStore((state) => state.login);
  const { registerForm, unregisterForm } = useProfileFormStore();

  const createUserFromAuth = (authUser: User | null): User => ({
    name: authUser?.name || "",
    picture: authUser?.picture || "",
    email: authUser?.email || "",
    title: authUser?.title || "",
    phone: authUser?.phone || "",
    city: authUser?.city || "",
    state: authUser?.state || "",
    linkedin: authUser?.linkedin || "",
    portfolio: authUser?.portfolio || "",
    chunks: authUser?.chunks || [],
  });

  const [user, setUser] = useState<User>(() => createUserFromAuth(authUser));

  const {
    cities,
    loading: loadingCities,
    error: citiesError,
  } = useCitiesByUf(user.state);

  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const [initialUser, setInitialUser] = useState<User>(() =>
    createUserFromAuth(authUser),
  );

  const hasChanges = useMemo(() => {
    if (!initialUser) return false;

    return (
      JSON.stringify(user) !== JSON.stringify(initialUser) ||
      user.chunks.length !== initialUser.chunks.length
    );
  }, [user, initialUser]);

  const blocker = useBlocker(
    ({ nextLocation }) =>
      hasChanges &&
      !submitting &&
      nextLocation.pathname !== window.location.pathname,
  );

  useEffect(() => {
    if (!hasChanges || submitting) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges, submitting]);

  const errors = useMemo(() => {
    const result: Partial<Record<FieldName, string | null>> = {};
    (Object.keys(user) as (keyof typeof user)[])
      .filter((k) => k !== "picture" && k !== "chunks")
      .forEach((field) => {
        result[field] = validateField(field, user[field] as string);
      });
    result.chunks = validateChunks(user.chunks);
    return result;
  }, [user]);

  const isValid =
    REQUIRED_FIELDS.every((f) => !errors[f as FieldName]) &&
    !errors.phone &&
    !errors.linkedin &&
    !errors.portfolio &&
    !errors.chunks;

  const handleChange = (field: FieldName, value: string | string[]) => {
    if (field === "phone") value = maskPhone(value as string);

    if (field === "state") {
      setUser((prev) => ({
        ...prev,
        state: value ? (value as string) : authUser?.state || "",
        city: value ? "" : authUser?.city || "",
      }));
      return;
    }

    if (field === "chunks") {
      setUser((prev) => ({ ...prev, chunks: value as string[] }));
      return;
    }

    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isTouched = (field: FieldName) => !!touched[field] || submitAttempted;

  const handleConfirmLeave = () => {
    blocker.proceed?.();
  };

  const handleCancelLeave = () => {
    blocker.reset?.();
  };

  const handleConfirmSave = async () => {
    setShowSaveDialog(false);
    await runSubmit();
  };

  const handleCancelSave = () => {
    setShowSaveDialog(false);
  };

  const handleSaveClick = useCallback(() => {
    setShowSaveDialog(true);
  }, []);

  const runSubmit = async () => {
    setSubmitAttempted(true);
    setTouched(REQUIRED_FIELDS.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    if (!isValid) return;

    setSubmitting(true);

    try {
      if (!hasChanges) {
        await new Promise((resolve) => setTimeout(resolve, 900));

        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 2500);

        return;
      }

      await new Promise((res) => setTimeout(res, 900));
      // Aqui futuramente entra requisição real
      // await updateProfile(user);

      state(user);
      setInitialUser(user);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    registerForm({
      submit: handleSaveClick,
      canSubmit: isValid,
      submitting,
    });
    return () => unregisterForm();
  }, [isValid, submitting, registerForm, unregisterForm, handleSaveClick]);

  return (
    <RequireAuth>
      <form
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        noValidate
        className="flex flex-col items-center flex-1 overflow-y-auto bg-gray-50 p-2 md:p-6 space-y-6"
      >
        <div className="md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 select-none">
          <div className="flex md:flex-row flex-col items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Informações pessoais
            </h2>
            {Object.values(errors).find((error) => error !== null) && (
              <span className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="size-4" /> Existem erros no formulário
              </span>
            )}
            {hasChanges &&
              !Object.values(errors).find((error) => error !== null) && (
                <span className="text-sm text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="size-4" /> Alterações não salvas
                </span>
              )}
            {submitted && (
              <span className="text-sm text-emerald-600 flex items-center gap-1">
                <Check className="size-4" /> Salvo com sucesso
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="size-32 shrink-0 mb-3 shadow-sm border-4 border-white">
                <AvatarImage src={user.picture} />
                <AvatarFallback className="bg-gray-200 text-gray-500 text-5xl font-semibold">
                  {getInitialsOrFallback(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Nome Completo"
                icon={<IdCard className="size-4" />}
                placeholder="Digite seu nome completo"
                value={user.name}
                required
                maxLength={80}
                error={errors.name}
                touched={isTouched("name")}
                onChange={(v) => handleChange("name", v)}
                onBlur={() => handleBlur("name")}
                disabled={submitting}
              />

              <TextField
                label="Cargo/Título"
                icon={<Briefcase className="size-4" />}
                placeholder="Digite seu cargo/título"
                value={user.title}
                required
                maxLength={60}
                error={errors.title}
                touched={isTouched("title")}
                onChange={(v) => handleChange("title", v)}
                onBlur={() => handleBlur("title")}
                disabled={submitting}
              />

              <TextField
                label="Email"
                icon={<Mail className="size-4" />}
                placeholder="Digite seu email"
                value={user.email}
                required
                disabled
                hint="Vinculado à sua conta, não pode ser alterado aqui."
                error={errors.email}
                touched={isTouched("email")}
                onChange={(v) => handleChange("email", v)}
                onBlur={() => handleBlur("email")}
              />

              <TextField
                label="Telefone"
                icon={
                  <>
                    <Smartphone className="size-4" /> +55
                  </>
                }
                placeholder="(00) 00000-0000"
                value={user.phone}
                optional
                inputMode="numeric"
                error={errors.phone}
                touched={isTouched("phone")}
                onChange={(v) => handleChange("phone", v)}
                onBlur={() => handleBlur("phone")}
                disabled={submitting}
              />

              <SelectField
                label="Estado"
                icon={<Map className="size-4" />}
                placeholder="Selecione um estado"
                groupLabel="Estados"
                value={user.state}
                options={UFS?.map((uf) => ({
                  value: uf.value,
                  label: uf.label,
                }))}
                required
                error={errors.state}
                touched={isTouched("state")}
                onChange={(v) => handleChange("state", v)}
                onBlur={() => handleBlur("state")}
                disabled={submitting}
              />

              <CityComboboxField
                value={user.city}
                items={cities}
                disabled={!user.state || submitting}
                loading={loadingCities}
                loadError={citiesError}
                error={errors.city}
                touched={isTouched("city")}
                onChange={(v) => {
                  handleChange("city", v);
                  handleBlur("city");
                }}
                onBlur={() => handleBlur("city")}
              />

              <TextField
                label="LinkedIn"
                icon={
                  <img src={linkedinIcon} alt="LinkedIn" className="w-4 h-4" />
                }
                placeholder="https://linkedin.com/in/seu-perfil"
                value={user.linkedin}
                optional
                error={errors.linkedin}
                touched={isTouched("linkedin")}
                onChange={(v) => handleChange("linkedin", v)}
                onBlur={() => handleBlur("linkedin")}
                disabled={submitting}
              />

              <TextField
                label="Portfólio/Website"
                icon={<Link className="size-4" />}
                placeholder="https://seuportfolio.com"
                value={user.portfolio}
                optional
                error={errors.portfolio}
                touched={isTouched("portfolio")}
                onChange={(v) => handleChange("portfolio", v)}
                onBlur={() => handleBlur("portfolio")}
                disabled={submitting}
              />
            </div>
          </div>
        </div>
        <div className="md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-6 text-center md:text-start select-none">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Chunks de informacão
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Adicione chunks descrevendo sua experiência, habilidades ou
                qualquer informação relevante.
              </p>
              <div className="h-5 mt-1">
                {errors.chunks && (
                  <p className="text-sm text-red-600">{errors.chunks}</p>
                )}
              </div>
            </div>
            <Button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-br from-blue-600 to-purple-600 text-gray-50 rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();

                handleChange("chunks", [...user.chunks, ""]);
              }}
              disabled={submitting}
            >
              <Plus className="size-4" />
              <span>Adicionar Chunk</span>
            </Button>
          </div>
          <div className="space-y-4 select-none">
            {user.chunks.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">
                Nenhum chunk adicionado ainda.
              </p>
            ) : (
              user.chunks.map((chunk, index) => (
                <ChunkField
                  key={index}
                  index={index}
                  chunk={chunk}
                  chunks={user.chunks}
                  onChange={(newChunks) => handleChange("chunks", newChunks)}
                  onBlur={() => handleBlur("chunks")}
                  disabled={submitting}
                />
              ))
            )}
          </div>
        </div>
      </form>
      <AlertModal
        isOpen={blocker.state === "blocked"}
        onClose={handleCancelLeave}
        onConfirm={handleConfirmLeave}
        title="Atenção!"
        description="Você possui alterações não salvas. Deseja realmente sair?"
      />

      <AlertModal
        isOpen={showSaveDialog}
        onClose={handleCancelSave}
        onConfirm={handleConfirmSave}
        title="Atenção!"
        description="Deseja realmente salvar as alterações?"
      />
    </RequireAuth>
  );
}
