import Sequelize from 'sequelize'
import { Campaign, CampaignNote, Character } from '../db/models.js'
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  }
})

const campaignFunctions = {
  getCampaigns: (req, res) => {
    if(req.session.user) {
      const {user_id} = req.session.user
  
      sequelize.query(`SELECT name, description, length, world_name FROM campaigns WHERE user_id = '${user_id}';`)
        .then(dbRes => {
          const campaigns = dbRes[0]
          res.status(200).send(campaigns)
        })
        .catch(() => {
          res.sendStatus(500)
        })
    } else {
      res.sendStatus(400)
    }
  },

  getCampaign: async (req, res) => {
    const {id} = req.params

    let campaign = (await Campaign.findOne({
      where: {campaign_id: id},
      attributes: ['campaign_id', 'name', 'length', 'description'],
      include: {
        model: Character,
        attributes: ['name', 'player', 'char_class']
      }
    })).toJSON()

    let {Characters: characters} = campaign

    let names = characters.map(char => char.name)

    delete campaign.Characters

    res.status(200).send({...campaign, characters: names})
  },

  createCampaign: (req, res) => {
    if(req.session.user) {
      const {user_id} = req.session.user
      const {name, description, length, world_name, note} = req.body

      if(!name) {
        res.status(401).send('You must provide all required info to create a campaign')
      } else {
        sequelize.query(`
          INSERT INTO campaigns (name, description, length, dungeon_master, world_name)
          VALUES ('${name}', '${description}', '${length}', '${user_id}', '${world_name}')
          RETURNING campaign_id;
        `)
        .then(dbRes => {
  
          if(note) {
            sequelize.query(`
              INSERT INTO campaign_notes (campaign_id, note)
              VALUES (${dbRes[0][0].campaign_id}, '${note}');
            `)
          }
  
          res.status(200).send('New campaign created!')
        })
      }

    } else {
      res.status(400).send('Unable to create campaign. Try again later.')
    }
  },

  deleteCampaign: async (req, res) => {
    const {id} = req.params

    let campaign = await Campaign.findByPk(id)

    if(campaign !== null) {
      if(req.session.user && req.session.user.user_id === campaign.dungeon_master) {
        await CampaignNote.destroy({where: {campaign_id: id}})
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