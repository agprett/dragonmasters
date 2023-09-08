import Sequelize from 'sequelize'
const {CONNECTION_STRING} = process.env

import { Character } from '../db/models.js'

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  }
})

const characterFunctions = {
  getCharacters: async (req, res) => {
    if(req.session.user) {
      const {user_id} = req.session.user
      
      let data = await Character.findAll({where: {user_id}, attributes: ['character_id', 'name', 'player', 'level', 'hit_points']})

      let characters = data.map(character => {
        character.character_id = +character.character_id
        character.level = +character.level
        character.hit_points = +character.hit_points
        
        return character
      })

      res.status(200).send(characters)
    } else {
      res.status(400).send('You must be signed in to view your characters!')
    }
  },

  createCharacter: async (req, res) => {
    const {name, player, level, hit_points, race, char_class, armor_class} = req.body

    if(req.session.user) {
      if(!name || !player || !hit_points) {
        res.status(400).send('You must provide all required info to create a character')
      } else {
        const {user_id} = req.session.user
  
        let newChar = await Character.create({name, player, level, hit_points, race, char_class, armor_class, user_id}, {fields: ['name', 'player', 'hit_points', 'level', 'race', 'char_class', 'armor_class', 'user_id']})

        res.status(200).send(`New character, ${newChar.name}, created!`)
      }
    } else {
      res.status(401).send('You must be signed in to create a character!')
    }
  },

  getCharacter: async (req, res) => {
    const {id} = req.params

    let character = await Character.findOne({where: {character_id: id}, attributes: ['character_id', 'player', 'name', 'hit_points', 'level', 'race', 'armor_class', 'char_class']})

    if(character !== null) {
      res.status(200).send(character)
    } else {
      res.status(404).send('Character was not found')
    }
  },

  deleteCharacter: async (req, res) => {
    const {id} = req.params

    let character = await Character.findByPk(id)

    if(character !== null) {
      if(req.session.user && req.session.user.user_id === character.user_id) {
        await Character.destroy({where: {character_id: id}})
        res.status(200).send('Successfully deleted character!')
      } else {
        res.status(403).send('You must be signed in as the creator to delete this character!')
      }
    } else {
      res.status(404).send('Character was not found')
    }
  }
}

export default characterFunctions