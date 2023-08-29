import express from 'express'
import session from 'express-session'
import path from 'path'
import url from 'url'
import cors from 'cors'

import 'dotenv/config'

const {SERVER_PORT, SESSION_SECRET} = process.env
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()

app.use(cors())
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  cookie: {maxAge: (1000 * 60 * 60 * 24 * 7), sameSite: true},
  resave: true,
  saveUninitialized: true
}))

import userFunctions from './controllers/userController.js'
const {getUser, register, login, logout} = userFunctions

import encounterFunctions from './controllers/encounterController.js'
const {getEncounters, getEncounter, createEncounter} = encounterFunctions

import characterFunctions from './controllers/characterController.js'
const {getCharacters} = characterFunctions

import monsterFunctions from './controllers/monsterController.js'
const {getAllMonsters, getMonster} = monsterFunctions

import spellFunctions from './controllers/spellController.js'
const {getAllSpells, getSpell} = spellFunctions

app.get('/api/user', getUser)
app.post('/api/register', register)
app.post('/api/login', login)
app.post('/api/logout', logout)

// app.get('/api/campaign', getCampaign)

app.get('/api/encounters', getEncounters)
app.get('/api/encounters/:id', getEncounter)
app.post('/api/encounters', createEncounter)

app.get('/api/characters', getCharacters)

app.get('/api/monsters/:index', getMonster)
app.get('/api/monsters', getAllMonsters)

app.get('/api/spells/:index', getSpell)
app.get('/api/spells', getAllSpells)

app.use(express.static(__dirname + '/../dist'))
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(SERVER_PORT, console.log(`Listening on port ${SERVER_PORT}`))