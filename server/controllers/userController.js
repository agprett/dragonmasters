const bcrypt = require('bcryptjs')
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
  getUser: (req, res) => {
    if(req.session.user) {
      const {username} = req.session.user
      res.status(200).send({username})
    } else {
      res.sendStatus(400)
    }
  },

  signup: (req, res) => {
    const {username, password} = req.body

    const salt = bcrypt.genSaltSync(10)
    const passHash = bcrypt.hashSync(password, salt)

    sequelize.query(`SELECT username FROM users WHERE username = '${username}';`)
      .then(dbRes => {
        if(dbRes[0][0]){
          res.sendStatus(400)
        } else {
          sequelize.query(`INSERT INTO users (username, password) VALUES ('${username}', '${passHash}') RETURNING user_id, username;`)
            .then(dbRes => {
              const {user_id, username: dbUsername} = dbRes[0][0]
              req.session.user = {user_id, username: dbUsername}
              res.status(200).send({username: dbUsername})
            })
            .catch(() => res.sendStatus(500))
        }
      })
  },

  login: (req, res) => {
    const {username, password} = req.body

    sequelize.query(`SELECT * FROM users WHERE username = '${username}';`)
      .then(dbRes => {
        if(dbRes[1].rowCount){
          let passCheck = bcrypt.compareSync(password, dbRes[0][0].password)
          if(passCheck){
            const {user_id, username: dbUsername} = dbRes[0][0]
            req.session.user = {user_id, username: dbUsername}
            res.status(200).send({username: dbUsername})
          } else {
            res.sendStatus(400)
          }
        } else {
          res.sendStatus(400)
        }
      })
      .catch(() => {
        res.sendStatus(500)
      })
  },

  logout: (req, res) => {
    req.session.user = null
    req.session.save((err) => {
      if(err) {
        res.status(500)
      } else {
        res.sendStatus(200)
      }
    })
  }
}