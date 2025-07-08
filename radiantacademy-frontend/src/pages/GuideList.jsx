import { useEffect, useState } from 'react';
import { getAllGuides } from '../api/guide';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGuides();
      setGuides(data);
    };
    fetchData();
  }, []);

  const handleFilterToggle = () => setShowFilter(!showFilter);
  const filteredGuides = guides.filter((g) => {
    return (selectedAgent === 'All' || g.agent === selectedAgent) &&
           (selectedMap === 'All' || g.map_name === selectedMap);
  });

  return (
    <div className="relative">
      <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">Valorant Guides</h1>
        <div className="space-x-2">
          <button
            onClick={handleFilterToggle}
            className="bg-gray-700 px-3 py-1 rounded text-white hover:bg-gray-600"
          >
            Filter
          </button>
          <button
            onClick={() => navigate('/guides/create')}
            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-400"
          >
            Contribute a Guide
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#10141c] p-6 rounded-lg w-4/5 max-w-3xl shadow-lg text-white relative">
            <button
              className="absolute top-3 right-3 text-red-400 text-sm hover:text-red-600"
              onClick={handleFilterToggle}
            >
              ✕ Close
            </button>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Filter by Agent</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAgent('All')}
                  className={`px-3 py-1 rounded ${selectedAgent === 'All' ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-500`}
                >All Agents</button>
                {VALID_AGENTS.map((agent) => (
                  <button
                    key={agent}
                    onClick={() => setSelectedAgent(agent)}
                    className={`flex items-center gap-1 px-3 py-1 rounded ${selectedAgent === agent ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-500`}
                  >
                    <img
                      src={`/images/${agent}_icon.webp`}
                      alt={agent}
                      className="w-5 h-5 rounded-full"
                    />
                    {agent}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Filter by Map</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedMap('All')}
                  className={`px-3 py-1 rounded ${selectedMap === 'All' ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-500`}
                >All Maps</button>
                {VALID_MAPS.map((map) => (
                  <button
                    key={map}
                    onClick={() => setSelectedMap(map)}
                    className={`px-3 py-1 rounded ${selectedMap === map ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-500`}
                  >
                    {map}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuides.map((guide) => (
          <div key={guide.id} className="bg-gray-800 text-white rounded shadow overflow-hidden">
            <img
              src={guide.image_url}
              alt={guide.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{guide.title}</h3>
              <p className="text-sm mb-1 text-gray-300">Agent: {guide.agent} • Map: {guide.map_name}</p>
              <p className="text-sm mb-3 text-gray-400">{guide.description}</p>
              {guide.video_url && (
                <iframe
                  className="w-full aspect-video rounded"
                  src={`https://www.youtube.com/embed/${guide.video_url.split('v=')[1]}`}
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuideList;
