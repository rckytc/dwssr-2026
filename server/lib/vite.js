//biblioteca file stream
import fs from 'node:fs'
//biblioteca de rutas
import path from 'node:path'
import { isAbsolute } from 'node:path/posix'
//import crear dirname
import {fileURLToPath} from 'node:url'
//creando las variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
/** 
 * helper para handlebars que genera las etiquetas de vite
 * EN DESAROLLO: conecta al servidor de desarrollo de vite
 * EN PRODUCCION: usa los compilados de vite
*/
export function viteAssets(){
    //obteniendo el entorno de ejecucion
    const isDev = process.env.NODE_ENV !== 'production'
    //rescatando la URL del servidor de desarrollo de vite
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'

    //si estamos en desarrollo
    if(isDev){
        //en desarrollo cargamos los archivode del fron end directamente desde
        //el servidor de desarrollo de vite
        return `<script type="module" src="${viteDevServer}/@vite/client"></script>
                <script type="module" src="${viteDevServer}/main.js"></script>
        `

    }
    // EN PRODUCCION: leemos el manifest y generamos las etiquetas para los archivos finales
    //leemos el manifest generado por vite
    const manifestPath = path.join(__dirname, '..','..', 'dist','.vite','manifest.json')
    //si no existe el manifest, lanzamos un error
    if(!fs.existsSync(manifestPath)){
        console.warn("Vite manifest not found.Run 'npm run build' to generate it.'")
    }
}
