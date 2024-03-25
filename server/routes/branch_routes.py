from flask import Blueprint, request, jsonify
from models.branch_models import Branch

bp = Blueprint('branches', __name__, url_prefix='/branches')

@bp.route('/', methods=['GET'])
def get_branches():
    branches = Branch.get_all()
    return jsonify({'branches': branches})

@bp.route('/create', methods=['POST'])
def create_branch():
    data = request.json
    new_branch = Branch(data['name'], data['location'])
    new_branch.save()
    return jsonify({'message': 'Branch created successfully'})
