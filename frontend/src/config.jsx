const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5000';

const routes = {
    contato: `${backendUrl}/contato`,
    login: `${backendUrl}/login`,
    diario: `${backendUrl}/diario`,
    forgot_pass: `${backendUrl}/forgot/password`,
    forgot_user: `${backendUrl}/forgot/username`,
    relatorios: `${backendUrl}/relatorios`,
    signup: `${backendUrl}/signup`,
    vacas: `${backendUrl}/vacas`,
    cadastro: `${backendUrl}/cadastro`,
    registro: `${backendUrl}/registro`,
};

export const config = {
    backendUrl,
    routes
};

