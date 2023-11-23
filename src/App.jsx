import { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Details from "./pages/Details/Details";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Own from "./pages/Own/Own";
import Register from "./pages/Register/Register";
import AppProvider from "./providers/app.provider";
import { validateSession } from "./services/auth.service";
import { useAuthStore } from "./store/auth.store";
import CreatePost from "./pages/CreatePost/CreatePost";
import UpdatePost from "./pages/UpdatePost/UpdatePost";

function App() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    async function validate() {
      try {
        const userInfo = await validateSession({ token });
        if (!user) setUser(userInfo);
      } catch (error) {
        setUser(null);
      }
    }

    if (token) validate();
  }, [token, user, setUser]);

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            element={
              <ProtectedRoute
                redirectTo="/login"
                isAllowed={Boolean(token && user)}
              />
            }
          >
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/own" element={<Own />} />
              <Route path="/post/:id" element={<Details />} />
              <Route path="/edit/:id" element={<UpdatePost />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
