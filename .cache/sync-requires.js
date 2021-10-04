
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/workspaces/this-modern-web/.cache/dev-404-page.js"))
}

