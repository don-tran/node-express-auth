'use strict'
const
  app = require('./app'),
  port = process.env.PORT || 3000,
  server = app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
  }),
  terminatedSignals = ['SIGUSR2', 'SIGTERM', 'SIGINT']

terminatedSignals.forEach((sig) => {
  process.on(sig, () => {
    console.log(`Server terminated with ${sig}`)
    close()
  })
})

function close() {
  server.close((err) => {
    process.exit(err ? 1 : 0)
  })
}
