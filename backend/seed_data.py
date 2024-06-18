from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flaskr import create_app, db
from flaskr.models import InventoryItem, Customer, Transaction

def seed_inventory_items():
    items = [
        {'item_sku': 'SKU001', 'item_name': 'Item 1', 'item_description': 'Description 1', 'item_price': 10.0, 'item_qty': 100},
        {'item_sku': 'SKU002', 'item_name': 'Item 2', 'item_description': 'Description 2', 'item_price': 15.0, 'item_qty': 50},
        {'item_sku': 'SKU003', 'item_name': 'Item 3', 'item_description': 'Description 3', 'item_price': 20.0, 'item_qty': 200}
        # Add more items as needed
    ]

    for item_data in items:
        item = InventoryItem(**item_data)
        db.session.add(item)

    db.session.commit()

def seed_customers():
    customers = [
        {'c_name': 'John Doe', 'c_email': 'john.doe@example.com', 'c_contact': '123-456-7890'},
        {'c_name': 'Jane Smith', 'c_email': 'jane.smith@example.com', 'c_contact': '987-654-3210'}
        # Add more customers as needed
    ]

    for customer_data in customers:
        customer = Customer(**customer_data)
        db.session.add(customer)

    db.session.commit()

def seed_transactions():
    transactions = [
        {'c_id': 1, 't_date': datetime.utcnow(), 't_amount': 100.0, 't_category': 'Purchase'},
        {'c_id': 2, 't_date': datetime.utcnow(), 't_amount': 50.0, 't_category': 'Refund'}
        # Add more transactions as needed
    ]

    for transaction_data in transactions:
        transaction = Transaction(**transaction_data)
        db.session.add(transaction)

    db.session.commit()

if __name__ == '__main__':
    # Initialize Flask app context and database
    app = create_app()
    app.app_context().push()
    db.create_all()

    # Seed data for inventory items, customers, and transactions
    seed_inventory_items()
    seed_customers()
    seed_transactions()

    print("Database seeded successfully.")
