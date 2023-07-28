import clsx from "clsx";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type TextAreaElementProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const TextArea = <TFormValues extends FieldValues>({
  name,
  className,
  control,
  label,
  ...props
}: Omit<TextAreaElementProps, "value" | "onChange" | "onBlur"> & {
  control: Control<TFormValues>;
  label?: string;
  name: Path<TFormValues>;
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div>
      <label>
        {label && <p className="mb-2">{label}</p>}
        <textarea
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
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
