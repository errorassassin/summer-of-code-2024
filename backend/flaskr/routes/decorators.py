from functools import wraps
from flask import session, jsonify

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'staff_id' not in session or not session.get('is_admin'):
            return jsonify({"error": "Access denied"}), 403
        return f(*args, **kwargs)
    return decorated_function

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'staff_id' not in session:
            return jsonify({"error": "Access denied"}), 403
        return f(*args, **kwargs)
    return decorated_function