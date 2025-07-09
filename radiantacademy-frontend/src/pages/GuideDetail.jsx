import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getGuideById,
  postComment,
  getComments,
  updateComment,
  deleteComment,
} from '../api/guide';
import { getUserIdFromToken } from '../utils/getUserIdFromToken';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Spin, Modal } from 'antd';

function GuideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userId = getUserIdFromToken();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [customMessage, setCustomMessage] = useState({ visible: false, type: '', text: '' });

  useEffect(() => {
    fetchGuide();
    fetchComments();
  }, []);

  // Custom message function with dark theme
  const showCustomMessage = (type, text) => {
    setCustomMessage({ visible: true, type, text });
    setTimeout(() => {
      setCustomMessage({ visible: false, type: '', text: '' });
    }, 3000);
  };

  const fetchGuide = async () => {
    try {
      setLoading(true);
      const data = await getGuideById(id);
      setGuide(data);
    } catch (err) {
      showCustomMessage('error', 'Gagal memuat guide');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(id);
      setComments(data);
    } catch (err) {
      showCustomMessage('error', 'Gagal memuat komentar');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      setLoading(true);
      await postComment(id, { content: newComment });
      setNewComment('');
      showCustomMessage('success', 'Komentar berhasil dikirim! 🎉');
      fetchComments();
    } catch (err) {
      showCustomMessage('error', 'Gagal mengirim komentar');
    } finally {
      setLoading(false);
    }
  };

  const extractYoutubeId = (url) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : '';
  };

  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  };

  const submitEditComment = async (commentId) => {
    if (!editedContent.trim()) return;
    try {
      setLoading(true);
      await updateComment(commentId, { content: editedContent });
      setEditingCommentId(null);
      setEditedContent('');
      showCustomMessage('success', 'Komentar berhasil diedit! ✏️');
      fetchComments();
    } catch (err) {
      showCustomMessage('error', 'Gagal mengedit komentar');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setDeleteModalVisible(true);
  };

  const confirmDeleteComment = async () => {
    try {
      setLoading(true);
      await deleteComment(commentToDelete);
      showCustomMessage('success', 'Komentar berhasil dihapus! 🗑️');
      fetchComments();
      setDeleteModalVisible(false);
      setCommentToDelete(null);
    } catch (err) {
      showCustomMessage('error', 'Gagal menghapus komentar');
    } finally {
      setLoading(false);
    }
  };

  const cancelDeleteComment = () => {
    setDeleteModalVisible(false);
    setCommentToDelete(null);
  };

  if (!guide) return null;

  return (
  <Spin spinning={loading} size="large">
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1e2328] to-[#0f1419] text-white py-10 px-4">
      
      {/* Custom Message Notification */}
      {customMessage.visible && (
        <div 
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl border-l-4 animate-pulse ${
            customMessage.type === 'success' 
              ? 'bg-[#1e2328] border-[#ff4654] text-white' 
              : 'bg-[#2d1b1b] border-[#ff4654] text-white'
          }`}
        >
          {customMessage.type === 'success' ? (
            <CheckCircleOutlined className="text-[#ff4654] text-xl" />
          ) : (
            <ExclamationCircleOutlined className="text-[#ff4654] text-xl" />
          )}
          <span className="font-medium">{customMessage.text}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-[#1e2328] rounded-2xl p-6 shadow-2xl border border-[#2c2f33]">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-sm text-white hover:text-[#ff4654] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        {/* Title & Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{guide.title}</h1>
          <p className="text-sm text-gray-400 mb-1">By <span className="text-white">{guide.author_username}</span></p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-[#ff4654] bg-opacity-20 text-[#ff4654] text-xs font-semibold px-3 py-1 rounded-full">
              {guide.agent}
            </span>
            <span className="bg-[#ff4654] bg-opacity-20 text-[#ff4654] text-xs font-semibold px-3 py-1 rounded-full">
              {guide.map_name}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-6">{guide.description}</p>

        {/* Video */}
        {guide.video_url && (
          <div className="mb-8">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${extractYoutubeId(guide.video_url)}`}
                className="w-full h-64 md:h-96 rounded-xl"
                allowFullScreen
                title="Guide Video"
              />
            </div>
          </div>
        )}

        {/* Comment Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 border-b border-[#2c2f33] pb-2">Comments</h2>

          {/* New Comment */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="w-full bg-[#0f1419] text-white border border-[#2c2f33] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
              rows="3"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="mt-3 px-6 py-2 bg-[#ff4654] text-white rounded-lg font-semibold hover:bg-[#e83b48] transition-all"
            >
              Post Comment
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((cmt) => (
                <div key={cmt.id} className="bg-[#0f1419] p-4 rounded-xl border border-[#2c2f33]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-[#ff4654] font-semibold mb-1">{cmt.username}</p>
                      {editingCommentId === cmt.id ? (
                        <div className="space-y-2">
                          <textarea
                            className="w-full bg-[#1e2328] text-white border border-[#2c2f33] rounded-lg p-2"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => submitEditComment(cmt.id)}
                              className="px-3 py-1 bg-[#ff4654] text-white rounded hover:bg-red-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditedContent('');
                              }}
                              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-300">{cmt.content}</p>
                      )}
                    </div>
                    {cmt.user_id === userId && (
                      <div className="flex gap-2 text-gray-400 text-lg">
                        <button
                          onClick={() => handleEditComment(cmt.id, cmt.content)}
                          className="hover:text-[#ff4654] transition"
                          title="Edit"
                        >
                          <EditOutlined />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(cmt.id)}
                          className="hover:text-[#ff4654] transition"
                          title="Delete"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-white">
            <ExclamationCircleOutlined className="text-[#ff4654]" />
            <span>Konfirmasi Hapus</span>
          </div>
        }
        open={deleteModalVisible}
        onOk={confirmDeleteComment}
        onCancel={cancelDeleteComment}
        okText={<span className="text-white font-semibold">Hapus</span>}
        cancelText={<span className="text-white font-semibold">Batal</span>}
        okType="danger"
        centered
        maskClosable={false}
        confirmLoading={loading}
        className="custom-modal"
        styles={{
          mask: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
          content: { backgroundColor: '#1e2328' },
          header: { backgroundColor: '#1e2328', borderBottom: '1px solid #2c2f33' },
          body: { backgroundColor: '#1e2328' },
          footer: { backgroundColor: '#1e2328', borderTop: '1px solid #2c2f33' }
        }}
        okButtonProps={{
          style: {
            backgroundColor: '#ff4654',
            borderColor: '#ff4654',
            color: 'white',
            fontWeight: 'bold'
          }
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: '#2c2f33',
            borderColor: '#2c2f33',
            color: 'white',
            fontWeight: 'bold'
          }
        }}
      >
        <div className="text-gray-300 py-4">
          <p>Apakah kamu yakin ingin menghapus komentar ini?</p>
          <p className="text-sm text-gray-500 mt-2">Tindakan ini tidak dapat dibatalkan.</p>
        </div>
      </Modal>
    </div>
  </Spin>
  );
}

export default GuideDetail;