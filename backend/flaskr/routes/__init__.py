from flask import Blueprint
from ..models import db

main_bp = Blueprint('main', __name__)

# Import submodules and register blueprints
from .staff import staff_bp
from .customers import customers_bp
from .products import products_bp
from .transactions import transactions_bp

main_bp.route('/')(lambda: "Welcome to the PoS System!")
main_bp.register_blueprint(staff_bp, url_prefix='/staff')
main_bp.register_blueprint(customers_bp, url_prefix='/customers')
main_bp.register_blueprint(products_bp, url_prefix='/products')
main_bp.register_blueprint(transactions_bp, url_prefix='/transactions')
