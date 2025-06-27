import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import Home from './pages/Home/Home.jsx'
import SchedulePage from './pages/SchedulePage/SchedulePage.jsx'
import './App.css'
import MemoryPage from "./pages/MemoryPage/MemoryPage.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/schedule" element={<SchedulePage />} />*/}
          <Route path="/memory" element={<MemoryPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

