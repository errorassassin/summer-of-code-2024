from flask import Blueprint, jsonify, request, current_app
from ..models import db, Transaction
import datetime
from .decorators import admin_required, login_required
import jwt

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/', methods=['GET'])
@login_required
def get_transactions():
    try:
        transactions = Transaction.query.all()
        return jsonify([t.to_dict() for t in transactions])
    except Exception as e:
        return {'error': str(e)}, 500
    
@transactions_bp.route('/<int:transaction_id>', methods=['GET'])
@login_required
def get_transaction(transaction_id):
    try:
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            return {'error': 'Transaction not found'}, 404
        return jsonify(transaction.to_dict())
    except Exception as e:
        return {'error': str(e)}, 500
    
@transactions_bp.route('/', methods=['POST'])
@login_required
def add_transaction():
    try:
        data = request.json
        c_id = data.get('c_id')
        s_id = jwt.decode(request.headers.get('Authorization')[7:], current_app.config['SECRET_KEY'], algorithms=['HS256']).get('staff_id')
        t_time = datetime.datetime.now()
        t_items = data.get('items')
        if not c_id:
            return {'error': 'Customer ID is required'}, 400
        if not t_items:
            return {'error': 'Items are required'}, 400
        new_transaction = Transaction(c_id=c_id, s_id=s_id, t_time=t_time, t_items=t_items)
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify(new_transaction.to_dict()), 201
    except Exception as e:
        return {'error': str(e)}, 500
    
@transactions_bp.route('/<int:transaction_id>', methods=['PUT'])
@login_required
def update_transaction(transaction_id):
    try:
        data = request.json
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            return {'error': 'Transaction not found'}, 404
        if 'items' in data:
            transaction.t_items = data['items']
        if 'c_id' in data:
            transaction.c_id = data['c_id']
        db.session.commit()
        return jsonify(transaction.to_dict())
    except Exception as e:
        return {'error': str(e)}, 500
    
@transactions_bp.route('/<int:transaction_id>', methods=['DELETE'])
@login_required
def delete_transaction(transaction_id):
    try:
        transaction = Transaction.query.get(transaction_id)
        if not transaction:
            return {'error': 'Transaction not found'}, 404
        db.session.delete(transaction)
        db.session.commit()
        return {'message': 'Transaction deleted'}
    except Exception as e:
        return {'error': str(e)}, 500