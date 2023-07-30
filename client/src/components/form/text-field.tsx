import clsx from "clsx";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type InputElementProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const TextField = <TFormValues extends FieldValues>({
  name,
  className,
  control,
  label,
  showErrorMessage = true,
  ...props
}: Omit<InputElementProps, "value" | "onChange" | "onBlur"> & {
  control: Control<TFormValues>;
  label?: string;
  name: Path<TFormValues>;
  showErrorMessage?: boolean;
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div>
      <label>
        {label && <p className="mb-2">{label}</p>}
        <input
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          className={clsx(
            "outline-none px-2 py-1 border rounded-lg transition-colors",
            {
              "border-red-500": error,
              "border-gray focus:border-primary": !error,
            },
            className
          )}
          {...props}
        />
      </label>
      {error && showErrorMessage && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
};
