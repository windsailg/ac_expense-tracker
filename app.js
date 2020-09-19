const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3001

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

require('./config/mongoose')

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})
