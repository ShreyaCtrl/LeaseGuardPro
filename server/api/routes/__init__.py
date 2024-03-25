from api.routes.user_routes import bp as user_bp
from api.routes.branch_routes import bp as branch_bp
from api import app

app.register_blueprint(user_bp)
app.register_blueprint(branch_bp)

