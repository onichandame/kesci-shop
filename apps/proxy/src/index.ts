import { createProxyMiddleware } from 'http-proxy-middleware'
import Express from 'express'
import debug from 'debug'
import { config } from 'dotenv'

config()

const logger = debug(`Web:Proxy`)

const port = parseInt(process.env.PORT || '') || 3000

const app = Express()

// backend
app.use(
  createProxyMiddleware(`/graphql`, {
    target: `http://127.0.0.1:9002`,
    ws: true,
  })
)
// frontend
app.use(
  createProxyMiddleware(`/`, { target: `http://127.0.0.1:9001`, ws: true })
)

app.listen(port, () => {
  logger(`proxy listening on ${port}`)
})
