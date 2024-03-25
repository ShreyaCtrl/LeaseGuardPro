from flask import jsonify, request, Blueprint
from api import app, mongo

bp = Blueprint('branch', __name__, url_prefix='/branch')

@app.route('/branches', methods=['GET'])
def get_branches():
    branches = mongo.db.branches.find()
    return jsonify({'branches': branches})

@app.route('/branches/create', methods=['POST'])
def create_branch():
    # Implementation to create a new branch
    return jsonify({'message': 'Branch created successfully'})
