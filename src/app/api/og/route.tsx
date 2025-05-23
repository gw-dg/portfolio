// src/app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Function to convert HSL to RGB for canvas operations
const hslToRgb = (h: number, s: number, l: number) => {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

// HSL color tokens from globals.css (dark theme)
const darkTheme = {
  background: hslToRgb(222, 84, 4.9), // --background: 222 84% 4.9%
  foreground: hslToRgb(210, 40, 98), // --foreground: 210 40% 98%
  muted: hslToRgb(217, 32.6, 17.5), // --muted: 217 32.6% 17.5%
  mutedForeground: hslToRgb(215, 20.2, 65.1), // --muted-foreground: 215 20.2% 65.1%
  accent: hslToRgb(217, 32.6, 17.5), // --accent: 217 32.6% 17.5%
  primary: hslToRgb(210, 40, 98), // --primary: 210 40% 98%
  border: hslToRgb(217, 32.6, 17.5), // --border: 217 32.6% 17.5%
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Bhaskar Jha";
    const description =
      searchParams.get("description") || "Developer & Designer";
    const date = searchParams.get("date") || "";
    const tags = searchParams.get("tags")?.split(",") || [];

    // Fetch Inter font
    const interRegular = await fetch(
      new URL(
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      )
    );

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `rgb(${darkTheme.background.r}, ${darkTheme.background.g}, ${darkTheme.background.b})`,
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(${darkTheme.muted.r}, ${darkTheme.muted.g}, ${darkTheme.muted.b}, 0.3) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(${darkTheme.accent.r}, ${darkTheme.accent.g}, ${darkTheme.accent.b}, 0.2) 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            position: "relative",
          }}>
          {/* Background gradient overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, rgba(${darkTheme.primary.r}, ${darkTheme.primary.g}, ${darkTheme.primary.b}, 0.1) 0%, rgba(${darkTheme.accent.r}, ${darkTheme.accent.g}, ${darkTheme.accent.b}, 0.15) 100%)`,
            }}
          />

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "40px 60px",
              position: "absolute",
              top: 0,
            }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: `rgb(${darkTheme.foreground.r}, ${darkTheme.foreground.g}, ${darkTheme.foreground.b})`,
                fontFamily: "Georgia, Times, serif", // Serif font for GwdG
                fontStyle: "italic",
              }}>
              GwdG
            </div>
          </div>

          {/* Main content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 60px",
              maxWidth: "900px",
              zIndex: 1,
            }}>
            {/* Title */}
            <h1
              style={{
                fontSize: Math.min(
                  64,
                  Math.max(32, (800 / title.length) * 1.2)
                ),
                fontWeight: "700",
                color: `rgb(${darkTheme.foreground.r}, ${darkTheme.foreground.g}, ${darkTheme.foreground.b})`,
                lineHeight: 1.2,
                margin: "0 0 30px 0",
                textAlign: "center",
                maxWidth: "100%",
                wordWrap: "break-word",
                fontFamily:
                  "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}>
              {title}
            </h1>

            {/* Description */}
            {description && description !== "Developer & Designer" && (
              <p
                style={{
                  fontSize: 24,
                  color: `rgb(${darkTheme.mutedForeground.r}, ${darkTheme.mutedForeground.g}, ${darkTheme.mutedForeground.b})`,
                  lineHeight: 1.4,
                  margin: "0 0 40px 0",
                  textAlign: "center",
                  maxWidth: "800px",
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: "400",
                }}>
                {description.length > 120
                  ? description.substring(0, 120) + "..."
                  : description}
              </p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "40px",
                }}>
                {tags.slice(0, 4).map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      background: `rgba(${darkTheme.accent.r}, ${darkTheme.accent.g}, ${darkTheme.accent.b}, 0.8)`,
                      color: `rgb(${darkTheme.foreground.r}, ${darkTheme.foreground.g}, ${darkTheme.foreground.b})`,
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "16px",
                      fontWeight: "500",
                      border: `1px solid rgba(${darkTheme.border.r}, ${darkTheme.border.g}, ${darkTheme.border.b}, 0.5)`,
                      fontFamily:
                        "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                    }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* Date */}
            {date && (
              <div
                style={{
                  fontSize: 18,
                  color: `rgb(${darkTheme.mutedForeground.r}, ${darkTheme.mutedForeground.g}, ${darkTheme.mutedForeground.b})`,
                  fontWeight: "500",
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                }}>
                {date}
              </div>
            )}
          </div>

          {/* Decorative elements using theme colors */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "10%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${darkTheme.primary.r}, ${darkTheme.primary.g}, ${darkTheme.primary.b}, 0.15) 0%, transparent 70%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              left: "15%",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${darkTheme.accent.r}, ${darkTheme.accent.g}, ${darkTheme.accent.b}, 0.15) 0%, transparent 70%)`,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: await fetch(
              new URL(
                "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
                import.meta.url
              )
            ).then((res) => res.arrayBuffer()),
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: await fetch(
              new URL(
                "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2",
                import.meta.url
              )
            ).then((res) => res.arrayBuffer()),
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e: unknown) {
    console.log(`${e instanceof Error ? e.message : "An error occurred"}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
