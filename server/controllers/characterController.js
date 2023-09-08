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
  getCharacters: (req, res) => {
    if(req.session.user) {
      const {user_id} = req.session.user
      
      sequelize.query(`
        SELECT character_id, name, player, level, hit_points FROM characters
        WHERE user_id = '${user_id}';
      `)
      .then(dbRes => {
        let characters = dbRes[0].map(character => {
          character.character_id = +character.character_id
          character.level = +character.level
          character.hit_points = +character.hit_points
          
          return character
        })

        res.status(200).send(characters)
      })
      .catch(err => {
        res.sendStatus(500)
      })
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
  }
}

export default characterFunctions