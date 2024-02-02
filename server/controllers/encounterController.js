import { Encounter, EncounterMonster, EncounterCharacter, Character } from '../db/models.js'

const encounterFunctions = {
  getEncounters: async (req, res) => {
    if(req.session.user){
      const {user_id} = req.session.user

      let data = await Encounter.findAll({where: {user_id}})

      if(data) {
        res.status(200).send(data)
      } else {
        res.sendStatus(400)
      }

    } else {
      res.sendStatus(400)
    }
  },

  getEncounter: async (req, res) => {
    if(req.session.user){
      const {user_id} = req.session.user
      const {id} = req.params
  
      let encounter = await Encounter.findOne({where: {encounter_id: id, user_id}, include: [
        {
          model: EncounterMonster,
          as: 'monsters'
        },
        {
          model: Character,
          as: 'players'
        }
      ]})
      console.log(encounter)

      if(encounter.name) {
        res.status(200).send(encounter)
      } else {
        res.sendStatus(400)
      }
    } else {
      res.sendStatus(400)
    }

  },

  createEncounter: async (req, res) => {
    let {name, shortDesc: short_description, desc, terrain, location, rewards, campaign_id, characters, monsters} = req.body

    if(req.session.user && name && short_description) {
      const {user_id} = req.session.user
      
      let otherMonsters = []

      for(let monster in monsters) {
        let {name, amount, url, info} = monsters[monster]
        otherMonsters.push({name, count: amount, url, pointer: info.pointer})
      }

      let newEncounter = await Encounter.create({
        user_id,
        name,
        description: desc,
        short_description,
        terrain,
        location,
        rewards,
        monsters: otherMonsters,
        characters: characters.map(char => {return {character_id: char.character_id}})
      }, {
        include: [{
          model: EncounterMonster,
          as: 'monsters'
        }, {
          model: EncounterCharacter,
          as: 'characters'
        }]
      })

      if(newEncounter.name) {
        res.status(200).send('New encounter created!')
      } else {
        res.status(500).send('Unable to proccess request.')
      }
    } else {
      res.status(400).send('Must send all required data to create a new encounter')
    }
  },

  updateEncounter: async (req, res) => {
    let {name, shortDesc: short_description, desc, terrain, location, rewards, campaign_id, characters, monsters, id} = req.body

    if(req.name && short_description && req.session.user, id) {
      let encounterInfo = {name, short_description, desc, terrain, location, rewards}

      await Encounter.update(encounterInfo, {where: {encounter_id: id}})

      await EncounterMonster.destroy({where: {encounter_id: id}})
      await EncounterCharacter.destroy({where: {encounter_id: id}})

      await EncounterMonster.bulkCreate(monsters.map(monster => {return {...monster, encounter_id: id}}))
      await EncounterCharacter.bulkCreate(characters.map(character => {return {...character, encounter_id: id}}))

      res.status(200).send('Encounter updated')
    } else {
      res.status(400).send('Please provide all required information to update the encounter.')
    }
  }
}

export default encounterFunctions