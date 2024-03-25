from flask import Blueprint, request, jsonify
from models.user_models import User

bp = Blueprint('users', __name__, url_prefix='/users')

@bp.route('/', methods=['GET'])
def get_users():
    users = User.get_all()
    return jsonify({'users': users})

@bp.route('/create', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(data['username'], data['email'])
    new_user.save()
    return jsonify({'message': 'User created successfully'})
