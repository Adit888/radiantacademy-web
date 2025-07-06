from datetime import datetime
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    guides = db.relationship('Guide', backref='author', lazy=True)
    comments = db.relationship('Comment', back_populates='user', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)


class Guide(db.Model):
    __tablename__ = 'guides'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(500))
    video_url = db.Column(db.String(500))
    category = db.Column(db.String(50), nullable=False)
    agent = db.Column(db.String(50), nullable=False)
    map_name = db.Column(db.String(50), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # ✅ Tambahkan cascade agar komentar dan like ikut terhapus
    comments = db.relationship(
        'Comment',
        back_populates='guide',
        lazy=True,
        cascade='all, delete-orphan'
    )
    likes = db.relationship(
        'Like',
        backref='guide',
        lazy=True,
        cascade='all, delete-orphan'
    )

    def to_dict(self, current_user_id=None):
        liked_by_user = False
        if current_user_id is not None:
            liked_by_user = any(like.user_id == current_user_id for like in self.likes)

        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "video_url": self.video_url,
            "category": self.category,
            "agent": self.agent,
            "map_name": self.map_name,
            "author_id": self.user_id,
            "likes_count": len(self.likes),
            "liked_by_user": liked_by_user,
            "comments": [
                {
                    "id": comment.id,
                    "username": comment.user.username if comment.user else None,
                    "user_id": comment.user_id,
                    "content": comment.content,
                    "created_at": comment.created_at.isoformat()
                }
                for comment in self.comments
            ]
        }


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    guide_id = db.Column(db.Integer, db.ForeignKey('guides.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint('user_id', 'guide_id', name='unique_user_guide_like'),
    )


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    guide_id = db.Column(db.Integer, db.ForeignKey('guides.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # ✅ back_populates dua arah
    user = db.relationship('User', back_populates='comments', lazy=True)
    guide = db.relationship('Guide', back_populates='comments', lazy=True)
