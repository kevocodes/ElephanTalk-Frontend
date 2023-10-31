import { Outlet } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <div>Navbar</div>
      <Outlet />
    </nav>
  )
}

export default Navbar