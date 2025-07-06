from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.permissions import admin_or_owner_required
from app.models import Comment, Guide, db

comment_bp = Blueprint('comment', __name__)

# ✅ Create Comment
@comment_bp.route('/guides/<int:guide_id>/comments', methods=['POST'])
@jwt_required()
def create_comment(guide_id):
    data = request.get_json()
    content = data.get('content')
    user_id = get_jwt_identity()

    if not content:
        return jsonify({"msg": "Content is required"}), 400

    guide = Guide.query.get(guide_id)
    if not guide:
        return jsonify({"msg": "Guide not found"}), 404

    comment = Comment(
        user_id=user_id,
        guide_id=guide_id,
        content=content
    )
    db.session.add(comment)
    db.session.commit()

    return jsonify({"msg": "Comment created"}), 201

# ✅ Get Comments by Guide
@comment_bp.route('/guides/<int:guide_id>/comments', methods=['GET'])
def get_comments(guide_id):
    guide = Guide.query.get(guide_id)
    if not guide:
        return jsonify({"msg": "Guide not found"}), 404

    comments = Comment.query.filter_by(guide_id=guide_id).order_by(Comment.created_at.desc()).all()

    result = []
    for c in comments:
        result.append({
            "id": c.id,
            "user_id": c.user_id,
            "username": c.user.username,
            "content": c.content,
            "created_at": c.created_at.isoformat()
        })

    return jsonify(result), 200

# 🟡 Edit Komentar
@comment_bp.route('/comments/<int:comment_id>', methods=['PUT'])
@jwt_required()
@admin_or_owner_required(Comment)
def update_comment(comment_id):
    current_user_id = get_jwt_identity()
    comment = Comment.query.get_or_404(comment_id)

    data = request.get_json()
    comment.content = data.get("content", comment.content)
    db.session.commit()

    return jsonify({"msg": "Comment updated successfully"}), 200

# 🔴 Delete Komentar
@comment_bp.route('/comments/<int:comment_id>', methods=['DELETE'])
@jwt_required()
@admin_or_owner_required(Comment)
def delete_comment(comment_id):
    current_user_id = get_jwt_identity()
    comment = Comment.query.get_or_404(comment_id)

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"msg": "Comment deleted successfully"}), 200