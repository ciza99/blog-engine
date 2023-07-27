import { NavLink, Outlet } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import clsx from "clsx";

export const Layout = () => {
  return (
    <>
      <header className="fixed h-14 flex left-0 right-0 top-0 items-center bg-light">
        <nav className="flex items-center gap-4 container mx-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx({
                "text-body": isActive,
                "text-secondary": !isActive,
              })
            }
          >
            Recent Articles
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login" className="ml-auto text-primary">
            <div className="flex items-center">
              <span>Log in</span>
              <FaArrowRight className="ml-2" />
            </div>
          </NavLink>
        </nav>
      </header>

      <main className="pt-14 container mx-auto">
        <Outlet />
      </main>
    </>
  );
};
