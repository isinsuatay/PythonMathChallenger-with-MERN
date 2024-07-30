import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Categories from './components/Categories';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import axios from 'axios';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import QuestionAnswerPage from './screens/QuestionAnswerPage';
import CompilerScreen from './screens/CompilerScreen';
import AccountScreen from './screens/AccountScreen';
import CursorSymbol from './components/CursorSymbol';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

interface User {
  id: string;
  username: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Kullanıcı verilerini yükleme durumu

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false); // Kullanıcı verileri yüklendiğinde loading durumunu false yap
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Kullanıcı verileri yüklenirken gösterilecek yükleme ekranı
  }

  return (
    <Router>
      <ScrollToTop />
      <CursorSymbol />
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/games" element={<GameScreen />} />
        <Route path="/calculator" element={<CalculatorScreen />} />
        <Route path="/compiler" element={<CompilerScreen />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<QuestionAnswerPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/account"
          element={user ? <AccountScreen /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
