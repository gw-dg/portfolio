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
// Using the exact values from your .dark theme
const darkTheme = {
  background: hslToRgb(222, 84, 4.9), // --background: 222 84% 4.9%
  foreground: hslToRgb(210, 40, 98), // --foreground: 210 40% 98%
  card: hslToRgb(222, 84, 4.9), // --card: 222 84% 4.9%
  cardForeground: hslToRgb(210, 40, 98), // --card-foreground: 210 40% 98%
  popover: hslToRgb(222, 84, 4.9), // --popover: 222 84% 4.9%
  popoverForeground: hslToRgb(210, 40, 98), // --popover-foreground: 210 40% 98%
  primary: hslToRgb(210, 40, 98), // --primary: 210 40% 98%
  primaryForeground: hslToRgb(222, 47.4, 11.2), // --primary-foreground: 222 47.4% 11.2%
  secondary: hslToRgb(217, 32.6, 17.5), // --secondary: 217 32.6% 17.5%
  secondaryForeground: hslToRgb(210, 40, 98), // --secondary-foreground: 210 40% 98%
  muted: hslToRgb(217, 32.6, 17.5), // --muted: 217 32.6% 17.5%
  mutedForeground: hslToRgb(215, 20.2, 65.1), // --muted-foreground: 215 20.2% 65.1%
  accent: hslToRgb(217, 32.6, 17.5), // --accent: 217 32.6% 17.5%
  accentForeground: hslToRgb(210, 40, 98), // --accent-foreground: 210 40% 98%
  destructive: hslToRgb(0, 62.8, 30.6), // --destructive: 0 62.8% 30.6%
  destructiveForeground: hslToRgb(210, 40, 98), // --destructive-foreground: 210 40% 98%
  border: hslToRgb(217, 32.6, 17.5), // --border: 217 32.6% 17.5%
  input: hslToRgb(217, 32.6, 17.5), // --input: 217 32.6% 17.5%
  ring: hslToRgb(212.7, 26.8, 83.9), // --ring: 212.7 26.8% 83.9%
  proseBody: hslToRgb(210, 40, 98), // --prose-body: 210 40% 98%
  proseHeading: hslToRgb(210, 40, 98), // --prose-heading: 210 40% 98%
  proseLinks: hslToRgb(210, 100, 70), // --prose-links: 210 100% 70%
  proseBold: hslToRgb(210, 40, 98), // --prose-bold: 210 40% 98%
  proseCode: hslToRgb(210, 100, 70), // --prose-code: 210 100% 70%
  proseQuote: hslToRgb(215, 20.2, 65.1), // --prose-quote: 215 20.2% 65.1%
  proseQuoteBorder: hslToRgb(217, 32.6, 17.5), // --prose-quote-border: 217 32.6% 17.5%
};

// Light theme tokens (for potential future use)
const lightTheme = {
  background: hslToRgb(0, 0, 100), // --background: 0 0% 100%
  foreground: hslToRgb(222, 84, 4.9), // --foreground: 222 84% 4.9%
  card: hslToRgb(0, 0, 100), // --card: 0 0% 100%
  cardForeground: hslToRgb(222, 84, 4.9), // --card-foreground: 222 84% 4.9%
  popover: hslToRgb(0, 0, 100), // --popover: 0 0% 100%
  popoverForeground: hslToRgb(222, 84, 4.9), // --popover-foreground: 222 84% 4.9%
  primary: hslToRgb(222, 47.4, 11.2), // --primary: 222 47.4% 11.2%
  primaryForeground: hslToRgb(210, 40, 98), // --primary-foreground: 210 40% 98%
  secondary: hslToRgb(210, 40, 96.1), // --secondary: 210 40% 96.1%
  secondaryForeground: hslToRgb(222, 47.4, 11.2), // --secondary-foreground: 222 47.4% 11.2%
  muted: hslToRgb(210, 40, 96.1), // --muted: 210 40% 96.1%
  mutedForeground: hslToRgb(215, 16.3, 46.9), // --muted-foreground: 215 16.3% 46.9%
  accent: hslToRgb(210, 40, 96.1), // --accent: 210 40% 96.1%
  accentForeground: hslToRgb(222, 47.4, 11.2), // --accent-foreground: 222 47.4% 11.2%
  destructive: hslToRgb(0, 84.2, 60.2), // --destructive: 0 84.2% 60.2%
  destructiveForeground: hslToRgb(210, 40, 98), // --destructive-foreground: 210 40% 98%
  border: hslToRgb(214.3, 31.8, 91.4), // --border: 214.3 31.8% 91.4%
  input: hslToRgb(214.3, 31.8, 91.4), // --input: 214.3 31.8% 91.4%
  ring: hslToRgb(222, 84, 4.9), // --ring: 222 84% 4.9%
  proseBody: hslToRgb(222, 47.4, 11.2), // --prose-body: 222 47.4% 11.2%
  proseHeading: hslToRgb(222, 47.4, 11.2), // --prose-heading: 222 47.4% 11.2%
  proseLinks: hslToRgb(240, 60, 50), // --prose-links: 240 60% 50%
  proseBold: hslToRgb(222, 47.4, 11.2), // --prose-bold: 222 47.4% 11.2%
  proseCode: hslToRgb(240, 50, 45), // --prose-code: 240 50% 45%
  proseQuote: hslToRgb(215, 20.2, 65.1), // --prose-quote: 215 20.2% 65.1%
  proseQuoteBorder: hslToRgb(214.3, 31.8, 91.4), // --prose-quote-border: 214.3 31.8% 91.4%
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Bhaskar Jha";
    const description =
      searchParams.get("description") || "Developer & Designer";
    const date = searchParams.get("date") || "";
    const tags = searchParams.get("tags")?.split(",") || [];
    const theme = searchParams.get("theme") || "dark"; // Allow theme switching

    // Select theme based on parameter (defaulting to dark)
    const selectedTheme = theme === "light" ? lightTheme : darkTheme;

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
            backgroundColor: `rgb(${selectedTheme.background.r}, ${selectedTheme.background.g}, ${selectedTheme.background.b})`,
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(${selectedTheme.muted.r}, ${selectedTheme.muted.g}, ${selectedTheme.muted.b}, 0.3) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(${selectedTheme.accent.r}, ${selectedTheme.accent.g}, ${selectedTheme.accent.b}, 0.2) 2%, transparent 0%)`,
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
              background: `linear-gradient(135deg, rgba(${selectedTheme.primary.r}, ${selectedTheme.primary.g}, ${selectedTheme.primary.b}, 0.1) 0%, rgba(${selectedTheme.accent.r}, ${selectedTheme.accent.g}, ${selectedTheme.accent.b}, 0.15) 100%)`,
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
                color: `rgb(${selectedTheme.foreground.r}, ${selectedTheme.foreground.g}, ${selectedTheme.foreground.b})`,
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
                color: `rgb(${selectedTheme.proseHeading.r}, ${selectedTheme.proseHeading.g}, ${selectedTheme.proseHeading.b})`,
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
                  color: `rgb(${selectedTheme.mutedForeground.r}, ${selectedTheme.mutedForeground.g}, ${selectedTheme.mutedForeground.b})`,
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
                      background: `rgba(${selectedTheme.secondary.r}, ${selectedTheme.secondary.g}, ${selectedTheme.secondary.b}, 0.8)`,
                      color: `rgb(${selectedTheme.secondaryForeground.r}, ${selectedTheme.secondaryForeground.g}, ${selectedTheme.secondaryForeground.b})`,
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "16px",
                      fontWeight: "500",
                      border: `1px solid rgba(${selectedTheme.border.r}, ${selectedTheme.border.g}, ${selectedTheme.border.b}, 0.5)`,
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
                  color: `rgb(${selectedTheme.mutedForeground.r}, ${selectedTheme.mutedForeground.g}, ${selectedTheme.mutedForeground.b})`,
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
              background: `radial-gradient(circle, rgba(${selectedTheme.proseLinks.r}, ${selectedTheme.proseLinks.g}, ${selectedTheme.proseLinks.b}, 0.15) 0%, transparent 70%)`,
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
              background: `radial-gradient(circle, rgba(${selectedTheme.accent.r}, ${selectedTheme.accent.g}, ${selectedTheme.accent.b}, 0.15) 0%, transparent 70%)`,
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
    console.log(`${e instanceof Error ? e.message : "An error occurred"}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
