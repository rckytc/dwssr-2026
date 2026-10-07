// Importando el configurador de Vite
import { defineConfig } from "vite"

// Importando el administrador de rutas de Node
import { resolve } from "node:path"

// Importar para crear dirname en ESM
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// Creando las variables de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    // Directorio raíz de los archivos fuente del front-end
    root: "src",
    
    // Configurando un servidor de desarrollo
    server: {
        // Puerto de listening
        port: 5173,
        // Rigidez del puerto
        strict: true
    },
    
    // Configurando el build
    build: {
        // Directorio de salida del js para producción
        outDir: "../dist",
        // Asegurando limpieza del folder de producción
        emptyOutDir: true,
        // Generar manifiesto para el servidor
        manifest: true,
        // Opciones de empaquetado
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/main.js"),
            }
        }
    },
    
    // Configuración para el desarrollo 
    publicDir: false
})