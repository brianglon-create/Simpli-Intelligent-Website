import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = SITE.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(160deg, #F0F5FB 0%, #E8F0FA 55%, #DCE7F4 100%)",
          color: "#0B1F3A",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: "#2B5EA7",
            marginBottom: 28,
          }}
        >
          SIMPLI INTELLIGENT
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 650,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Built for Small Business. Built by Small Business.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#5A6577",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          A connected family of business applications that help owner-operated
          businesses grow, organize, and operate with confidence.
        </div>
      </div>
    ),
    size,
  );
}
