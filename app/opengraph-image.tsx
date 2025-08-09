// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "MAGIC PROMPT — 19.99$ за 60 минут";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const imageUrl = new URL("/og.png", process.env.APP_URL).href;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Размытый фон */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(40px) brightness(0.7)",
            transform: "scale(1.1)",
          }}
        />
        {/* Чёткая картинка */}
        <img
          src={imageUrl}
          alt={alt}
          width={size.width}
          height={size.height}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            zIndex: 1,
          }}
        />
      </div>
    ),
    size
  );
}
