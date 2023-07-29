import clsx from "clsx";
import { useAuth } from "context/auth-context";
import { FaArrowRight, FaCaretDown, FaRightFromBracket } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { Avatar } from "./avatar";
import { useState } from "react";
import { Button } from "./button";
import { tokenHandler } from "utils/token-handler";
import { usePopover } from "hooks/use-popover";

const getLinkClassNames = ({ isActive }: { isActive: boolean }) =>
  clsx({
    "text-body": isActive,
    "text-secondary": !isActive,
  });

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { refreshAuth } = useAuth();
  const { refs, getReferenceProps, floatingStyles, getFloatingProps } =
    usePopover({
      open,
      onOpenChange: setOpen,
    });

  const { isLoggedIn } = useAuth();

  return (
    <header className="z-20 fixed h-14 flex left-0 right-0 top-0 items-center bg-light">
      <nav className="flex items-center gap-4 container px-2 mx-auto">
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
            <NavLink to="/articles/new" className="text-primary">
              Create Article
            </NavLink>
            <button
              className="flex items-center gap-2"
              ref={refs.setReference}
              {...getReferenceProps()}
            >
              <FaCaretDown className="text-secondary" />
              <Avatar />
            </button>
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

      {open && (
        <div
          {...getFloatingProps()}
          style={floatingStyles}
          ref={refs.setFloating}
          className="p-2 shadow-lg border border-light rounded-lg"
        >
          <Button
            variant="clear"
            className="hover:bg-light transition-colors"
            startNode={<FaRightFromBracket />}
            onClick={() => {
              tokenHandler.deleteToken();
              refreshAuth();
              setOpen(false);
            }}
          >
            Log out
          </Button>
        </div>
      )}
    </header>
  );
};
