import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //1) ignora los build del front
  {
    ignores: [
      "dist/**", //ignora carpeta de distribucion 
      "node_modules/**", // 
    ]
  },

  //2) coding del back-end
  { files: ["server**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.node} 
  }
  },

  //3) coding del back-end
  { files: ["src**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.browser} 
  }
},
  //4) opcional
  { files: ["public**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.browser} 
  }
  },

    //2.1) coding de vite
  { files: ["vite.config.js"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.node} 
  }
  },
]);