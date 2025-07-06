from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models import Guide, User, Like
from app.utils.permissions import admin_or_owner_required

guide_bp = Blueprint('guide_bp', __name__)

VALID_CATEGORIES = ["AIM", "Mechanics", "Lineup", "General"]
VALID_AGENTS = ["Jett", "Sova", "Reyna", "Omen", "Viper", "Killjoy", "Sage", "Phoenix"]  # tambahkan sesuai kebutuhan
VALID_MAPS = ["Ascent", "Bind", "Haven", "Icebox", "Split", "Fracture", "Lotus"]

# ✅ Create Guide
@guide_bp.route('/guides', methods=['POST'])
@jwt_required()
def create_guide():
    data = request.get_json()
    user_id = get_jwt_identity()

    title = data.get('title')
    description = data.get('description')
    image_url = data.get('image_url')
    video_url = data.get('video_url')
    category = data.get('category')
    agent = data.get('agent')
    map_name = data.get('map_name')

    # Validasi input
    if not all([title, description, category, agent, map_name]):
        return jsonify({"error": "Missing required fields"}), 400
    if category not in VALID_CATEGORIES:
        return jsonify({"error": "Invalid category"}), 400
    if agent not in VALID_AGENTS:
        return jsonify({"error": "Invalid agent"}), 400
    if map_name not in VALID_MAPS:
        return jsonify({"error": "Invalid map"}), 400

    guide = Guide(
        title=title,
        description=description,
        image_url=image_url,
        video_url=video_url,
        category=category,
        agent=agent,
        map_name=map_name,
        user_id=user_id
    )
    db.session.add(guide)
    db.session.commit()

    return jsonify({"message": "Guide created", "guide_id": guide.id}), 201

# ✅ Get All Guides
@guide_bp.route('/guides', methods=['GET'])
@jwt_required()
def get_all_guides():
    current_user_id = get_jwt_identity()
    guides = Guide.query.all()
    result = [guide.to_dict(current_user_id=current_user_id) for guide in guides]
    return jsonify(result), 200

# ✅ Get Guide by ID
@guide_bp.route('/guides/<int:guide_id>', methods=['GET'])
@jwt_required()
def get_guide(guide_id):
    current_user_id = get_jwt_identity()
    guide = Guide.query.get_or_404(guide_id)
    return jsonify(guide.to_dict(current_user_id=current_user_id)), 200

# ✅ Update Guide
@guide_bp.route('/guides/<int:guide_id>', methods=['PUT'])
@jwt_required()
@admin_or_owner_required(Guide)
def update_guide(guide_id):
    guide = Guide.query.get_or_404(guide_id)
    data = request.get_json()

    guide.title = data.get('title', guide.title)
    guide.description = data.get('description', guide.description)
    guide.image_url = data.get('image_url', guide.image_url)
    guide.video_url = data.get('video_url', guide.video_url)

    new_category = data.get('category')
    new_agent = data.get('agent')
    new_map = data.get('map_name')

    if new_category and new_category in VALID_CATEGORIES:
        guide.category = new_category
    if new_agent and new_agent in VALID_AGENTS:
        guide.agent = new_agent
    if new_map and new_map in VALID_MAPS:
        guide.map_name = new_map

    db.session.commit()
    return jsonify({"message": "Guide updated successfully"})

# ✅ Delete Guide
@guide_bp.route('/guides/<int:guide_id>', methods=['DELETE'])
@jwt_required()
@admin_or_owner_required(Guide)
def delete_guide(guide_id):
    guide = Guide.query.get_or_404(guide_id)
    db.session.delete(guide)
    db.session.commit()
    return jsonify({"message": "Guide deleted"})

# Like guide nya
@guide_bp.route('/guides/<int:guide_id>/like', methods=['POST'])
@jwt_required()
def toggle_like(guide_id):
    user_id = get_jwt_identity()
    guide = Guide.query.get_or_404(guide_id)

    # Cek apakah user sudah like
    existing_like = Like.query.filter_by(user_id=user_id, guide_id=guide_id).first()

    if existing_like:
        db.session.delete(existing_like)
        db.session.commit()
        return jsonify({"message": "Guide unliked"}), 200
    else:
        like = Like(user_id=user_id, guide_id=guide_id)
        db.session.add(like)
        db.session.commit()
        return jsonify({"message": "Guide liked"}), 201

# ✅ Lihat semua guide yang di-like oleh user saat ini
@guide_bp.route('/guides/liked', methods=['GET'])
@jwt_required()
def get_liked_guides():
    current_user_id = get_jwt_identity()

    liked_guides = (
        Guide.query
        .join(Like)
        .filter(Like.user_id == current_user_id)
        .all()
    )

    result = [guide.to_dict(current_user_id=current_user_id) for guide in liked_guides]

    return jsonify(result), 200