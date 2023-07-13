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
  
      sequelize.query(`SELECT * FROM campaigns WHERE user_id = '${user_id}';`)
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
      const {title, description, camp_length, notes} = req.body

      sequelize.query(`
        INSERT INTO campaigns (user_id, title, description, camp_length)
        VALUES ('${user_id}', '${title}', '${description}', '${camp_length}')
        RETURNING campaign_id;
      `)
        .then(dbRes => {
          console.log(dbRes)
          if(notes[0]) {
            // notes.forEach(note => {
            //   sequelize.query(`
            //     INSERT INTO campaign_notes (campaign_id, user_id, note)
            //     VALUES ()
            //   `)
            // })
          }

          res.status(200).send('Campaign Created!')
        })
    } else {
      res.status(400).send('Unable to create campaign. Try again later.')
    }
  },

  addCampaignNote: (req, res) => {
    const {campaign_id} = req.body

    if(campaign_id) {
      console.log('working')
      res.status(200).send('Note(s) added')
    } else {
      res.status(400).send('Note must be tied to valid campaign!')
    }
  }      
}