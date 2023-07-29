import clsx from "clsx";
import { ReactNode } from "react";

type ButtonElementProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  className,
  variant = "primary",
  children,
  startNode,
  ...props
}: ButtonElementProps & {
  variant?: "primary" | "secondary" | "icon" | "clear";
  startNode?: ReactNode;
}) => {
  return (
    <button
      className={clsx(
        "py-1 flex items-center gap-4",
        {
          "px-2 rounded-lg bg-primary text-white": variant === "primary",
          "px-2 rounded-lg bg-secondary text-white": variant === "secondary",
          "px-2 rounded-lg": variant === "clear",
          "px-1 rounded-full": variant === "icon",
        },
        className
      )}
      {...props}
    >
      {startNode}
      {children}
    </button>
  );
};
