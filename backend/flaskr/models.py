from . import db

class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    item_sku = db.Column(db.String, primary_key=True)
    item_name = db.Column(db.String, nullable=False)
    item_description = db.Column(db.String)
    item_price = db.Column(db.Float, nullable=False)
    item_qty = db.Column(db.Integer, nullable=False)

class Customer(db.Model):
    __tablename__ = 'customers'
    c_id = db.Column(db.Integer, primary_key=True)
    c_name = db.Column(db.String, nullable=False)
    c_email = db.Column(db.String, nullable=False, unique=True)
    c_contact = db.Column(db.String)

class Staff(db.Model):
    __tablename__ = 'staff'
    s_id = db.Column(db.Integer, primary_key=True)
    s_name = db.Column(db.String, nullable=False)
    s_email = db.Column(db.String, nullable=False, unique=True)
    s_is_admin = db.Column(db.Boolean, default=False)
    s_contact = db.Column(db.String)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    t_id = db.Column(db.Integer, primary_key=True)
    c_id = db.Column(db.Integer, db.ForeignKey('customers.c_id'), nullable=False)
    s_id = db.Column(db.Integer, db.ForeignKey('staff.s_id'), nullable=False)
    t_date = db.Column(db.DateTime, nullable=False)
    t_amount = db.Column(db.Float, nullable=False)
    t_category = db.Column(db.String, nullable=False)

    customer = db.relationship('Customer', backref=db.backref('transactions', lazy=True))
    staff = db.relationship('Staff', backref=db.backref('transactions', lazy=True))
    inventory_item = db.relationship('InventoryItem', backref=db.backref('transactions', lazy=True))
