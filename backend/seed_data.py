import random
import string
from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flaskr import create_app, db
from flaskr.models import InventoryItem, Customer, Transaction

def generate_unique_sku(existing_skus, length=4):
    while True:
        sku = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
        if sku not in existing_skus:
            existing_skus.add(sku)
            return sku

def seed_inventory_items():
    existing_skus = set()
    items = [
        { "item_name": "Turmeric powder", "item_price": 22.44, "item_qty": 52 },
        { "item_name": "Sugar", "item_price": 80.64, "item_qty": 25 },
        { "item_name": "Jaggery", "item_price": 25.95, "item_qty": 35 },
        { "item_name": "Idli rice/Boiled rice/Salem rice", "item_price": 95.5, "item_qty": 48 },
        { "item_name": "Steamed rice or Raw rice/Sona masoori", "item_price": 12.88, "item_qty": 92 },
        { "item_name": "High quality raw rice for Pongal", "item_price": 94.88, "item_qty": 80 },
        { "item_name": "Dosa rice ( optional)", "item_price": 78.13, "item_qty": 70 },
        { "item_name": "Basmati rice", "item_price": 62.65, "item_qty": 91 },
        { "item_name": "Brown rice(optional)", "item_price": 33.06, "item_qty": 62 },
        { "item_name": "Pressed rice / Poha(thick or thin)", "item_price": 75.2, "item_qty": 33 },
        { "item_name": "Wheat flour (North Indians, please increase atta to 5 kgs and reduce rice)", "item_price": 35.16, "item_qty": 36 },
        { "item_name": "Maida (For cakes and snacks)", "item_price": 61.46, "item_qty": 16 },
        { "item_name": "Ragi flour", "item_price": 63.04, "item_qty": 60 },
        { "item_name": "Millets varieties & oats", "item_price": 83.02, "item_qty": 42 },
        { "item_name": "Rice flour", "item_price": 72.93, "item_qty": 77 },
        { "item_name": "Besan", "item_price": 28.34, "item_qty": 49 },
        { "item_name": "Bombay Rava/ Semolina or Chiroti rava", "item_price": 79.68, "item_qty": 70 },
        { "item_name": "Wheat rava / samba rava / bansi rava", "item_price": 50.85, "item_qty": 96 },
        { "item_name": "Idli rava (optional)", "item_price": 72.68, "item_qty": 77 },
        { "item_name": "Rice rava", "item_price": 44.53, "item_qty": 76 },
        { "item_name": "Vermicelli / Semiya", "item_price": 63.18, "item_qty": 23 },
        { "item_name": "Instant rice sevai", "item_price": 36.09, "item_qty": 87 },
        { "item_name": "Sago/Javvarisi", "item_price": 56.49, "item_qty": 96 },
        { "item_name": "Tamarind", "item_price": 66.84, "item_qty": 65 },
        { "item_name": "Red chilli", "item_price": 13.49, "item_qty": 73 },
        { "item_name": "Ready-made rice mix", "item_price": 55.16, "item_qty": 77 },
        { "item_name": "Sambar powder", "item_price": 96.9, "item_qty": 92 },
        { "item_name": "Rasam powder", "item_price": 17.92, "item_qty": 87 },
        { "item_name": "Garlic powder / poondu podi", "item_price": 54.26, "item_qty": 50 },
        { "item_name": "Idli podi / Gun powder", "item_price": 91.39, "item_qty": 57 },
        { "item_name": "Ginger, Garlic paste", "item_price": 15.51, "item_qty": 57 },
        { "item_name": "Tamarind paste", "item_price": 30.51, "item_qty": 74 },
        { "item_name": "Ready to eat products", "item_price": 25.34, "item_qty": 17 },
        { "item_name": "Vathakuzhambu powder", "item_price": 60.12, "item_qty": 58 },
        { "item_name": "Idli, dosa batter", "item_price": 93.51, "item_qty": 44 },
        { "item_name": "Bread packet", "item_price": 63.22, "item_qty": 56 },
        { "item_name": "Cereals", "item_price": 25.94, "item_qty": 41 },
        { "item_name": "Toor dal", "item_price": 69.18, "item_qty": 93 },
        { "item_name": "Round urad dal", "item_price": 14.31, "item_qty": 57 },
        { "item_name": "Yellow moong dal", "item_price": 94.28, "item_qty": 54 },
        { "item_name": "Chana dal", "item_price": 61.17, "item_qty": 60 },
        { "item_name": "Split urad dal", "item_price": 33.46, "item_qty": 100 },
        { "item_name": "Rajma", "item_price": 75.06, "item_qty": 31 },
        { "item_name": "Peas", "item_price": 60.98, "item_qty": 44 },
        { "item_name": "Brown chana", "item_price": 19.33, "item_qty": 60 },
        { "item_name": "Green gram dal", "item_price": 99.05, "item_qty": 57 },
        { "item_name": "Peanuts", "item_price": 71.93, "item_qty": 96 },
        { "item_name": "Fried gram dal / Pottukadalai", "item_price": 25.07, "item_qty": 16 },
        { "item_name": "Horsegram", "item_price": 71.23, "item_qty": 39 },
        { "item_name": "Flax seeds", "item_price": 89.51, "item_qty": 15 },
        { "item_name": "Crystal salt", "item_price": 98.52, "item_qty": 31 },
        { "item_name": "Powder salt", "item_price": 47.03, "item_qty": 30 },
        { "item_name": "Red chili powder", "item_price": 88.05, "item_qty": 87 },
        { "item_name": "Dhania powder", "item_price": 61.62, "item_qty": 25 },
        { "item_name": "Garam masala powder", "item_price": 27.7, "item_qty": 84 },
        { "item_name": "Chat masala powder", "item_price": 55.97, "item_qty": 11 },
        { "item_name": "Aamchoor powder", "item_price": 58.35, "item_qty": 46 },
        { "item_name": "Cumin powder", "item_price": 42.19, "item_qty": 85 },
        { "item_name": "Pepper powder", "item_price": 38.54, "item_qty": 95 },
        { "item_name": "Sambar powder", "item_price": 81.69, "item_qty": 43 },
        { "item_name": "Rasam powder", "item_price": 14.15, "item_qty": 98 },
        { "item_name": "Vatha kuzhambu powder", "item_price": 20.44, "item_qty": 45 },
        { "item_name": "Biryani masala powder or curry masala powder", "item_price": 49.65, "item_qty": 28 },
        { "item_name": "Idli powder / Gun powder", "item_price": 26.22, "item_qty": 74 },
        { "item_name": "Instant coffee powder", "item_price": 13.35, "item_qty": 82 },
        { "item_name": "Tea powder", "item_price": 20.76, "item_qty": 49 },
        { "item_name": "ENO fruit salt", "item_price": 78.85, "item_qty": 69 },
        { "item_name": "Yeast", "item_price": 42.27, "item_qty": 49 },
        { "item_name": "Cooking soda / Baking soda", "item_price": 34.32, "item_qty": 53 },
        { "item_name": "Baking powder", "item_price": 77.89, "item_qty": 55 },
        { "item_name": "Cooking oil", "item_price": 10.25, "item_qty": 14 },
        { "item_name": "Gingelly oil/Sesame oil", "item_price": 73.52, "item_qty": 53 },
        { "item_name": "Coconut oil", "item_price": 30.69, "item_qty": 42 },
        { "item_name": "Ghee or butter", "item_price": 28.25, "item_qty": 80 },
        { "item_name": "Olive oil", "item_price": 85.68, "item_qty": 19 },
        { "item_name": "Deepam oil", "item_price": 97.59, "item_qty": 48 },
        { "item_name": "Mustard seeds", "item_price": 74.4, "item_qty": 25 },
        { "item_name": "Pepper", "item_price": 58.42, "item_qty": 47 },
        { "item_name": "Cumin seeds/jeera", "item_price": 69.84, "item_qty": 37 },
        { "item_name": "Poppy seeds/Khus khus", "item_price": 22.17, "item_qty": 81 },
        { "item_name": "Coriander seeds/Dhania", "item_price": 33.14, "item_qty": 28 },
        { "item_name": "Fennel seeds", "item_price": 74.62, "item_qty": 38 },
        { "item_name": "Fenugreek seeds / Methi seeds", "item_price": 94.58, "item_qty": 65 },
        { "item_name": "Dry ginger piece or powder", "item_price": 55.91, "item_qty": 24 },
        { "item_name": "Black or white sesame seeds", "item_price": 52.33, "item_qty": 64 },
        { "item_name": "Split urad dal", "item_price": 77.64, "item_qty": 31 },
        { "item_name": "Ajwain / omam", "item_price": 92.4, "item_qty": 31 },
        { "item_name": "Hing/Asafetida", "item_price": 10.57, "item_qty": 78 },
        { "item_name": "Cardamom/Elakki", "item_price": 54.26, "item_qty": 29 },
        { "item_name": "Cashew nuts", "item_price": 71.57, "item_qty": 71 },
        { "item_name": "Raisins", "item_price": 55.68, "item_qty": 24 },
        { "item_name": "Badam or other nuts", "item_price": 91.95, "item_qty": 71 },
        { "item_name": "Peanuts", "item_price": 18.59, "item_qty": 90 },
        { "item_name": "Dates", "item_price": 83.47, "item_qty": 15 },
        { "item_name": "Cinnamon", "item_price": 83.88, "item_qty": 88 },
        { "item_name": "Cloves", "item_price": 53.12, "item_qty": 51 },
        { "item_name": "Kalpasi/black stone flower & marati moggu", "item_price": 33.84, "item_qty": 90 },
        { "item_name": "Biryani spices packet", "item_price": 85.83, "item_qty": 83 },
        { "item_name": "Vanilla essence", "item_price": 55.21, "item_qty": 74 }
    ]

    for item_data in items:
        item_data["item_sku"] = generate_unique_sku(existing_skus)
        item = InventoryItem(**item_data)
        db.session.add(item)

    db.session.commit()

if __name__ == '__main__':
    # Initialize Flask app context and database
    app = create_app()
    app.app_context().push()
    db.create_all()

    # Seed data for inventory items, customers, and transactions
    seed_inventory_items()

    print("Database seeded successfully.")