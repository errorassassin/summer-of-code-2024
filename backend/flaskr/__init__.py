from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_session import Session
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for specific origin
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})
    
    app.config.from_object(Config)
    app.config['CORS_HEADERS'] = 'Content-Type'  # Set CORS headers
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    app.config['SESSION_COOKIE_SECURE'] = True
    
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize the session
    Session(app)
    
    from .routes import main_bp
    app.register_blueprint(main_bp)
    
    return app
