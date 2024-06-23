from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config.from_object(Config)
    app.config['CORS_HEADERS'] = 'Content-Type'
    
    db.init_app(app)
    migrate.init_app(app, db)

    from . import models
    from .routes import main_bp

    app.register_blueprint(main_bp)

    return app
