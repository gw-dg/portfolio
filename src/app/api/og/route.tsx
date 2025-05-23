// src/app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Precomputed RGB values based on original HSL theme tokens
const darkTheme = {
  background: { r: 2, g: 6, b: 17 },
  foreground: { r: 241, g: 245, b: 249 },
  muted: { r: 30, g: 41, b: 59 },
  accent: { r: 39, g: 50, b: 73 },
  primary: { r: 241, g: 245, b: 249 },
  proseHeading: { r: 241, g: 245, b: 249 },
  mutedForeground: { r: 148, g: 163, b: 184 },
  proseLinks: { r: 102, g: 166, b: 255 },
  secondary: { r: 38, g: 44, b: 56 },
  secondaryForeground: { r: 241, g: 245, b: 249 },
  border: { r: 38, g: 44, b: 56 },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Bhaskar Jha";
    const description =
      searchParams.get("description") || "Developer & Designer";
    const date = searchParams.get("date") || "";
    const tags = searchParams.get("tags")?.split(",") || [];

    const theme = darkTheme;

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
            backgroundColor: `rgb(${theme.background.r}, ${theme.background.g}, ${theme.background.b})`,
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(${theme.muted.r}, ${theme.muted.g}, ${theme.muted.b}, 0.3) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(${theme.accent.r}, ${theme.accent.g}, ${theme.accent.b}, 0.2) 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            position: "relative",
          }}>
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, rgba(${theme.primary.r}, ${theme.primary.g}, ${theme.primary.b}, 0.1) 0%, rgba(${theme.accent.r}, ${theme.accent.g}, ${theme.accent.b}, 0.15) 100%)`,
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
                fontWeight: "bold",
                fontStyle: "italic",
                fontFamily: "Georgia, Times, serif",
                color: `rgb(${theme.foreground.r}, ${theme.foreground.g}, ${theme.foreground.b})`,
              }}>
              GwdG
            </div>
          </div>

          {/* Main */}
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
            <h1
              style={{
                fontSize: Math.min(
                  64,
                  Math.max(32, (800 / title.length) * 1.2)
                ),
                fontWeight: "700",
                color: `rgb(${theme.proseHeading.r}, ${theme.proseHeading.g}, ${theme.proseHeading.b})`,
                lineHeight: 1.2,
                margin: "0 0 30px 0",
              }}>
              {title}
            </h1>

            {description && description !== "Developer & Designer" && (
              <p
                style={{
                  fontSize: 24,
                  color: `rgb(${theme.mutedForeground.r}, ${theme.mutedForeground.g}, ${theme.mutedForeground.b})`,
                  lineHeight: 1.4,
                  margin: "0 0 40px 0",
                  maxWidth: "800px",
                  fontWeight: "400",
                }}>
                {description.length > 120
                  ? description.substring(0, 120) + "..."
                  : description}
              </p>
            )}

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
                      background: `rgba(${theme.secondary.r}, ${theme.secondary.g}, ${theme.secondary.b}, 0.8)`,
                      color: `rgb(${theme.secondaryForeground.r}, ${theme.secondaryForeground.g}, ${theme.secondaryForeground.b})`,
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "16px",
                      fontWeight: "500",
                      border: `1px solid rgba(${theme.border.r}, ${theme.border.g}, ${theme.border.b}, 0.5)`,
                    }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {date && (
              <div
                style={{
                  fontSize: 18,
                  color: `rgb(${theme.mutedForeground.r}, ${theme.mutedForeground.g}, ${theme.mutedForeground.b})`,
                  fontWeight: "500",
                }}>
                {date}
              </div>
            )}
          </div>

          {/* Decorations */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "10%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${theme.proseLinks.r}, ${theme.proseLinks.g}, ${theme.proseLinks.b}, 0.15) 0%, transparent 70%)`,
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
              background: `radial-gradient(circle, rgba(${theme.accent.r}, ${theme.accent.g}, ${theme.accent.b}, 0.15) 0%, transparent 70%)`,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error(e instanceof Error ? e.message : "Unknown error");
    return new Response("Failed to generate the image", { status: 500 });
  }
}
