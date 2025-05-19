export const config = {
  routes: {
    login: `${import.meta.env.VITE_BACKEND_URL}/login`,
    signup: `${import.meta.env.VITE_BACKEND_URL}/signup`,
    contato: `${import.meta.env.VITE_BACKEND_URL}/contato`,
    diario: `${import.meta.env.VITE_BACKEND_URL}/diario`,
    relatorios: `${import.meta.env.VITE_BACKEND_URL}/relatorios`,
    vacas: `${import.meta.env.VITE_BACKEND_URL}/vacas`,
    forgotPassword: `${import.meta.env.VITE_BACKEND_URL}/forgot/password`,
    forgotUsername: `${import.meta.env.VITE_BACKEND_URL}/forgot/username`,
    resetPassword: `${import.meta.env.VITE_BACKEND_URL}/reset_password`
  }
}; 