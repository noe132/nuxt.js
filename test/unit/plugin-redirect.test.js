import consola from 'consola'
import { loadFixture, getPort, Nuxt } from '../utils'

let nuxt, port
const url = route => 'http://localhost:' + port + route

const renderRoute = async (_url) => {
  const window = await nuxt.server.renderAndGetWindow(url(_url))
  const head = window.document.head.innerHTML
  const html = window.document.body.innerHTML
  return { window, head, html }
}

describe('plugin-redirect', () => {
  beforeAll(async () => {
    const config = await loadFixture('plugin-redirect')
    nuxt = new Nuxt(config)
    await nuxt.ready()

    port = await getPort()
    await nuxt.server.listen(port, 'localhost')
  })

  test('/plugin-redirect (plugin redirect)', async () => {
    const { html } = await renderRoute('/plugin-redirect')
    expect(html).toContain('<div>Plugin Redirect Done Page</div>')
    expect(consola.log).toHaveBeenCalledWith('plugin redirect done mounted')
    expect(consola.log).toHaveBeenCalledTimes(1)
    consola.log.mockClear()
  })

  test('/plugin-redirect-done (no redirect)', async () => {
    const { html } = await renderRoute('/plugin-redirect-done')
    expect(html).toContain('<div>Plugin Redirect Done Page</div>')
    expect(consola.log).toHaveBeenCalledWith('plugin redirect done mounted')
    expect(consola.log).toHaveBeenCalledTimes(1)
    consola.log.mockClear()
  })

  test('/plugin-middleware-redirect (plugin and middleware redirect)', async () => {
    const { html } = await renderRoute('/plugin-middleware-redirect')
    expect(html).toContain('<div>Plugin Middleware Redirect Done Page</div>')
    expect(consola.log).toHaveBeenCalledWith('plugin middleware redirect done mounted')
    expect(consola.log).toHaveBeenCalledTimes(1)
    consola.log.mockClear()
  })

  test('/plugin-middleware-redirect-to (middleware redirect)', async () => {
    const { html } = await renderRoute('/plugin-middleware-redirect-to')
    expect(html).toContain('<div>Plugin Middleware Redirect Done Page</div>')
    expect(consola.log).toHaveBeenCalledWith('plugin middleware redirect done mounted')
    expect(consola.log).toHaveBeenCalledTimes(1)
    consola.log.mockClear()
  })

  test('/plugin-middleware-redirect-done (no redirect)', async () => {
    const { html } = await renderRoute('/plugin-middleware-redirect-done')
    expect(html).toContain('<div>Plugin Middleware Redirect Done Page</div>')
    expect(consola.log).toHaveBeenCalledWith('plugin middleware redirect done mounted')
    expect(consola.log).toHaveBeenCalledTimes(1)
    consola.log.mockClear()
  })

  // Close server and ask nuxt to stop listening to file changes
  afterAll(async () => {
    await nuxt.close()
  })
})
