export default (ctx) => {
  if (ctx.route.path === '/plugin-redirect') {
    ctx.redirect('/plugin-redirect-done')
  }

  if (ctx.route.path === '/plugin-middleware-redirect') {
    ctx.redirect('/plugin-middleware-redirect-to')
  }
}
