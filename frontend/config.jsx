export const config = {
    backendUrl: import.meta.env.REACT_APP_BACKEND_URL,
    routes: {
      contato: `${import.meta.env.REACT_APP_BACKEND_URL}/contato`,
      login: `${import.meta.env.REACT_APP_BACKEND_URL}/login`,
      diario: `${import.meta.env.REACT_APP_BACKEND_URL}/diario`,
      forgot_pass: `${import.meta.env.REACT_APP_BACKEND_URL}/forgot/password`,
      forgot_user: `${import.meta.env.REACT_APP_BACKEND_URL}/forgot/username`,
      reset_pass: `${import.meta.env.REACT_APP_BACKEND_URL}/reset_password`,
      relatorios: `${import.meta.env.REACT_APP_BACKEND_URL}/relatorios`,
      signup: `${import.meta.env.REACT_APP_BACKEND_URL}/signup`,
      vacas: `${import.meta.env.REACT_APP_BACKEND_URL}/vacas`,
      cadastro: `${import.meta.env.REACT_APP_BACKEND_URL}/cadastro`,
      registro: `${import.meta.env.REACT_APP_BACKEND_URL}/registro`,
      // Adicione outras rotas aqui
    },
  };

