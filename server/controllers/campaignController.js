const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  }
})

module.exports = {
  getCampaign: (req, res) => {
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

  createCampaign: (req, res) => {
    if(req.session.user) {
      const {user_id} = req.session.user
      const {name, description, length, dungeon_master, world_name, note} = req.body

      sequelize.query(`
        INSERT INTO campaigns (user_id, name, description, length, dungeon_master, world_name)
        VALUES ('${user_id}', '${name}', '${description}', '${length}', '${dungeon_master}', '${world_name}')
        RETRUNING campaign_id;
      `)
      .then(dbRes => {
        console.log(dbRes)

        if(note) {
          sequelize.query(`
            INSERT INTO campaign_notes (campaign_id, user_id, note)
            VALUES (${dbRes[0][0].campaign_id}, '${user_id}', '${note}')
          `)
        }

        res.status(200).send('Campaign created!')
      })

    } else {
      res.status(400).send('Unable to create campaign. Try again later.')
    }
  },

  addCampaignNote: (req, res) => {
    const {campaign_id, note} = req.body

    if(campaign_id) {
      console.log('working')
      res.status(200).send('Note(s) added')
    } else {
      res.status(400).send('Note must be tied to valid campaign!')
    }
  }      
}