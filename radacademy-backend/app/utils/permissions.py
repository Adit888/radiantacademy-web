from flask_jwt_extended import get_jwt_identity
from functools import wraps
from flask import jsonify
from app.models import User

def admin_or_owner_required(model):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            current_user_id = int(get_jwt_identity())
            user = User.query.get(current_user_id)
            if user is None:
                return jsonify({"msg": "User not found"}), 404

            # Cari ID dari URL
            resource_id = kwargs.get('comment_id') or kwargs.get('guide_id')
            if not resource_id:
                return jsonify({"msg": "Resource ID missing"}), 400

            # Ambil resource (comment atau guide)
            resource = model.query.get_or_404(resource_id)

            # Izinkan jika admin atau pemilik resource
            if user.role != 'admin' and resource.user_id != current_user_id:
                return jsonify({"msg": "Unauthorized"}), 403

            return fn(*args, **kwargs)
        return decorator
    return wrapper
