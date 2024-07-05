from flask import Blueprint, jsonify, request
from ..models import db, Customer
from .decorators import login_required

customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/', methods=['GET'])
@login_required
def get_customers():
    customers = Customer.query.all()
    return jsonify([customer.to_dict() for customer in customers])

@customers_bp.route('/', methods=['POST'])
@login_required
def add_customer():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    if not name:
        return jsonify({"error": "Name is required"}), 400
    if not email:
        return jsonify({"error": "Email is required"}), 400
    if not phone:
        return jsonify({"error": "Phone is required"}), 400
    if Customer.query.filter_by(c_email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    new_customer = Customer(c_name=name, c_email=email, c_contact=phone)
    db.session.add(new_customer)
    db.session.commit()
    return jsonify(new_customer.to_dict()), 201
