from flaskr import create_app, db
from flaskr.models import InventoryItem, Customer, Transaction

def cleanup_data():
    # Delete all transactions
    Transaction.query.delete()

    # Delete all customers
    Customer.query.delete()

    # Delete all inventory items
    InventoryItem.query.delete()

    # Commit changes
    db.session.commit()

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        cleanup_data()
        print("Data cleanup complete.")