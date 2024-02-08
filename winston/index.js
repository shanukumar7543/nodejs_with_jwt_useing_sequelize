const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),

  transports: [
    // new winston.transports.Console(),
    // new winston.transports.File({ filename: 'fulllogs.log' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

logger.info('Starting,SHanu')

logger.error('Something went wrong', {
  error: new Error('Something went wrong'),
})
