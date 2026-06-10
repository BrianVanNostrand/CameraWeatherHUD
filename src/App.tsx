import { Routes, Route } from 'react-router-dom'
import CamerasPage from './pages/CamerasPage'
import WeatherPage from './pages/WeatherDashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/cameras" element={<CamerasPage />} />
      <Route path="/weather" element={<WeatherPage />} />
    </Routes>
  )
}