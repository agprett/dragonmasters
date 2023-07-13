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
      res.status(400).send('Must be signed in to view this!')
    }
  },

  createCharacter: (req, res) => {
    const {user_id} = req.session.user
    const {name, player, level, hp} = req.body

    if(name && player && level && hp) {
      sequelize.query(`
        INSERT INTO characters (user_id, name, player, level, hit_points)
        VALUES ('${user_id}', '${name}', '${player}', ${level}, ${hp});
      `)
        .then(dbRes => {
          return res.sendStatus(200)
        })
        .catch(err => {
          console.log(err)
          return res.status(400).send('Could not create character')
        })
      res.status(500).send('Unable to create character.')
    }
  }
}