from api import app, mongo
from flask import jsonify
# import api.routes.user_routes, api.routes.branch_routes
# from api.routes import user_routes, branch_routes
# Define routes

import api.routes.user_routes
import api.routes.branch_routes



# @app.route('/branches', methods=['GET'])
# def get_branches():
#     branches = mongo.db.branches.find()
#     return jsonify({'branches': branches})
#
# @app.route('/branches/create', methods=['POST'])
# def create_branch():
#     # Implementation to create a new branch
#     return jsonify({'message': 'Branch created successfully'})


if __name__ == '__main__':
    app.run(debug=True)
