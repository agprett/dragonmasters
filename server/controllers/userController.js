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

  login: async (req, res) => {
    const {username, password} = req.body

    if(username && password) {
      const user = await User.findOne({where: {username}})

      if(user) {
        let passCheck = bcrypt.compareSync(password, user.password)

        if(passCheck){
          const {user_id, username: dbUsername} = user
          req.session.user = {user_id, username: dbUsername}
          res.status(200).send({username: dbUsername})
        } else {
          res.status(400).send('Username or password incorrect!')
        }
      } else {
        res.status(400).send('Username or password incorrect!')
      }
    } else {
      res.status(400).send('Must provide a username and password!')
    }
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