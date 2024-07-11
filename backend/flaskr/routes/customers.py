from flask import Blueprint, jsonify, request
from ..models import db, Customer
from .decorators import login_required

customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/', methods=['GET'])
@login_required
def get_customers():
    try:
        customers = Customer.query.all()
        return jsonify([c.to_dict() for c in customers])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customers_bp.route('/', methods=['POST'])
@login_required
def add_customer():
    try:
        data = request.json
        name = data.get('name')
        phone = data.get('phone')
        address = data.get('address')
        if not name:
            return jsonify({"error": "Name is required"}), 400
        if not phone:
            return jsonify({"error": "Phone is required"}), 400
        if Customer.query.filter_by(c_contact=phone).first():
            return jsonify({"error": "Phone already exists"}), 400
        new_customer = Customer(c_name=name, c_contact=phone, c_address=address)
        db.session.add(new_customer)
        db.session.commit()
        return jsonify(new_customer.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customers_bp.route('/mobile/<phone>', methods=['GET'])
@login_required
def get_customer_by_phone(phone):
    try:
        customer = Customer.query.filter_by(c_contact=phone).first()
        if not customer:
            return jsonify({"error": "Customer not found"}), 404
        return jsonify(customer.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500
