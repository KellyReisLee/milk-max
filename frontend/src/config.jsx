export const config = {
    backendUrl: import.meta.env.VITE_BACKEND_URL,
    routes: {
      contato: `${import.meta.env.VITE_BACKEND_URL}/contato`,
      login: `${import.meta.env.VITE_BACKEND_URL}/login`,
      diario: `${import.meta.env.VITE_BACKEND_URL}/diario`,
      forgot_pass: `${import.meta.env.VITE_BACKEND_URL}/forgot/password`,
      forgot_user: `${import.meta.env.VITE_BACKEND_URL}/forgot/username`,
      reset_pass: (token) => `${import.meta.env.VITE_BACKEND_URL}/reset_password/${token}`,
      relatorios: `${import.meta.env.VITE_BACKEND_URL}/relatorios`,
      signup: `${import.meta.env.VITE_BACKEND_URL}/signup`,
      vacas: `${import.meta.env.VITE_BACKEND_URL}/vacas`,
      cadastro: `${import.meta.env.VITE_BACKEND_URL}/cadastro`,
      registro: `${import.meta.env.VITE_BACKEND_URL}/registro`,
    },
  };

