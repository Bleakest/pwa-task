import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Button from "@mui/material/Button";

function Header() {
  const auth = useAuth();

  return (
    <>
      <nav className="flex space-x-4 justify-center py-6 text-center bg-stone-900">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeLink" : "notActiveLink";
          }}
          to="/"
        >
          <Button color="inherit">Main</Button>
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeLink" : "notActiveLink";
          }}
          to="/character"
        >
          <Button color="inherit">Heroes</Button>
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeLink" : "notActiveLink";
          }}
          to="/location"
        >
          <Button color="inherit">Locations</Button>
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeLink" : "notActiveLink";
          }}
          to="/episode"
        >
          <Button color="inherit">Episodes</Button>
        </NavLink>
        {auth?.user ? (
          <Button variant="text" onClick={auth.signOut} color="inherit">
            Logout
          </Button>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}

export default Header;
