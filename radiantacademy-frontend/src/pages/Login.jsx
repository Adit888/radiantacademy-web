import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import Navbar from '../components/Navbar'; // pastikan Navbar sudah dibuat

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await loginUser(email, password);
    const token = response.access_token;

    if (!token) {
      throw new Error('Token tidak ditemukan dalam respons login.');
    }

    localStorage.setItem('token', token); // ✅ Simpan token dengan key 'token'
    console.log('✅ Token berhasil disimpan:', token);
    navigate('/'); // redirect ke homepage
  } catch (err) {
    console.error('Login failed:', err);
    alert('Login gagal. Periksa email dan password.');
  }
};

  return (
    <div>
      <Navbar />

      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login to RadiantAcademy</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Belum punya akun?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
