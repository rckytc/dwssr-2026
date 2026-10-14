import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1) Ignora los archivos de construcción (build) del frontend y dependencias
  {
    ignores: [
      "dist/**",        // ignora carpeta de distribución
      "node_modules/**" // ignora carpetas de dependencias
    ]
  },

  // 2) Configuración para el Backend (servidor)
  { 
    files: ["server/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      } 
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  },

  // 3) Configuración para el Frontend (archivos dentro de src)
  { 
    files: ["src/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      } 
    }
  },

  // 4) Configuración para la carpeta de archivos públicos (public)
  { 
    files: ["public/**/*.{js,mjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      } 
    }
  },

  // 5) Configuración específica para la configuración de Vite
  { 
    files: ["vite.config.js"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      } 
    }
  }
]);