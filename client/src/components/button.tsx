import clsx from "clsx";

type ButtonElementProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonElementProps & {
  variant?: "primary" | "secondary" | "icon";
}) => {
  return (
    <button
      className={clsx(
        "py-1",
        {
          "px-2 rounded-lg bg-primary text-white": variant === "primary",
          "px-2 rounded-lg bg-secondary text-white": variant === "secondary",
          "px-1 rounded-full": variant === "icon",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
