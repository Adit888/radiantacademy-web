import Navbar from '../components/Navbar';

function Home() {
  return (
    <div>
      <Navbar />

      <div className="p-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Welcome to RadiantAcademy!</h2>
        <p className="text-gray-600">
          Explore Valorant guides, tips, and agent strategies from the community.
        </p>
      </div>
    </div>
  );
}

export default Home;
