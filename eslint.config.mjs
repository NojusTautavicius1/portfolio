import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // React Three Fiber mutates three.js objects inside useFrame on purpose (the documented
    // pattern for per-frame animation). The React Compiler immutability rule cannot model that.
    files: ["src/components/three/**"],
    rules: { "react-hooks/immutability": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "juodrastis/**", "blender/**"]),
]);
