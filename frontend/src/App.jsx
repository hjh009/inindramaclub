import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import PostDetail from './pages/PostDetail'
import PostNew from './pages/PostNew'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/new" element={<PostNew />} />
        <Route path="/gallery/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
