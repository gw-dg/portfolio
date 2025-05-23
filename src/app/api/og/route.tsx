// src/app/api/og/route.tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Bhaskar Jha";
    const description = searchParams.get("description") || "Blog Post";
    const date = searchParams.get("date") || "";
    const tags = searchParams.get("tags")?.split(",") || [];

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
            backgroundColor: "#0f172a",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #334155 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            fontFamily: "Inter, sans-serif",
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
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
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
                color: "#f8fafc",
                fontStyle: "italic",
              }}>
              GwdG
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#94a3b8",
              }}></div>
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
                fontWeight: "bold",
                color: "#f8fafc",
                lineHeight: 1.2,
                margin: "0 0 30px 0",
                textAlign: "center",
                maxWidth: "100%",
                wordWrap: "break-word",
              }}>
              {title}
            </h1>

            {/* Description */}
            {description && description !== "Blog Post" && (
              <p
                style={{
                  fontSize: 24,
                  color: "#cbd5e1",
                  lineHeight: 1.4,
                  margin: "0 0 40px 0",
                  textAlign: "center",
                  maxWidth: "800px",
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
                      background: "rgba(59, 130, 246, 0.2)",
                      color: "#93c5fd",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "16px",
                      fontWeight: "500",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
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
                  color: "#64748b",
                  fontWeight: "500",
                }}>
                {date}
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "10%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
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
              background:
                "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
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
