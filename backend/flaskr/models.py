from . import db
from sqlalchemy.orm import validates
from sqlalchemy.event import listens_for

class BaseModel(db.Model):
    __abstract__ = True

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class InventoryItem(BaseModel):
    __tablename__ = 'inventory_items'
    item_sku = db.Column(db.String, nullable=False, primary_key=True)
    item_name = db.Column(db.String, nullable=False)
    item_description = db.Column(db.String)
    item_price = db.Column(db.Float, nullable=False)
    item_qty = db.Column(db.Integer, nullable=False)
    item_category = db.Column(db.String, nullable=False)
    
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
    
    def get_total_value(self):
        return self.item_price * self.item_qty

class Customer(BaseModel):
    __tablename__ = 'customers'
    c_id = db.Column(db.Integer, primary_key=True)
    c_name = db.Column(db.String, nullable=False)
    c_contact = db.Column(db.String, unique=True)
    c_address = db.Column(db.String)

    @validates('c_contact')
    def validate_c_contact(self, key, value):
        if not value or not value.isdigit():
            raise ValueError("Invalid phone number")
        if len(value) != 10:
            raise ValueError("Phone number must be 10 digits")
        return value

    def get_all_transactions(self):
        return Transaction.query.filter_by(c_id=self.c_id).all()

class Staff(BaseModel):
    __tablename__ = 'staff'
    s_id = db.Column(db.Integer, primary_key=True)
    s_name = db.Column(db.String, nullable=False)
    s_email = db.Column(db.String, nullable=False, unique=True)
    s_passwordHash = db.Column(db.String, nullable=False)
    s_contact = db.Column(db.String)
    s_isAdmin = db.Column(db.Boolean, default=False)
    s_isApproved = db.Column(db.Boolean, default=False)

    @validates('s_email')
    def validate_s_email(self, key, value):
        if not value or '@' not in value:
            raise ValueError("Invalid email format")
        return value

class Transaction(BaseModel):
    __tablename__ = 'transactions'
    t_id = db.Column(db.Integer, primary_key=True)
    c_id = db.Column(db.Integer, db.ForeignKey('customers.c_id'), nullable=False)
    s_id = db.Column(db.Integer, db.ForeignKey('staff.s_id'), nullable=False)
    t_time = db.Column(db.DateTime, nullable=False)
    t_items = db.Column(db.JSON, nullable=False)

    customer = db.relationship('Customer', backref=db.backref('transactions', lazy=True))
    staff = db.relationship('Staff', backref=db.backref('transactions', lazy=True))

    @validates('t_items')
    def validate_t_items(self, key, value):
        # validate syntax of t_items JSON to be a list of dictionaries with keys 'sku' and 'qty'
        if not isinstance(value, list):
            raise ValueError("Items must be a list")
        for item in value:
            if not isinstance(item, dict) or 'sku' not in item or 'qty' not in item:
                raise ValueError("Each item must be a dictionary with keys 'sku' and 'qty'")
        return value
