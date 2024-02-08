const winston = require('winston')
const { format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = winston.createLogger({
  //   level: 'info',
  //   format: winston.format.json(),
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'fulllogs.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

logger.info('Starting,SHanu')

logger.error('Something went wrong', {
  error: new Error('Something went wrong'),
})
