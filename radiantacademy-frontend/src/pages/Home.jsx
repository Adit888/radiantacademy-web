import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Hero Section with background image */}
      <section
        className="relative h-screen flex items-center justify-center text-center px-4 md:px-20"
        style={{
          backgroundImage: "url('/images/radiant_banner.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

        {/* Text Content */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-red-500">Radiant Academy</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Learn from the best Valorant players. Discover, contribute, and master every agent and map with our guide library.
          </p>
          <button
            onClick={() => navigate('/guides')}
            className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded font-semibold text-white transition"
          >
            🚀 Explore Guides
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-12 px-8 md:px-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Radiant Academy?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🎯 Agent-Based Guides</h3>
            <p className="text-gray-300">Find tactics and playstyles tailored to your favorite agent.</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🗺 Map Mastery</h3>
            <p className="text-gray-300">Learn lineups, smokes, and tips specific to each map.</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">🚀 Community Driven</h3>
            <p className="text-gray-300">Share your own guides and support fellow players.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
