from flask import jsonify, session
from functools import wraps

def login_required(f):
    """
    Decorate routes to require login.
    Retorna um erro JSON se o usuário não estiver autenticado.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("username") is None:
            return jsonify({"success": False, "message": "Usuário não autenticado"}), 401
        return f(*args, **kwargs)
    
    return decorated_function
