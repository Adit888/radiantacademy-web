import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      const token = response.access_token;

      if (!token) throw new Error('Token tidak ditemukan dalam respons login.');

      localStorage.setItem('token', token);
      console.log('✅ Token berhasil disimpan:', token);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login gagal. Periksa email dan password.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#111] p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-600 rounded-lg p-3 text-xl font-bold mb-3">RA</div>
          <h1 className="text-xl font-bold uppercase">RadiantAcademy Sign In</h1>
          <p className="text-gray-400 text-sm mt-1 text-center">
            Sign in with your RadiantAcademy email or username and associated password.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Email or Username"
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
              Sign In
            </button>
          </div>
        </form>

        <p className="text-sm text-center mt-4 text-red-500 hover:underline cursor-pointer">
          Forgot your username or password?
        </p>
      </div>
    </div>
  );
}

export default Login;
