import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@/lib/store/auth-store";
import { IS_PROTOTIPO } from "@/constants/env";

interface GoogleUserInfo {
  name: string;
  email: string;
  picture: string;
}

export function useGoogleAuth() {
  const login = useAuthStore((state) => state.login);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const profile: GoogleUserInfo = await response.json();

        login({
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
          title: "",
          phone: "",
          city: "",
          state: "",
          linkedin: "",
          portfolio: "",
          chunks: [],
        });
      } catch (error) {
        console.error("Erro ao buscar perfil do Google:", error);
      }
    },

    onError: () => {
      console.error("Falha na autenticação com o Google");
    },
  });

  if (IS_PROTOTIPO) {
    return () => {
      login({
        name: "Usuário de Teste",
        email: "teste@example.com",
        picture:
          "https://randomuser.me/api/portraits/men/75.jpg",
        title: "",
        phone: "",
        city: "",
        state: "",
        linkedin: "",
        portfolio: "",
        chunks: [],
      });
    };
  }

  return googleLogin;
}