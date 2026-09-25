import type { ImgHTMLAttributes } from "react";
import manifest from "../data/image-manifest.json";

const images: Record<string, { width: number; height: number; srcSet: string }> = manifest;
export function OptimizedImage({ src = "", sizes = "(min-width: 1200px) 520px, (min-width: 768px) 45vw, 90vw", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = images[src];
  return (
    <picture className="contents">
      {image && <source type="image/webp" srcSet={image.srcSet} sizes={sizes} />}
      <img src={src} width={image?.width} height={image?.height} decoding="async" loading="lazy" {...props} />
    </picture>
  );
}
