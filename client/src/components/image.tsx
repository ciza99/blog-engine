import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

type ImageElementProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
export const Image = ({ src, ...props }: ImageElementProps) => {
  return (
    <div className="relative">
      <img src={src} {...props} />
      {!src && (
        <div className="flex absolute p-8 rounded-lg top-0 left-0 items-center justify-center h-full w-full bg-gray text-secondary">
          No Image
        </div>
      )}
    </div>
  );
};
