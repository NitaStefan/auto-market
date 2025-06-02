import type { NextConfig } from "next";
import { CAR_IMAGES_BUCKET_URL } from "./utils/constants";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [new URL(`${CAR_IMAGES_BUCKET_URL}**`)],
  },
};

export default nextConfig;
