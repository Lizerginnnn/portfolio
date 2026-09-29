import type { Crop } from "@/types";
import { cn } from "@/utils";
import { CroppedImage } from "../cropped-image";
import "./graduation-photo.scss";

// Кадрирование из ui-kit (photo / image 183).
const CROP: Crop = { width: "100.08%", height: "145.61%", left: "-0.04%", top: "-28.04%" };

/**
 * ui-kit → photo (0:4838): «image 182» — ч/б, «image 183» — цветной вариант.
 * Ч/б версия делается фильтром из цветного файла: выгруженный из Figma ч/б PNG
 * растянут по горизонтали, а так пропорции и кадр всегда совпадают.
 * Цвет проявляется при наведении.
 */
export function GraduationPhoto({ className }: { className?: string }) {
  return (
    <div className={cn("graduation-photo", className)}>
      <CroppedImage
        src="/images/graduation-color.png"
        alt="Елизавета с дипломом ИТМО на фоне реки"
        width={960}
        height={1280}
        sizes="(min-width: 1920px) 528px, (min-width: 768px) 416px, 100vw"
        crop={CROP}
        className="graduation-photo__image"
      />
    </div>
  );
}
