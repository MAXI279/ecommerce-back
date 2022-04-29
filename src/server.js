const env = require('./config/env.config')
const app = require('./index')
const process = require('process')
const cluster = require('cluster')
const logger = require('./logs')
const os = require('os')

const modoCluster = env.MODO_SRV === 'CLUSTER'

if (modoCluster && cluster.isPrimary) {
  const NUM_WORKERS = os.cpus().length
  // console.log(NUM_WORKERS)
  logger.info(` PRIMARY PID => ${process.pid}`)
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    logger.info(` Worker ${worker.process.pid} exitted`)
    cluster.fork()
  })
} else {
  const PORT = env.PORT || 8080

  const server = app.listen(PORT, () => {
    logger.info(`Servidor online en puerto ${PORT}`)
  })

  server.on('error', (error) => {
    logger.error(`Ha ocurrido un error, ${error.message}`)
  })
}
