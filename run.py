from flask import Flask
from flask_cors import CORS

from app.views import *
from app.database import *

app = Flask(__name__)

# Rutas de API-Rest
# Conexión a BDD
init_app(app)

# Creación de la tabla Productos si no existe
create_table_productos()

# Cors
CORS(app)

# CRUD
app.route('/api/productos/get_all/', methods=['GET'])(get_all_productos)
app.route('/api/productos/fetch/<int:producto_id>', methods=['GET'])(get_producto)
app.route('/api/productos/create/', methods=['POST'])(create_producto)
app.route('/api/productos/update/<int:producto_id>', methods=['PUT'])(update_producto)
app.route('/api/productos/get/<int:producto_id>', methods=['GET'])(get_producto)
app.route('/api/productos/delete/<int:producto_id>', methods=['DELETE'])(delete_producto)  
app.route('/api/productos/activate/<int:producto_id>', methods=['PUT'])(activate_producto)
app.route('/api/productos/deactivate/<int:producto_id>', methods=['PUT'])(deactivate_producto)

if __name__ == '__main__':
    app.run(debug=True)
