import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createGuide, getGuideById, updateGuide } from '../api/guide';

const CATEGORIES = ['AIM', 'Mechanics', 'Lineup', 'General'];
const AGENTS = ['Jett', 'Sova', 'Reyna', 'Omen', 'Viper', 'Killjoy', 'Sage', 'Phoenix'];
const MAPS = ['Ascent', 'Bind', 'Haven', 'Icebox', 'Split', 'Fracture', 'Lotus'];

// Popup Message Component
const PopupMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? '✓' : '✗';

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px]`}>
        <span className="text-xl font-bold">{icon}</span>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
};

function CreateGuide() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    video_url: '',
    map_name: '',
    agent: '',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchGuideData(id);
    }
  }, [id]);

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
  };

  const hidePopup = () => {
    setPopup({ show: false, message: '', type: '' });
  };

  const fetchGuideData = async (guideId) => {
    try {
      const data = await getGuideById(guideId);
      setForm({
        title: data.title,
        description: data.description,
        category: data.category,
        image_url: data.image_url,
        video_url: data.video_url,
        map_name: data.map_name,
        agent: data.agent,
      });
    } catch (err) {
      showPopup('Gagal memuat data guide', 'error');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateGuide(id, form);
        showPopup('Guide berhasil diperbarui!', 'success');
      } else {
        await createGuide(form);
        showPopup('Guide berhasil dibuat!', 'success');
      }

      // Navigate after showing popup
      setTimeout(() => {
        navigate('/guides');
      }, 2000);
    } catch (err) {
      showPopup('Terjadi kesalahan saat menyimpan guide.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1e2328] to-[#0f1419] py-10 px-4 text-white">
      {/* Popup Message */}
      {popup.show && (
        <PopupMessage
          message={popup.message}
          type={popup.type}
          onClose={hidePopup}
        />
      )}

      {/* Tombol Back */}
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

      <div className="max-w-2xl mx-auto bg-[#1e2328] p-8 rounded-2xl shadow-2xl border border-[#ff4654] border-opacity-30">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          {isEdit ? 'Edit Guide' : 'Create New Guide'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Guide Title"
            className="w-full p-3 rounded-lg bg-[#0f1419] border border-[#2c2f33] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            className="w-full p-3 rounded-lg bg-[#0f1419] border border-[#2c2f33] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="category"
              className="w-full p-3 rounded-lg bg-[#0f1419] border border-[#2c2f33] text-white focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              name="agent"
              className="w-full p-3 rounded-lg bg-[#0f1419] border border-[#2c2f33] text-white focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
              value={form.agent}
              onChange={handleChange}
              required
            >
              <option value="">Select Agent</option>
              {AGENTS.map((agent) => (
                <option key={agent} value={agent}>{agent}</option>
              ))}
            </select>

            <select
              name="map_name"
              className="w-full p-3 rounded-lg bg-[#0f1419] border border-[#2c2f33] text-white focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
              value={form.map_name}
              onChange={handleChange}
              required
            >
              <option value="">Select Map</option>
              {MAPS.map((map) => (
                <option key={map} value={map}>{map}</option>
              ))}
            </select>

            <input
              name="image_url"
              type="text"
              placeholder="Image URL"
              className="w-full p-3 rounded-lg bg-[#0f1419] border border-[#2c2f33] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
              value={form.image_url}
              onChange={handleChange}
            />
          </div>

          <input
            name="video_url"
            type="text"
            placeholder="YouTube Video URL"
            className="w-full p-3 rounded-lg bg-[#0f1419] border border-[#2c2f33] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
            value={form.video_url}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff4654] to-[#bd3944] hover:from-[#bd3944] hover:to-[#ff4654] text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            {isEdit ? 'Update Guide' : 'Submit Guide'}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default CreateGuide;