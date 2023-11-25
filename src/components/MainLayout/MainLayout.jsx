import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar";
import BottomNavigationBar from "./BottomNavigationBar/BottomNavigationBar";

function MainLayout() {
  return (
    <main className="min-h-[100vh] w-screen flex flex-col">
      <NavigationBar />

      <Outlet />

      <BottomNavigationBar />
    </main>
  );
}

export default MainLayout;
