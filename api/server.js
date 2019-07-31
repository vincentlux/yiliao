/*
 * https://medium.com/@olinations/build-a-crud-template-using-react-bootstrap-express-postgres-9f84cc444438
 */

const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

var db = require('knex')({
    client: 'pg',
    connection: {
        host : process.env.PGHOST,
        user : process.env.PGUSER,
        password : process.env.PGPASSWORD,
        database : process.env.PGDATABASE
    }
});

// use bcrypt to hash password
const bcrypt = require('bcrypt');


// test db connection serverside
// db.select('*').from('account')
//     .then(item => {
//         console.log(item)
//     })
//     .catch(err => console.log(err))

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
    } else {
        callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/testDBConn', (req, res) => main.testDBConn(req, res, db))
app.post('/auth', (req, res) => main.auth(req, res, db, bcrypt))

app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT || 3001}`)
})
