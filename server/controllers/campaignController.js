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
        },
        as: 'characters'
      }
    })

    res.status(200).send(campaigns)
  },

  getCampaign: async (req, res) => {
    const {id} = req.params

    try {
      let campaign = await Campaign.findOne({
        where: {campaign_id: id},
        attributes: ['campaign_id', 'name', 'length', 'description'],
        include: {
          model: Character,
          attributes: ['name', 'player', 'char_class'],
          through: {
            attributes: []
          },
          as: 'characters'
        }
      })
  
      if(campaign.dungeon_master === req.session.user.user_id) {
        res.status(200).send(campaign)
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
    const {name, description, length, world_name, note} = req.body

    if(name && req.session.user) {
      let newCampaign = await Campaign.create({
        name,
        description,
        length,
        dungeon_master: user_id,
        world_name
      },
      {
        include: [
          {
            model: Encounter
          },
          {
            model: CampaignCharacter,
            as: 'characters'
          }
        ]
      })
      
      if(newCampaign.name) {
        res.status(200).send('New campaign created!')
      } else {
        res.status(500).send('Unable to process request.')
      }
    } else {
      res.status(401).send('You must provide all required info to create a campaign')
    }
  },

  updateCampaign: async (req, res) => {
    
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