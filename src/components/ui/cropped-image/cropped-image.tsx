import Image from "next/image";
import type { Crop } from "@/types";

type CroppedImageProps = {
  src: string;
  alt: string;
  /** Исходный размер файла — нужен next/image для srcset. */
  width: number;
  height: number;
  /** Кадр из Figma в % от родителя (родитель — position: relative + overflow: hidden). */
  crop: Crop;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Картинка, спозиционированная внутри рамки так же, как кроп заливки в Figma. */
export function CroppedImage({ crop, className, ...props }: CroppedImageProps) {
  return (
    <Image
      {...props}
      aria-hidden={props.alt === "" ? true : undefined}
      className={className}
      style={{
        position: "absolute",
        width: crop.width,
        height: crop.height,
        left: crop.left,
        top: crop.top,
        maxWidth: "none",
      }}
    />
  );
}
