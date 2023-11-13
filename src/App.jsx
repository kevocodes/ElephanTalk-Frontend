import MainLayout from "./components/MainLayout/MainLayout";
import AppProvider from "./providers/app.provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost/CreatePost";
import UpdatePost from "./pages/UpdatePost/UpdatePost";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/favorites" element={<h1>Favorite posts</h1>} />
            <Route path="/own" element={<h1>Own posts</h1>} />
            <Route path="/post/:id" element={<h1>Post</h1>} />
            <Route path="/edit/:id" element={<UpdatePost />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
