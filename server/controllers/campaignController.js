import { Op } from 'sequelize'
import { Campaign, CampaignCharacter, CampaignNote, Character, Encounter } from '../db/models.js'

const campaignFunctions = {
  getCampaigns: async (req, res) => {
    const {user_id} = req.session.user

    let campaigns = await Campaign.findAll({
      where: {dungeon_master: user_id},
      attributes: ['campaign_id', 'name', 'length', 'description'],
      include: {
        model: Character,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })

    res.status(200).send(campaigns)
  },

  getCampaign: async (req, res) => {
    const {id} = req.params

    try {
      let campaign = await Campaign.findOne({
        where: {campaign_id: id},
        attributes: ['campaign_id', 'name', 'length', 'description', 'world_name', 'dungeon_master'],
        include: [
          {
            model: Character,
            attributes: ['name', 'player', 'char_class', 'hit_points', 'armor_class', 'character_id'],
            through: {
              attributes: []
            }
          },
          {
            model: Encounter,
            attributes: ['encounter_id', 'name', 'short_description', 'location']
          }
        ]
      })
  
      if(campaign.dungeon_master === req.session.user.user_id) {
        const {campaign_id, name, length, description, world_name, character_id, Characters, Encounters} = campaign
        let data = {campaign_id, name, length, world_name, character_id, description, Characters, Encounters}

        res.status(200).send(data)
      } else {
        res.status(403).send('You must be signed in to view this campaign.')
      }
    }
    catch {
      res.status(500).send('Unable to retrieve campaign.')
    }
  },

  createCampaign: async (req, res) => {
    const {user_id} = req.session.user
    const {name, description, length, world_name, note, addedPlayers: characters, addedEncounters} = req.body

    if(name && req.session.user) {
      let newCampaign = await Campaign.create({
        name,
        description,
        length,
        dungeon_master: user_id,
        world_name,
        characters
      },
      {
        include: [
          {
            model: CampaignCharacter,
            as: 'characters'
          }
        ]
      })

      Encounter.update({campaign_id: newCampaign.campaign_id},{
          where: {
            encounter_id: addedEncounters
          }
        }
      )
      
      if(newCampaign.name) {
        res.status(200).send({message: 'New campaign created!', id: newCampaign.campaign_id})
      } else {
        res.status(500).send('Unable to process request.')
      }
    } else {
      res.status(401).send('You must provide all required info to create a campaign')
    }
  },

  updateCampaign: async (req, res) => {
    let {id, name, description, length, world_name, addedPlayers, addedEncounters} = req.body

    if(name && id && req.session.user) {
      let campaignInfo = {name, description, length, world_name}

      await Encounter.update({campaign_id: null}, {where: {campaign_id: id}})
      await Encounter.update({campaign_id: id}, {where: {encounter_id: addedEncounters}})

      await Campaign.update(campaignInfo, {where: {campaign_id: id}})

      await CampaignCharacter.destroy({where: {campaign_id: id}})

      await CampaignCharacter.bulkCreate(addedPlayers.map(player => {return {...player, campaign_id: id}}))

      res.status(200).send({message: 'Campaign updated!', id})
    } else {
      res.status(400).send('Please provide all required information to update the campaign.')
    }
  },

  deleteCampaign: async (req, res) => {
    const {id} = req.params

    let campaign = await Campaign.findByPk(id)

    if(campaign !== null) {
      if(req.session.user && req.session.user.user_id === campaign.dungeon_master) {
        await CampaignNote.destroy({where: {campaign_id: id}})
        await CampaignCharacter.destroy({where: {campaign_id: id}})
        await Campaign.destroy({where: {campaign_id: id}})
        res.status(200).send('Deleted campaign')
      } else {
        res.status(403).send('You must be signed in as the creator to delete this character')
      }
    } else {
      res.status(404).send('Campaign was not found')
    }
  },

  addCampaignNote: async (req, res) => {
    const {user_id} = req.session.user
    const {campaign_id, note} = req.body

    const campaignInfo = await Campaign.findOne({attributes: ['dungeon_master'], where: {campaign_id}})

    if(campaign_id) {
      if(user_id === campaignInfo.dungeon_master) {
        await CampaignNote.create({campaign_id, note})
        res.status(200).send('Note(s) added')
      } else {
        res.status(401).send('Must be signed in as the owner of this campaign to add a note!')
      }
    } else {
      res.status(400).send('Note must be tied to valid campaign!')
    }
  },

  deleteCampaignNote: async (req, res) => {
    const {id} = req.params

    let note = await CampaignNote.findByPk(id)

    if(note !== null) {
      await CampaignNote.destroy({where: {note_id: id}})
      res.status(200).send('Note deleted')
    } else {
      res.status(404).send('The selected note was not found')
    }
  },
}

export default campaignFunctions 