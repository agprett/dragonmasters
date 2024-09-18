import { Character } from '../db/models.js'

const characterFunctions = {
  getCharacters: async (req, res) => {
    const {user_id} = req.session.user
    
    let data = await Character.findAll({where: {user_id}, attributes: ['character_id', 'name', 'player', 'level', 'hit_points', 'armor_class']})

    let characters = data.map(character => {
      character.character_id = +character.character_id
      character.level = +character.level
      character.hit_points = +character.hit_points
      character.armor_class = +character.armor_class
      
      return character
    })

    res.status(200).send(characters)
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

  createCharacter: async (req, res) => {
    const {name, player, level, hit_points, race, char_class, armor_class} = req.body

    if(!name || !player || !hit_points) {
      res.status(400).send('You must provide all required info to create a character')
    } else {
      const {user_id} = req.session.user

      let newChar = await Character.create({name, player, level, hit_points, race, char_class, armor_class, user_id}, {fields: ['name', 'player', 'hit_points', 'level', 'race', 'char_class', 'armor_class', 'user_id']})

      res.status(200).send(`New character, ${newChar.name}, created!`)
    }
  },

  updateCharacter: async (req, res) => {
    let {name, player, armor_class, hit_points, level, id: character_id} = req.body

    if(req.session.user && name && player && armor_class && hit_points && level && character_id) {

      let characterInfo = {name, player, armor_class, hit_points, level}

      let character = await Character.findByPk(character_id, {
        attributes: ['user_id', 'name']
      })
      
      if(character.name) {
        console.log(character.user_id, req.session.user.user_id)
        if(character.user_id === req.session.user.user_id) {
          await Character.update(characterInfo, {where: {character_id: +character_id}})
    
          res.status(200).send({message: 'Character updated!'})
        } else {
          res.status(400).send('You must be signed in as the owner to update this character.')
        }
      } else {
        res.status(400).send('Character not found.')
      }
    } else {
      res.status(400).send('Please provide all required information to update this character.')
    }
  },

  deleteCharacter: async (req, res) => {
    const {id} = req.params

    let character = await Character.findByPk(id, {
      attributes: ['user_id']
    })
    
    console.log(character)
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