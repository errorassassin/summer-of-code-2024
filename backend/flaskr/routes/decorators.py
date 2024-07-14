from functools import wraps
from flask import jsonify, request, current_app
import jwt
from ..models import db, Staff
import datetime

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers.get('Authorization')[7:]
        if not token:
            return jsonify({"error": "Access denied"}), 403
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            staff_id = data.get('staff_id')
            current_user = Staff.query.get(staff_id)
            is_admin = current_user.s_isAdmin
            if not current_user or not is_admin or not current_user.s_isApproved:
                return jsonify({"error": "Access denied"}), 403
        except Exception as e:
            return jsonify({"error": "Access denied"}), 403
    return decorated_function

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers.get('Authorization')[7:]
        print(token)
        if not token:
            return jsonify({"error": "Access denied"}), 403
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            staff_id = data.get('staff_id')
            current_user = Staff.query.get(staff_id)
            if not current_user or not current_user.s_isApproved:
                return jsonify({"error": "Access denied"}), 403
        except Exception as e:
            return jsonify({"error": "Access denied"}), 403
        return f(*args, **kwargs)
    return decorated_function