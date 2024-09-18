import { NPC } from '../db/models.js'

const npcFunctions = {
  getNPCs: async (req, res) => {
    const {user_id} = req.session.user
    
    let data = await NPC.findAll({where: {user_id}, attributes: ['npc_id', 'name', 'hit_points', 'armor_class']})

    let npcs = data.map(npc => {
      npc.npc_id = +npc.npc_id
      npc.hit_points = +npc.hit_points
      npc.armor_class = +npc.armor_class
      
      return npc
    })

    res.status(200).send(npcs)
  },

  getNPC: async (req, res) => {
    const {id} = req.params

    let npc = await NPC.findOne({where: {npc_id: id}, attributes: ['npc_id', 'name', 'hit_points', 'armor_class']})

    if(npc !== null) {
      res.status(200).send(npc)
    } else {
      res.status(404).send('NPC was not found')
    }
  },

  createNPC: async (req, res) => {
    const {name,  hit_points, armor_class} = req.body

    if(!name || !hit_points) {
      res.status(400).send('You must provide all required info to create an npc')
    } else {
      const {user_id} = req.session.user

      let newNPC = await NPC.create({name, hit_points, armor_class, user_id}, {fields: ['name', 'hit_points', 'armor_class', 'user_id']})

      res.status(200).send(`New NPC, ${newNPC.name}, created!`)
    }
  },

  updateNPC: async (req, res) => {
    let {name, armor_class, hit_points, id: npc_id} = req.body

    if(req.session.user && name && armor_class && hit_points && npc_id) {

      let npcInfo = {name, armor_class, hit_points}

      let npc = await NPC.findByPk(npc_id, {
        attributes: ['user_id', 'name']
      })

      if(npc.name) {
        if(npc.user_id === req.session.user.user_id) {
          await NPC.update(npcInfo, {where: {npc_id: npc_id}})
    
          res.status(200).send({message: 'NPC updated!'})
        } else {
          res.status(400).send('You must be signed in as the owner to update this NPC.')
        }
      } else {
        res.status(400).send('NPC not found')
      }
    } else {
      res.status(400).send('Please provide all required information to update this NPC.')
    }
  },

  deleteNPC: async (req, res) => {
    const {id} = req.params

    let npc = await NPC.findByPk(id, {
      attributes: ['user_id']
    })
    
    console.log(npc)
    if(npc !== null) {
      if(req.session.user && req.session.user.user_id === npc.user_id) {
        await NPC.destroy({where: {npc_id: id}})
        res.status(200).send('Successfully deleted NPC!')
      } else {
        res.status(403).send('You must be signed in as the creator to delete this NPC!')
      }
    } else {
      res.status(404).send('NPC was not found')
    }
  }
}

export default npcFunctions