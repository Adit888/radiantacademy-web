from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from app.extensions import db, jwt  # <-- ambil dari extensions.py

def create_app():
    load_dotenv()
    
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_KEY")

    db.init_app(app)
    jwt.init_app(app)

    # Model harus di-import setelah db di-init
    from app import models

    # route untuk authentication cuy
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # ini guide nya bang
    from app.routes.guide_routes import guide_bp
    app.register_blueprint(guide_bp, url_prefix='/api')

    # ini comment nya bre
    from app.routes.comment_routes import comment_bp
    app.register_blueprint(comment_bp, url_prefix='/api')

    return app
