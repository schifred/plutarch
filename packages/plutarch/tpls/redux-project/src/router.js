if (process.env.NODE_ENV === 'production') {
  module.exports = require('./routes/router.prod')
} else {
  module.exports = require('./routes/router.dev')
}
