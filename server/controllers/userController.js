import bcrypt from 'bcryptjs'

import { User } from '../db/models.js'

const userFunctions = {
  getUser: (req, res) => {
    if(req.session.user) {
      const {username} = req.session.user
      res.status(200).send({username})
    } else {
      res.status(401).send('Must sign in!')
    }
  },

  registerUser: async (req, res) => {
    const {username, password} = req.body
    
    if(!username || !password) {
      res.status(401).send('Username and password need to be provided!')
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
        res.status(403).send('Username already taken!')
      }
    }
  },

  loginUser: async (req, res) => {
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
          res.status(401).send('Username or password incorrect!')
        }
      } else {
        res.status(401).send('Username or password incorrect!')
      }
    } else {
      res.status(401).send('Must provide a username and password!')
    }
  },

  logoutUser: (req, res) => {
    req.session.user = null
    req.session.save((err) => {
      if(err) {
        res.status(500)
      } else {
        res.sendStatus(200)
      }
    })
  },

  deleteUser: async (req, res) => {
    const {username, password} = req.body

    if(req.session.user) {
      const user = await User.findOne({where: {username}})

      if(user && user.username === username) {
        let passCheck = bcrypt.compareSync(password, user.password)

        if(passCheck){
          await User.destroy({
            where: {
              username
            }
          })
          res.status(200).send('Account successfully deleted!')
        } else {
          res.status(401).send('Incorrect credentials. Could not delete account.')
        }
      } else {
        res.status(401).send('Incorrect credentials. Could not delete account.')
      }

    } else {
      res.status(403).send('Must be signed in as the user account being deleted.')
    }
  }
}

export default userFunctions