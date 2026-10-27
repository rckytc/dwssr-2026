
 // FUNCION PARA MANEJAR ERRORES
import createError from 'http-errors';
// IMPORTA EL FRAMEWORK EXPRESS
import express from 'express';
// IMPORTA LOS MODULOS PARA MANEJAR RUTAS
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// IMPORTA EL MODULO PARA MANEJAR COOKIES
import cookieParser from 'cookie-parser';
// IMPORTA EL MODULO PARA MANEJAR LOGS
import logger from 'morgan';
import createDebug from 'debug';
// IMPORTA HANDLEBARS
import hbs from 'hbs';
// IMPORTA LAS RUTAS DE LA APLICACION
import indexRouter from '#routes/index.js';
import usersRouter from '#routes/users.js';
// IMPORTA LOS HELPERS DE VITE
import { registerViteHelpers } from './lib/vite.js';

const debug = createDebug('dwssr-2026:server:');

// CREA LAS VARIABLES DE RUTA
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CREA UNA INSTANCIA DE EXPRESS
const app = express();

// CONFIGURACION DEL MOTOR DE VISTAS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// REGISTRA EL HELPER DE VITE
registerViteHelpers(hbs);

debug('🔨 creando backend');

// CONFIGURACION DE MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ARCHIVOS ESTATICOS PARA PRODUCCION
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// CONFIGURACION DE ARCHIVOS ESTATICOS PUBLICOS
debug('🔨 creando servidor de archivos estaticos');
app.use(express.static(path.join(__dirname, '..', 'public')));

// CONFIGURACION DE RUTAS
debug('🔨 registrando rutas');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// CAPTURA DE ERRORES 404
app.use((req, res, next) => {
  next(createError(404));
});

// MANEJADOR DE ERRORES
app.use((err, req, res, _next) => {
  // MUESTRA EL ERROR SOLO EN DESARROLLO
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDERIZA LA PAGINA DE ERROR
  res.status(err.status || 500);
  res.render('error');
});

export default app;
