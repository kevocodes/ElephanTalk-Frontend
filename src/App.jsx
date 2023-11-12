import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./providers/app.provider";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Favorites from "./pages/Favorites/Favorites";
import Own from "./pages/Own/Own";
import Details from "./pages/Details/Details";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";

function App() {
  const token = useAuthStore((state) => state.token);
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={<ProtectedRoute redirectTo="/login" isAllowed={!!token} />}
          >
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/own" element={<Own />} />
              <Route path="/post/:id" element={<Details />} />
              <Route path="/edit/:id" element={<h1>Edit post</h1>} />
              <Route path="/create" element={<h1>Create post</h1>} />
              <Route path="*" element={<h1>404</h1>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
