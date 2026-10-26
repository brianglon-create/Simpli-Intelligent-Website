import { ImageResponse } from "next/og";
import { BRAND, MARK_PATH, MARK_VIEWBOX } from "@/lib/brand";

export const ogSize = { width: 1200, height: 630 };

export function ogImage(title: string, subtitle: string) {
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
          background: BRAND.navy,
          color: BRAND.white,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
          <svg viewBox={MARK_VIEWBOX} width="84" height="108" style={{ display: "flex" }}>
            <defs>
              <linearGradient id="ogmark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={BRAND.white} />
                <stop offset="0.47" stopColor={BRAND.white} />
                <stop offset="0.54" stopColor={BRAND.navy} />
                <stop offset="0.74" stopColor={BRAND.blue} />
                <stop offset="1" stopColor={BRAND.blue} />
              </linearGradient>
            </defs>
            <path
              d={MARK_PATH}
              fill="none"
              stroke="url(#ogmark)"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 22 }}>
            <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: "0.04em" }}>SIMPLI</div>
            <div
              style={{
                marginTop: 8,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.28em",
                color: BRAND.blueLight,
              }}
            >
              INTELLIGENT
            </div>
          </div>
        </div>
        <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>{title}</div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: BRAND.blueLight,
            maxWidth: 860,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    ogSize,
  );
}
