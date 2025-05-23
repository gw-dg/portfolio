import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";
import { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/katex/dist/katex.min.css",
            to: "public/css/katex.min.css",
          },
          {
            from: "node_modules/katex/dist/katex.min.js",
            to: "public/js/katex.min.js",
          },
        ],
      })
    );
    return config;
  },
};

export default nextConfig;
