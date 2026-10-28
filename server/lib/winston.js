//importando el core de winston
import winston, {format} from 'winston';
//importando bibliotecas de node
import path from "node.path";
import fs from 'node:fs';
//importando plug-in de winston
import DailyRotateFile from 'winston-daily-rotate-file';

//desestructurar funciones utiles de format
const { combine, timestamp, label, printf, colorize, prettryPrint} = format

//creando variable del directorio raiz
const rootdir = path.resolve(process.cwd());

//creando directorio de logs
const logsDir = path.join(rootdir,"logs");
if (!fs.existsSync(logsDir)){
  fs.mkdirSync(logsDir,{recursive:true})
}

//Definiendo esquema de colores
const colors ={
  error:'red',
  warn:'yellow',
  info:'green',
  http:'magenta',
  debug:'blue',
}

//agregando ese esquema a winston
winston.addColors(colors);

const myConsoleFormat = combine(
  //colores del formato
  colorize({all:true}),
  //agregando una etiqueta
  label({label:'🎙:'}),
  //agregando fecha
  timestamp({format:"DD-MM-YYYY HH:mm:ss"}),
  //funcion de impresion
  printf((info)=>`${info.level} 🔺${info.label} 🔺 ${info.timestamp} 🔺 ${info.message}`)
)

const myFileFormat = combine(
  //retirar color
  format.uncolorize(),
  //agregar fecha
  timestamp(),
  //salida
  format.json(),
);

//construuyendo y configurando los yransportes 
const options = {
  errorFile:{
    level:"error",
    filename:path.join(logsDir,"error.log"),
      maxsize: 5242880, //5MB
      maxFiles: 2,
      format: myFileFormat
  },

  console:{
    level:"debug",
    handleExceptions: true,
    format: myConsoleFormat
  },

  readableFile:{
    level: 'info',
    filename:path.join(logsDir,'readable.log'),
      maxsize: 5242880, //5MB
      maxFiles: 2,
      format: combine(
        format.uncolorize(),
        timestamp({format:"DD-MM-YYYY HH:mm:ss"}),
        prettryPrint(),
      ),
  },

  DailyRotateFile:{
      level: 'info',
      filename:path.join(logsDir,'app-%DATE%.log'),
      datePattern:"YYYY-MM-DD",
      zippedArchive: true,
      maxsize: 5242880, //5MB
      maxFiles: 2,
      format:myFileFormat
  }
};

//CREANDO EL LOGGER
const logger = winston.createLogger({
  transports:[
    new DailyRotateFile(options.DailyRotateFile),
    new winston.transport.File(options.readableFile),
    new winston.transport.File(options.errorFile),
    new winston.transport.Console(options.console),
  ],

  exceptionHandlers:[
    new winston.transport.File({
      filename:path.join(logsDir,"exceptions.log"),
    }),
  ],
  rejectionHandlers:[
    new winston.transport.File({
      filename:path.join(logsDir,"rejections.log"),
    }),
  ],
  exitOnError:false,
});


//exportamos el logo 

export default logger;