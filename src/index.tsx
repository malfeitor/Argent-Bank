import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './utils/store'
import Landing from './pages/Landing'
import { Nav } from './layouts/Nav'
import { Footer } from './layouts/Footer'
import { SignIn } from './pages/SignIn'
import { UserPage } from './pages/User'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
