import './App.css'
import Navbar from './components/Navbar/Navbar';
import AppProvider from './providers/app.provider'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<h1>Login</h1>} />
          <Route path='/register' element={<h1>Register</h1>} />
          
          <Route element={<Navbar />}>
            <Route path='/' element={<h1>Home</h1>} />
            <Route path='/favorites' element={<h1>Favorite posts</h1>} />
            <Route path='/own' element={<h1>Own posts</h1>} />
            <Route path='/post/:id' element={<h1>Post</h1>} />
            <Route path='/edit/:id' element={<h1>Edit post</h1>} />
            <Route path='/create' element={<h1>Create post</h1>} />
          </Route>

          <Route path='*' element={<h1>404</h1>} />


        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
