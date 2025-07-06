import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGuides } from '../api/guide';
import { toggleLike } from '../api/guide';
import Navbar from '../components/Navbar';

function GuideList() {
  const [guides, setGuides] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const data = await getAllGuides();
        setGuides(data);
      } catch (error) {
        console.error('Error fetching guides:', error);
        alert('Gagal mengambil data guides!');
      }
    };

    fetchGuides();
  }, []);

  const handleCreateGuide = () => {
    navigate('/guides/create');
  };

  const extractYoutubeId = (url) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  };

  const convertToEmbedURL = (url) => {
    const videoId = extractYoutubeId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const handleToggleLike = async (guideId) => {
    try {
      await toggleLike(guideId);
      // Refresh data setelah like/unlike
      const updated = await getAllGuides();
      setGuides(updated);
    } catch (err) {
      console.error('Failed to toggle like:', err);
      alert('Gagal melakukan like/unlike');
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Guides</h2>
          <button
            onClick={handleCreateGuide}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Create Guide
          </button>
        </div>

        <ul className="space-y-6">
          {guides.map((guide) => (
            <li key={guide.id} className="border p-4 rounded shadow space-y-2">
              <h3 className="text-xl font-bold">{guide.title}</h3>
              <p className="text-sm text-gray-500">Created by : {guide.author_username}</p>
              <p className="text-sm">{guide.description}</p>

              {/* Display image with optional video play button */}
              {guide.image_url && (
                <div className="relative w-full h-64 mt-2">
                  <img
                    src={guide.image_url}
                    alt={guide.title}
                    className="w-full h-full object-cover rounded"
                  />

                  {guide.video_url && playingVideoId !== guide.id && (
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center cursor-pointer rounded"
                      onClick={() => setPlayingVideoId(guide.id)}
                    >
                      <div className="text-white text-4xl bg-black bg-opacity-60 rounded-full p-4">
                        ▶
                      </div>
                    </div>
                  )}

                  {guide.video_url && playingVideoId === guide.id && (
                    <iframe
                      src={convertToEmbedURL(guide.video_url)}
                      className="absolute top-0 left-0 w-full h-full rounded"
                      title={`video-${guide.id}`}
                      allowFullScreen
                    />
                  )}
                </div>
              )}

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>
                  Category: <span className="font-medium">{guide.category}</span>
                </p>
                <p>
                  Agent: <span className="font-medium">{guide.agent}</span>
                </p>
                <p>
                  Map: <span className="font-medium">{guide.map_name}</span>
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={() => handleToggleLike(guide.id)}
                  className={`flex items-center gap-1 text-sm font-medium ${guide.liked_by_user ? 'text-red-600' : 'text-gray-600'
                    }`}
                >
                  {guide.liked_by_user ? '❤️' : '🤍'} {guide.likes_count}
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GuideList;
