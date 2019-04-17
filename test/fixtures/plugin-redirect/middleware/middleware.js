export default function ({ route, redirect }) {
  // Plugin middleware mixed redirect
  if (route.path === '/plugin-middleware-redirect-to') {
    redirect('/plugin-middleware-redirect-done')
  }
}
