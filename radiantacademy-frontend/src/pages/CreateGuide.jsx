import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGuide } from '../api/guide';
import Navbar from '../components/Navbar';

const CATEGORIES = ['AIM', 'Mechanics', 'Lineup', 'General'];
const AGENTS = ['Jett', 'Sova', 'Reyna', 'Omen', 'Viper', 'Killjoy', 'Sage', 'Phoenix'];
const MAPS = ['Ascent', 'Bind', 'Haven', 'Icebox', 'Split', 'Fracture', 'Lotus'];

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGuide(form);
      alert('Guide berhasil dibuat!');
      navigate('/guides');
    } catch (err) {
      console.error('Gagal membuat guide:', err);
      alert('Terjadi kesalahan saat membuat guide.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-8 p-6 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Guide</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            className="w-full p-2 border rounded"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
          />

          <input
            name="video_url"
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Video URL (YouTube)"
            value={form.video_url}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Submit Guide
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGuide;
