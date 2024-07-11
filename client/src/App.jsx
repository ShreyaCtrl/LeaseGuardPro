// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { UserProvider } from './UserProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage';
import './App.css';
// import NavBar from './components/NavBar';

function App() {

  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          {/* <NavBar /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<LandingPage/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App
