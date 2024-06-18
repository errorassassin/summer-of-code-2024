from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    item_sku = db.Column(db.String, nullable=False, primary_key=True)
    item_name = db.Column(db.String, nullable=False)
    item_description = db.Column(db.String)
    item_price = db.Column(db.Float, nullable=False)
    item_qty = db.Column(db.Integer, nullable=False)
    parent_category_id = db.Column(db.String, db.ForeignKey('inventory_items.item_sku'))

    parent_category = db.relationship('InventoryItem', remote_side=[item_sku], backref=db.backref('child_items', lazy='dynamic'))

    @validates('item_price')
    def validate_item_price(self, key, value):
        if value < 0:
            raise ValueError("Price must be non-negative")
        return value

    @validates('item_qty')
    def validate_item_qty(self, key, value):
        if value < 0:
            raise ValueError("Quantity must be non-negative")
        return value

class Customer(db.Model):
    __tablename__ = 'customers'
    c_id = db.Column(db.Integer, primary_key=True)
    c_name = db.Column(db.String, nullable=False)
    c_email = db.Column(db.String, nullable=False, unique=True)
    c_contact = db.Column(db.String)

    @validates('c_email')
    def validate_c_email(self, key, value):
        if not value or '@' not in value:
            raise ValueError("Invalid email format")
        return value

class Staff(db.Model):
    __tablename__ = 'staff'
    s_id = db.Column(db.Integer, primary_key=True)
    s_name = db.Column(db.String, nullable=False)
    s_email = db.Column(db.String, nullable=False, unique=True)
    s_isAdmin = db.Column(db.Boolean, default=False)
    s_contact = db.Column(db.String)

    @validates('s_email')
    def validate_s_email(self, key, value):
        if not value or '@' not in value:
            raise ValueError("Invalid email format")
        return value

class Transaction(db.Model):
    __tablename__ = 'transactions'
    t_id = db.Column(db.Integer, primary_key=True)
    c_id = db.Column(db.Integer, db.ForeignKey('customers.c_id'), nullable=False)
    t_date = db.Column(db.DateTime, nullable=False)
    t_amount = db.Column(db.Float, nullable=False)
    t_category = db.Column(db.String)

    customer = db.relationship('Customer', backref=db.backref('transactions', lazy=True))

    @validates('t_amount')
    def validate_t_amount(self, key, value):
        if value < 0:
            raise ValueError("Amount must be non-negative")
        return value
