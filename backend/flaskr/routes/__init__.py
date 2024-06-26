from flask import Blueprint
from ..models import db

main_bp = Blueprint('main', __name__)

# Import submodules and register blueprints
from .staff import staff_bp
from .customers import customers_bp

main_bp.route('/')(lambda: "Welcome to the PoS System!")
main_bp.register_blueprint(staff_bp, url_prefix='/staff')
main_bp.register_blueprint(customers_bp, url_prefix='/customers')