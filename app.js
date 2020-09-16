const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

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



app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
