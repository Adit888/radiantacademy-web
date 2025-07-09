// src/utils/getUserIdFromToken.js
import { jwtDecode } from 'jwt-decode';

export function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("🧾 Token decoded:", decoded); // DEBUG
    return parseInt(decoded.sub); // 🔥 ubah string '1' jadi number 1

  } catch (error) {
    console.error('❌ Error decoding token:', error);
    return null;
  }
}