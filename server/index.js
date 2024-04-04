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
const {getUser, registerUser, loginUser, logoutUser, deleteUser} = userFunctions

import campaignFunctions from './controllers/campaignController.js'
const {getCampaigns, getCampaign, createCampaign, updateCampaign, deleteCampaign, addCampaignNote} = campaignFunctions

import encounterFunctions from './controllers/encounterController.js'
const {getEncounters, getEncounter, createEncounter, updateEncounter, deleteEncounter} = encounterFunctions

import characterFunctions from './controllers/characterController.js'
const {getCharacters, getCharacter, createCharacter, deleteCharacter} = characterFunctions

import monsterFunctions from './controllers/monsterController.js'
const {getAllMonsters, getMonster} = monsterFunctions

import spellFunctions from './controllers/spellController.js'
const {getAllSpells, getSpell} = spellFunctions

const loginCheck = (req, res, next) => {
  if(req.session.user) {
    next()
  } else {
    res.status(403).send('Please login')
  }
}

app.get('/api/user', getUser)
app.post('/api/user/register', registerUser)
app.post('/api/user/login', loginUser)
app.post('/api/user/logout', logoutUser)
app.post('/api/user/delete', deleteUser)

app.get('/api/campaigns', loginCheck, getCampaigns)
app.get('/api/campaigns/:id', loginCheck, getCampaign)
app.post('/api/campaigns', loginCheck, createCampaign)
app.put('/api/campaigns', loginCheck, updateCampaign)
app.delete('/api/campaigns/:id', loginCheck, deleteCampaign)

app.post('/api/campaigns/note', loginCheck, addCampaignNote)

app.get('/api/encounters', loginCheck, getEncounters)
app.get('/api/encounters/:id', loginCheck, getEncounter)
app.post('/api/encounters', loginCheck, createEncounter)
app.put('/api/encounters', loginCheck, updateEncounter)
app.delete('/api/encounters/:id', loginCheck, deleteEncounter)

app.get('/api/characters', loginCheck, getCharacters)
app.get('/api/characters/:id', loginCheck, getCharacter)
app.post('/api/characters', loginCheck, createCharacter)
app.delete('/api/characters/:id', loginCheck, deleteCharacter)

app.get('/api/monsters/:index', getMonster)
app.get('/api/monsters', getAllMonsters)

app.get('/api/spells/:index', getSpell)
app.get('/api/spells', getAllSpells)

app.use(express.static(__dirname + '/../dist'))
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(SERVER_PORT, console.log(`Listening on port http://localhost:${SERVER_PORT}`))