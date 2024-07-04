from flask import Blueprint, jsonify, request, session
from ..models import db, InventoryItem
from .decorators import admin_required, login_required

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
@admin_required
def get_products():
    try:
        products = InventoryItem.query.all()
        return jsonify([product.to_dict() for product in products])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/', methods=['POST'])
@admin_required
def create_product():
    try:
        data = request.json
        sku = data.get('sku')
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        qty = data.get('qty')
        if not sku:
            return jsonify({"error": "SKU is required"}), 400
        if InventoryItem.query.filter_by(item_sku=sku).first():
            return jsonify({"error": "SKU already exists"}), 400
        if not name:
            return jsonify({"error": "Name is required"}), 400
        if not price or type(price) not in [int, float]:
            return jsonify({"error": "Price is required"}), 400
        if not qty or type(qty) != int:
            return jsonify({"error": "Quantity is required"}), 400
        product = InventoryItem(item_sku=sku, item_name=name, item_description=description, item_price=price, item_qty=qty)
        db.session.add(product)
        db.session.commit()
        return jsonify(product.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@products_bp.route('/<sku>', methods=['GET'])
@admin_required
def get_product(sku):
    try:
        product = InventoryItem.query.filter_by(item_sku=sku).first()
        if not product:
            return jsonify({"error": "Product not found"}), 404
        return jsonify(product.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@products_bp.route('/<sku>', methods=['PUT'])
@admin_required
def update_product(sku):
    try:
        product = InventoryItem.query.filter_by(item_sku=sku).first()
        if not product:
            return jsonify({"error": "Product not found"}), 404
        data = request.json
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        qty = data.get('qty')
        if name:
            product.item_name = name
        if description:
            product.item_description = description
        if price:
            product.item_price = price
        if qty:
            product.item_qty = qty
        db.session.commit()
        return jsonify(product.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@products_bp.route('/<sku>', methods=['DELETE'])
@admin_required
def delete_product(sku):
    try:
        product = InventoryItem.query.filter_by(item_sku=sku).first()
        if not product:
            return jsonify({"error": "Product not found"}), 404
        db.session.delete(product)
        db.session.commit()
        return jsonify(product.to_dict())
    except Exception as e:
        return jsonify({"error": str(e)}), 500