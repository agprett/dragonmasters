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
  getPlayers: (req, res) => {
    if(req.session.user) {
      const {user_id} = req.session.user
      
      sequelize.query(`
        SELECT character_id, name, player, level, hit_points, temp_hit_points FROM characters
        WHERE user_id = '${user_id}';
      `)
      .then(dbRes => {
        res.status(200).send(dbRes[0])
      })
      .catch(err => {
        res.sendStatus(500)
      })
    } else {
      res.status(400).send('Must be signed in to view this!')
    }
  }
}