import clsx from "clsx";
import { useAuth } from "context/auth-context";
import {
  FaArrowRight,
  FaBars,
  FaCaretDown,
  FaRightFromBracket,
  FaXmark,
} from "react-icons/fa6";
import { NavLink, NavLinkProps } from "react-router-dom";
import { Avatar } from "./avatar";
import { useCallback, useState } from "react";
import { Button } from "./button";
import { tokenHandler } from "utils/token-handler";
import { usePopover } from "hooks/use-popover";

const getLinkClassNames = ({ isActive }: { isActive: boolean }) =>
  clsx({
    "text-body": isActive,
    "text-secondary": !isActive,
  });

export const Header = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { refreshAuth } = useAuth();
  const { refs, getReferenceProps, floatingStyles, getFloatingProps } =
    usePopover({
      open: popoverOpen,
      onOpenChange: setPopoverOpen,
    });

  const { isLoggedIn } = useAuth();

  const logOut = useCallback(() => {
    tokenHandler.deleteToken();
    refreshAuth();
  }, [refreshAuth]);

  const MenuNavLink = useCallback((props: NavLinkProps) => {
    return (
      <NavLink
        {...props}
        onClick={(e) => {
          props.onClick?.(e);
          setMenuOpen(false);
        }}
      />
    );
  }, []);

  return (
    <header className="z-20 fixed h-14 flex left-0 right-0 top-0 items-center bg-light">
      <div className="sm:hidden container px-2 mx-auto">
        <button onClick={() => setMenuOpen(true)}>
          <FaBars />
        </button>
      </div>
      <nav
        className={clsx(
          "flex flex-col fixed top-0 left-0 bottom-0 right-0 bg-light shadow-lg gap-4 p-4",
          "sm:flex-row sm:static sm:shadow-none sm:items-center sm:container sm:mx-auto sm:px-2 sm:py-0 sm:transition-none",
          {
            "translate-x-0 transition-transform": menuOpen,
            "-translate-x-full sm:translate-x-0": !menuOpen,
          }
        )}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="sm:hidden self-end"
        >
          <FaXmark />
        </button>
        <MenuNavLink to="/" className={getLinkClassNames}>
          Recent Articles
        </MenuNavLink>
        <MenuNavLink to="/about" className={getLinkClassNames}>
          About
        </MenuNavLink>
        {isLoggedIn ? (
          <>
            <MenuNavLink
              to="/articles"
              className={(props) =>
                clsx("sm:ml-auto", getLinkClassNames(props))
              }
            >
              My Articles
            </MenuNavLink>
            <MenuNavLink to="/articles/new" className="text-primary">
              Create Article
            </MenuNavLink>
            <button
              className="items-center gap-2 hidden sm:flex"
              ref={refs.setReference}
              {...getReferenceProps()}
            >
              <FaCaretDown className="text-secondary" />
              <Avatar />
            </button>
            <button
              className="sm:hidden text-red-500 text-start"
              onClick={() => {
                logOut();
                setMenuOpen(false);
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <MenuNavLink
            to="/login"
            className={(props) =>
              clsx("sm:ml-auto text-primary", getLinkClassNames(props))
            }
          >
            <div className="flex items-center">
              <span>Log in</span>
              <FaArrowRight className="ml-2" />
            </div>
          </MenuNavLink>
        )}
      </nav>

      {popoverOpen && (
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
              logOut();
              setPopoverOpen(false);
            }}
          >
            Log out
          </Button>
        </div>
      )}
    </header>
  );
};
