from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
# from pprint import pprint

# Load environment variables from .env file
load_dotenv()
uri = os.getenv('MONGODB_URI')

# Initialize Flask app
app = Flask(__name__)

# Initialize PyMongo to work with MongoDB
app.config["MONGO_URI"] = uri
mongo = PyMongo(app)
client = mongo.cx
# pprint(client)
# pprint(mongo.cx)

# Manage routes
# @app.route('/login')
# def login():
#     user_db = client.Users
#     collection = user_db.Admin
#     collection.insert_one({"username": "admin1", "password": "password1"})
#     return jsonify({"status": 200, "message": "Login page"})
#
# @app.route('/register', methods=['POST'])
# def register():
#     # Assuming the client sends JSON data in the POST request
#     data = request.get_json()
#
#     # Example of accessing POST data
#     username = data.get('username')
#     password = data.get('password')
#
#     # Perform login logic (replace this with your actual login logic)
#     if username == 'admin' and password == 'password':
#         response_data = {"status": 200, "message": "Login successful"}
#     else:
#         response_data = {"status": 401, "message": "Unauthorized"}
#
#     # Return JSON response
#     return jsonify(response_data)
#
# if __name__ == "__main__":
#     # app.run(debug=True)
#     app.run(debug=True)

from routes import user_routes, branch_routes  # Importing route blueprints
app.register_blueprint(user_routes.bp)
app.register_blueprint(branch_routes.bp)

if __name__ == '__main__':
    app.run(debug=True)
