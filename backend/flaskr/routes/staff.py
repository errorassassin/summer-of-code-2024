from flask import Blueprint, jsonify, request, session
from ..models import db, Staff
import bcrypt
from .decorators import admin_required

staff_bp = Blueprint('staff', __name__)

@staff_bp.route('/login', methods=['GET'])
def get_staff():
    try:
        email = request.args.get('email')
        password = request.args.get('password')
        if not email or not password:
            return {'error': 'Missing required fields'}, 400
        staff = Staff.query.filter_by(s_email=email).first()
        if not staff:
            return {'error': 'Email not found'}, 401
        if not bcrypt.checkpw(password.encode('utf-8'), staff.s_passwordHash.encode('utf-8')):
            return {'error': 'Invalid password'}, 401
        if not staff.s_isApproved:
            return {'error': 'Account approval pending'}, 401
        session['staff_id'] = staff.s_id
        session['is_admin'] = staff.s_isAdmin
        return {'message': 'Logged in', 'is_admin': staff.s_isAdmin, 'name': staff.s_name}
    except Exception as e:
        return {'error': str(e)}, 500
    
@staff_bp.route('/logout', methods=['GET'])
def logout():
    try:
        session.pop('staff_id', None)
        session.pop('is_admin', None)
        return {'message': 'Logged out successfully'}
    except Exception as e:
        return {'error': str(e)}, 500

@staff_bp.route('/profile', methods=['GET'])
def get_profile():
    try:
        print(request.cookies)
        print(session)
        staff_id = session.get('staff_id')
        if not staff_id:
            return {'error': 'Not logged in'}, 401
        staff = Staff.query.get(staff_id)
        return {'name': staff.s_name, 'email': staff.s_email}
    except Exception as e:
        return {'error': str(e)}, 500

@staff_bp.route('/', methods=['GET'])
@admin_required
def get_all_staff():
    try:
        staff = Staff.query.all()
        return jsonify([s.to_dict() for s in staff])
    except Exception as e:
        return {'error': str(e)}, 500
    
@staff_bp.route('/approvetoggle/<int:staff_id>', methods=['PUT'])
@admin_required
def approve_staff(staff_id):
    try:
        if staff_id == session.get('staff_id'):
            return {'error': 'Cannot approve yourself'}, 400
        staff = Staff.query.get(staff_id)
        staff.s_isApproved = not staff.s_isApproved
        db.session.commit()
        return {'message': 'Staff approval status toggled', 'is_approved_new': staff.s_isApproved}
    except Exception as e:
        return {'error': str(e)}, 500

@staff_bp.route('/', methods=['POST'])
def add_staff():
    try:
        data = request.get_json()
        name = data.get('name')
        password = data.get('password')
        email = data.get('email')
        contact = data.get('contact')
        isAdmin = data.get('is_admin')
        if not name or not password or not email:
            return {'error': 'Missing required fields'}, 400
        
        print(bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'))
        
        staff = Staff(
            s_name=name, 
            s_email=email, 
            s_passwordHash=bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'), 
            s_contact=contact, 
            s_isAdmin=isAdmin
        )
        db.session.add(staff)
        db.session.commit()
        return {'message': 'Staff added'}
    except Exception as e:
        if 'unique constraint' in str(e):
            return {'error': 'Email already exists'}, 400
        return {'error': str(e)}, 500
