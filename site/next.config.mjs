import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This app lives in a subdirectory of a larger repository, so Next would
  // otherwise walk up, find the parent lockfile and infer the wrong workspace
  // root when collecting build traces.
  outputFileTracingRoot: here,
};

export default nextConfig;
