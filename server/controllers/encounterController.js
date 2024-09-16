import { Encounter, EncounterMonster, EncounterCharacter, Character, Campaign } from '../db/models.js'

import monstersDB from '../json/SRD_data/monsters.json' assert {type: 'json'}

const encounterFunctions = {
  getEncounters: async (req, res) => {
    if(req.session.user){
      const {filter} = req.query
      const {user_id} = req.session.user

      let data = await Encounter.findAll({
        where: {user_id},
        include: Campaign
      })

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
  
      let encounterData = await Encounter.findOne({
        where: {encounter_id: id, user_id},
        include: [
          {
            model: EncounterMonster,
            as: 'monsters'
          },
          {
            model: Character,
            as: 'players'
          },
          {
            model: Campaign,
            attributes: ['name', 'campaign_id'],
            required: false
          }
        ]
      })

      const {encounter_id, name, description, short_description, terrain, location, rewards, players} = encounterData
      
      const monsters = encounterData.monsters.map(monster => {
        return {id: monster.id, ...monstersDB[monster.pointer], count: monster.count}
      })
      
      const encounter = {encounter_id, name, description, short_description, terrain, location, rewards, campaign: encounterData.Campaign || {campaign_id: '', name: ''}, players, monsters}

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
        let {name, count, url, pointer} = monsters[monster]
        otherMonsters.push({name, count, url, pointer})
      }

      let encounterInfo = {
        user_id,
        name,
        description: desc,
        short_description,
        terrain,
        location,
        rewards,
        monsters: otherMonsters,
        characters: characters.map(char => {return {character_id: char.character_id}})
      }

      if(campaign_id) {
        encounterInfo.campaign_id = campaign_id
      }

      let newEncounter = await Encounter.create(encounterInfo, {
        include: [{
          model: EncounterMonster,
          as: 'monsters'
        }, {
          model: EncounterCharacter,
          as: 'characters'
        }]
      })

      if(newEncounter.name) {
        res.status(200).send({message: 'New encounter created!', id: newEncounter.encounter_id})
      } else {
        res.status(500).send('Unable to process request.')
      }
    } else {
      res.status(400).send('Must send all required data to create a new encounter')
    }
  },

  updateEncounter: async (req, res) => {
    let {name, shortDesc: short_description, desc: description, terrain, location, rewards, campaign_id, characters, monsters, id} = req.body

    if(name && short_description && req.session.user && id) {
      let encounterInfo = {name, short_description, description, terrain, location, rewards}

      if(campaign_id) {
        encounterInfo.campaign_id = campaign_id
      }

      await Encounter.update(encounterInfo, {where: {encounter_id: id}})

      await EncounterMonster.destroy({where: {encounter_id: id}})
      await EncounterCharacter.destroy({where: {encounter_id: id}})

      await EncounterMonster.bulkCreate(monsters.map(monster => {return {...monster, encounter_id: id}}))
      await EncounterCharacter.bulkCreate(characters.map(character => {return {...character, encounter_id: id}}))

      res.status(200).send({message: 'Encounter updated', id})
    } else {
      res.status(400).send('Please provide all required information to update the encounter.')
    }
  },
  
  deleteEncounter: async (req, res) => {
    const {id} = req.params

    let encounter = await Encounter.findByPk(id, {
      attributes: ['user_id']
    })

    if(encounter !== null) {
      if(req.session.user && req.session.user.user_id === encounter.user_id) {
        await EncounterCharacter.destroy({where: {encounter_id: id}})
        await EncounterMonster.destroy({where: {encounter_id: id}})
        await Encounter.destroy({where: {encounter_id: id}})

        res.status(200).send('Deleted encounter')
      } else {
        res.status(400).send('You must be signed in to delete this encounter!')
      }
    } else {
      res.status(400).send('Encounter not found')
    }
  }
}

export default encounterFunctions