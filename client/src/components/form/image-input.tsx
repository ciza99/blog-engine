import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
  useFormContext,
} from "react-hook-form";

type InputElementProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const ImageField = <TFormValues extends FieldValues>({
  name,
  control,
  className,
  label,
  ...props
}: Omit<InputElementProps, "type" | "value" | "onChange" | "onBlur"> & {
  control: Control<TFormValues>;
  label?: string;
  name: Path<TFormValues>;
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });
  const { setValue } = useFormContext<TFormValues>();
  const [inputValue, setInputValue] = useState("");
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (!field.value) {
      setSrc(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(field.value);
    setSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [field.value]);

  return (
    <div>
      <label htmlFor={name}>{label && <p className="mb-2">{label}</p>}</label>
      <input
        id={name}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          field.onChange(e.target.files?.[0]);
        }}
        onBlur={field.onBlur}
        type="file"
        className={clsx("hidden", className)}
        {...props}
      />
      {!src && (
        <label
          htmlFor={name}
          className="cursor-pointer bg-secondary text-white px-2 py-2 rounded-lg"
        >
          Upload an image
        </label>
      )}
      {src && (
        <>
          <img src={src} className="w-32 h-32 rounded-lg" />
          <div className="mt-2 flex items-center gap-2">
            <label htmlFor={name} className="cursor-pointer text-primary">
              Upload new
            </label>
            <div className="h-5 w-0.5 bg-light" />
            <span
              onClick={() => {
                setValue(name, "" as PathValue<TFormValues, Path<TFormValues>>);
                setInputValue("");
              }}
              className="cursor-pointer text-red-500"
            >
              Delete
            </span>
          </div>
        </>
      )}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
