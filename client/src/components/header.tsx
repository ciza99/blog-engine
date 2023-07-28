import clsx from "clsx";
import { useAuth } from "context/auth-context";
import { FaArrowRight, FaCaretDown } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { Avatar } from "./avatar";

const getLinkClassNames = ({ isActive }: { isActive: boolean }) =>
  clsx({
    "text-body": isActive,
    "text-secondary": !isActive,
  });

export const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="fixed h-14 flex left-0 right-0 top-0 items-center bg-light">
      <nav className="flex items-center gap-4 container mx-auto">
        <NavLink to="/" className={getLinkClassNames}>
          Recent Articles
        </NavLink>
        <NavLink to="/about" className={getLinkClassNames}>
          About
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/articles"
              className={(props) => clsx("ml-auto", getLinkClassNames(props))}
            >
              My Articles
            </NavLink>
            <NavLink to="/articles/new" className={getLinkClassNames}>
              Create Article
            </NavLink>
            <div className="flex items-center gap-2">
              <FaCaretDown className="text-secondary" />
              <Avatar />
            </div>
          </>
        ) : (
          <NavLink
            to="/login"
            className={(props) =>
              clsx("ml-auto text-primary", getLinkClassNames(props))
            }
          >
            <div className="flex items-center">
              <span>Log in</span>
              <FaArrowRight className="ml-2" />
            </div>
          </NavLink>
        )}
      </nav>
    </header>
  );
};
