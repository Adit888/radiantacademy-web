import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      await registerUser({ username, email, password });
      setMessage({ type: 'success', text: 'Register sucesfull, please login now!' });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error('Register failed:', err);
      const msg = err.response?.data?.msg || 'Register error, please enter a valid email';
      setMessage({ type: 'error', text: msg });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-lg shadow-lg border border-[#ff4654]/30">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-600 rounded-lg p-3 text-xl font-bold mb-3">RA</div>
          <h1 className="text-xl font-bold uppercase">RadiantAcademy Register</h1>
          <p className="text-gray-400 text-sm mt-1 text-center">
            Create a new account to join the RadiantAcademy community.
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 px-4 py-3 rounded text-sm font-medium transition-all duration-300 ${
              message.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex gap-4">
            <button
              type="button"
              className="w-1/2 bg-gray-600 hover:bg-gray-700 py-2 rounded font-bold"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

            <button
              type="submit"
              className="w-1/2 bg-red-600 hover:bg-red-700 py-2 rounded font-bold"
            >
              Register
            </button>
          </div>
        </form>

        <p
          className="text-sm text-center mt-4 text-red-500 hover:underline cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login here.
        </p>
      </div>
    </div>
  );
}

export default Register;
