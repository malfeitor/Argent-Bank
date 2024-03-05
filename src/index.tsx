import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import { Nav } from './layouts/Nav'
import { Footer } from './layouts/Footer'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
)
