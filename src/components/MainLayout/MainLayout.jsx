import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar";
import BottomNavigationBar from "./BottomNavigationBar/BottomNavigationBar";

function MainLayout() {
  return (
    <main className="min-h-screen w-screen">
      <NavigationBar />

      <Outlet />

      <BottomNavigationBar />
    </main>
  );
}

export default MainLayout;