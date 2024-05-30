import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import Navbar from './components/Navbar';
import GameScreen from './screens/GameScreen';
import Categories from './components/Categories';
import CalculatorScreen from './screens/CalculatorScreen';
import CompilerScreen from './screens/CompilerScreen';
import QuestionAnswerPage from './screens/QuestionAnswerPage';
import Footer from './components/Footer';
import CursorSymbol from './components/CursorSymbol';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop/>
<CursorSymbol/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/calculator" element={<CalculatorScreen />} />
        <Route path="/compiler" element={<CompilerScreen />} />
        <Route path="/games" element={<GameScreen />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId/*" element={<QuestionAnswerPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
