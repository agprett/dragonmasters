import bcrypt from 'bcryptjs'

import { User } from '../db/models.js'

const userFunctions = {
  getUser: (req, res) => {
    if(req.session.user) {
      const {username} = req.session.user
      res.status(200).send({username})
    } else {
      res.sendStatus(400)
    }
  },

  register: async (req, res) => {
    const {username, password} = req.body
    
    if(!username || !password) {
      res.status(400).send('Username and password need to be provided!')
    } else {
      const salt = bcrypt.genSaltSync(10)
      const passHash = bcrypt.hashSync(password, salt)

      const user = await User.findOne({where: {username}})

      if(!user) {
        const newUser = await User.create({
          username,
          password: passHash
        })

        const {user_id, username: dbUsername} = newUser
        req.session.user = {user_id, username: dbUsername}
        res.status(200).send({username: dbUsername})
      } else {
        res.status(400).send('Username already taken!')
      }
    }
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

export default userFunctions