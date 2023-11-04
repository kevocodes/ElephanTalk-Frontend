import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./providers/app.provider";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/own" element={<h1>Own posts</h1>} />
            <Route path="/post/:id" element={<h1>Post</h1>} />
            <Route path="/edit/:id" element={<h1>Edit post</h1>} />
            <Route path="/create" element={<h1>Create post</h1>} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
