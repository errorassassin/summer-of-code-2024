from flask import Blueprint, jsonify, request
from ..models import db, Customer

customers_bp = Blueprint('customers', __name__)

@customers_bp.route('/', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify([customer.to_dict() for customer in customers])

@customers_bp.route('/', methods=['POST'])
def add_customer():
    data = request.json
    new_customer = Customer(
        c_name=data['c_name'],
        c_email=data['c_email'],
        c_contact=data['c_contact']
    )
    db.session.add(new_customer)
    db.session.commit()
    return jsonify(new_customer.to_dict()), 201
