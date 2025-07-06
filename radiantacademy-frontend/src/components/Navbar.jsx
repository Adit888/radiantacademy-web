import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">RadiantAcademy</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/guides" className="hover:text-yellow-400">Guides</Link>
        <Link to="/agents" className="hover:text-yellow-400">Agents</Link>
        <Link to="/login" className="hover:text-yellow-400">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
