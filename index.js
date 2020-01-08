// require important modules
const express = require('express')
const bodyParser = require('body-parser')

// require routes
const postsRouter = require('./routes/posts')
const categoriesRouter = require('./routes/categories')
const tagsRouter = require('./routes/tags')
const usersRouter = require('./routes/users')

// create our App
const app = express()
const port = process.env.PORT || 5000

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// require the connection (DB)
const db = require('./config/database')

// Home Page
app.get('/', (req,res) => {
  res.send('hello awesomes!')
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api/v1/
app.use('/api/v1/', postsRouter)
app.use('/api/v1/', categoriesRouter)
app.use('/api/v1/', tagsRouter)
app.use('/api/v1/', usersRouter) // /api/v1/users

// Testing the connection
db
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })

// START THE SERVER
app.listen(port, () => console.log(`server running on port ${port}`))