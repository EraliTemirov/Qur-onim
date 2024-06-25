import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailSurahPage from './pages/DetailSurahPage'
import NotFoundPage from './pages/NotFoundPage'
import Watch from './pages/Watch'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/surat/:nomor' element={<DetailSurahPage />} />
        <Route path='/watch' element={<Watch />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
