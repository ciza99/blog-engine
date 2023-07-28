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
  ...props
}: Omit<InputElementProps, "value" | "onChange" | "onBlur"> & {
  control: Control<TFormValues>;
  label?: string;
  name: Path<TFormValues>;
}) => {
  const {
    field,
    fieldState: { isTouched, error },
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
            "outline-none px-2 py-1 border border-gray rounded-lg focus:border-primary transition-colors",
            className
          )}
          {...props}
        />
      </label>
      {isTouched && error && (
        <span className="text-red-500">{error.message}</span>
      )}
    </div>
  );
};
