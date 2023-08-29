const express = require('express')
let session = require('express-session')
const path = require('path')

require('dotenv').config()

const {SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  cookie: {maxAge: (1000 * 60 * 60 * 24 * 7), sameSite: true},
  resave: true,
  saveUninitialized: true
}))

const {getUser, register, login, logout} = require('./controllers/userController')
const {getCampaign} = require('./controllers/campaignController')
const {getEncounters, getEncounter, createEncounter} = require('./controllers/encounterController')
const {getCharacters} = require('./controllers/charactersController')
const {getAllMonsters, getMonster} = require('./controllers/monsterController')
const {getAllSpells, getSpell} = require('./controllers/spellsController')

app.get('/api/user', getUser)
app.post('/api/register', register)
app.post('/api/login', login)
app.post('/api/logout', logout)

app.get('/api/campaign', getCampaign)

app.get('/api/encounters', getEncounters)
app.get('/api/encounters/:id', getEncounter)
app.post('/api/encounters', createEncounter)

app.get('/api/characters', getCharacters)

app.get('/api/monsters/:index', getMonster)
app.get('/api/monsters', getAllMonsters)

app.get('/api/spells/:index', getSpell)
app.get('/api/spells', getAllSpells)

app.use(express.static(__dirname + '/../dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(SERVER_PORT, console.log(`Listening on port ${SERVER_PORT}`))