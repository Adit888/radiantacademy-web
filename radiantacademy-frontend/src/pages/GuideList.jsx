import { useEffect, useState } from 'react';
import { getAllGuides, toggleLike, deleteGuide } from '../api/guide';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../utils/getUserIdFromToken';
import { HeartOutlined, HeartFilled, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const VALID_AGENTS = [
  'Astra', 'Breach', 'Brimstone', 'Chamber', 'Clove', 'Cypher', 'Deadlock', 'Fade',
  'Gekko', 'Harbor', 'Iso', 'Jett', 'KAYO', 'Killjoy', 'Neon', 'Omen', 'Phoenix',
  'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper'
];

const VALID_MAPS = [
  'Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Split', 'Sunset'
];

function GuideList() {
  const [guides, setGuides] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('All');
  const [selectedMap, setSelectedMap] = useState('All');
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const navigate = useNavigate();
  const currentUserId = getUserIdFromToken();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    const data = await getAllGuides();
    setGuides(data);
  };

  const handleToggleLike = async (guideId) => {
    try {
      await toggleLike(guideId);
      fetchGuides(); // refresh data
    } catch (err) {
      console.error('Gagal like:', err);
      alert('Gagal like/unlike');
    }
  };

  const extractYoutubeId = (url) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  };

  const filteredGuides = guides.filter(
    (g) =>
      (selectedAgent === 'All' || g.agent === selectedAgent) &&
      (selectedMap === 'All' || g.map_name === selectedMap) &&
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (guideId) => {
    if (!window.confirm('Are you sure you want to delete this guide?')) return;

    try {
      await deleteGuide(guideId);
      fetchGuides(); // Refresh setelah delete
    } catch (err) {
      console.error('Failed to delete guide:', err);
      alert('Gagal menghapus guide!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1e2328] to-[#0f1419]">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ff4654] to-[#bd3944] shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-6 gap-4">

          {/* KIRI - Judul */}
          <div className="flex-1 min-w-[200px]">
            <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase">
              Valorant Guides
            </h1>
            <p className="text-sm text-red-100 tracking-tight">
              Master the Art of Tactical Shooting
            </p>
          </div>

<div className="flex-1 flex justify-end items-center space-x-3">
  <button
    onClick={() => setShowFilter(!showFilter)}
    className="bg-black bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 px-4 py-2 rounded-md text-white hover:bg-opacity-40 transition-all duration-300 font-medium"
  >
    Filter
  </button>
  <button
    onClick={() => navigate('/guides/create')}
    className="bg-gradient-to-r from-[#ff4654] to-[#bd3944] px-6 py-2 rounded-md text-white font-semibold hover:from-[#bd3944] hover:to-[#ff4654] transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
  >
    + Contribute Guide
  </button>
</div>

          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search guides by title..."
              className="w-full max-w-md px-4 py-2 rounded-md bg-[#0f1419] border border-[#2c2f33] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff4654]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>


        </div>
      </div>

      {/* Filter Popup dengan tema Valorant */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-[#0f1419] to-[#1e2328] p-8 rounded-2xl w-4/5 max-w-4xl shadow-2xl text-white relative border border-[#ff4654] border-opacity-30">
            <button
              className="absolute top-4 right-4 text-[#ff4654] text-xl hover:text-red-400 transition-colors duration-200"
              onClick={() => setShowFilter(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#ff4654] to-[#bd3944] bg-clip-text text-transparent">
              TACTICAL FILTERS
            </h2>

            {/* Agent Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#ff4654]">Select Agent</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedAgent('All')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedAgent === 'All'
                    ? 'bg-gradient-to-r from-[#ff4654] to-[#bd3944] text-white shadow-lg'
                    : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70'
                    }`}
                >
                  All Agents
                </button>
                {VALID_AGENTS.map((agent) => (
                  <button
                    key={agent}
                    onClick={() => setSelectedAgent(agent)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedAgent === agent
                      ? 'bg-gradient-to-r from-[#ff4654] to-[#bd3944] text-white shadow-lg transform scale-105'
                      : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 hover:scale-105'
                      }`}
                  >
                    <img src={`/images/${agent}_icon.webp`} alt={agent} className="w-6 h-6 rounded-full" />
                    {agent}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#ff4654]">Select Map</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedMap('All')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedMap === 'All'
                    ? 'bg-gradient-to-r from-[#fd7e14] to-[#ff8c00] text-black shadow-lg'
                    : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70'
                    }`}
                >
                  All Maps
                </button>
                {VALID_MAPS.map((map) => (
                  <button
                    key={map}
                    onClick={() => setSelectedMap(map)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedMap === map
                      ? 'bg-gradient-to-r from-[#ff4654] to-[#bd3944] text-white shadow-lg transform scale-105'
                      : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-opacity-70 hover:scale-105'
                      }`}
                  >
                    {map}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guide Cards dengan desain yang diperbaiki */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => navigate(`/guides/${guide.id}`)}
              className="cursor-pointer bg-[#0f1419] border border-[#1e1e1e] rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-44">
                <img
                  src={
                    guide.video_url
                      ? `https://img.youtube.com/vi/${extractYoutubeId(guide.video_url)}/hqdefault.jpg`
                      : guide.image_url || '/images/default-guide.jpg'
                  }
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Agent Avatar + Badge */}
              <div className="flex items-start gap-3 px-4 pt-4">
                <img
                  src={`/images/${guide.agent}_icon.webp`}
                  alt={guide.agent}
                  className="w-10 h-10 rounded-lg object-cover border border-[#2c2f33]"
                />

                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#ff4654] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {guide.agent}
                  </span>
                  <span className="bg-[#bd3944] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {guide.map_name}
                  </span>
                  {/* Tambah tag jika mau */}
                  {/* <span className="bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full">Retake</span> */}
                </div>
              </div>

              {/* Title & Author */}
              <div className="px-4 py-3">
                <h3 className="text-white font-bold text-base mb-1 leading-snug line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-400">By <span className="text-white">{guide.author_username}</span></p>
              </div>

              {/* Footer Action */}
              <div className="px-4 pb-4 flex justify-between items-center text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleLike(guide.id);
                    }}
                    className="flex items-center gap-1 text-sm hover:text-[#ff4654]"
                  >
                    {guide.liked_by_user ? (
                      <HeartFilled className="text-[#ff4654]" />
                    ) : (
                      <HeartOutlined />
                    )}
                    {guide.likes_count}
                  </button>
                </div>

                {/* Optional Edit/Delete */}
                {guide.author_id === currentUserId && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/guides/edit/${guide.id}`);
                      }}
                      className="text-gray-400 hover:text-white text-xs"
                    >
                      <EditOutlined />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(guide.id);
                      }}
                      className="text-gray-400 hover:text-white text-xs"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* Empty State */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl text-gray-400 mb-2">No guides found</h3>
            <p className="text-gray-500">Try adjusting your filters or contribute a new guide!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GuideList;