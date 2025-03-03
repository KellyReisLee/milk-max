export const config = {
    backendUrl: process.env.REACT_APP_BACKEND_URL,
    routes: {
      contato: `${process.env.REACT_APP_BACKEND_URL}/contato`,
      login: `${process.env.REACT_APP_BACKEND_URL}/login`,
      diario: `${process.env.REACT_APP_BACKEND_URL}/diario`,
      forgot_pass: `${process.env.REACT_APP_BACKEND_URL}/forgot/password`,
      forgot_user: `${process.env.REACT_APP_BACKEND_URL}/forgot/username`,
      reset_pass: `${process.env.REACT_APP_BACKEND_URL}/reset_password`,
      relatorios: `${process.env.REACT_APP_BACKEND_URL}/relatorios`,
      signup: `${process.env.REACT_APP_BACKEND_URL}/signup`,
      vacas: `${process.env.REACT_APP_BACKEND_URL}/vacas`,
      cadastro: `${process.env.REACT_APP_BACKEND_URL}/cadastro`,
      registro: `${process.env.REACT_APP_BACKEND_URL}/registro`,
      // Adicione outras rotas aqui
    },
  };