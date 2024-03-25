from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# def create_app():
# Initialize Flask app
app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()
uri = os.getenv('MONGODB_URI')
app.config["MONGO_URI"] = uri

# Initialize PyMongo to work with MongoDB
mongo = PyMongo(app)
client = mongo.cx

# Import blueprints for routes
# from .routes import user_routes, branch_routes