const monstersDB = require('../json/base_json_files/5e-monsters.json')

const quickDB = monstersDB.map(monster => {
  const {index, name, size, hit_points, armor_class, challenge_rating, xp, url} = monster

  // if(monster.actions) {
  //   monster.actions.forEach(action => {
  //     if(action.name === 'Multiattack') {
  //       console.log(action)
  //     }
  //   })
  // }

  return {index, name, size, hit_points, armor_class, challenge_rating, xp, url}
})

module.exports = {
  getAllMonsters: (req, res) => {
    const {name, size, challenge_rating} = req.query
    
    if(name || size || challenge_rating) {  
      let filtered = quickDB.filter(monster => {
        let keep = true
        
        if(name && !monster.name.toLowerCase().includes(name.toLowerCase())) {
          keep = false
        }
  
        if(size && monster.size !== size) {
          keep = false
        }
  
        if(challenge_rating && monster.challenge_rating < challenge_rating) {
          keep = false
        }
  
        return keep
      })

      return res.status(200).send(filtered)
    }
    
    res.status(200).send(quickDB)
  },

  getMonster: (req, res) => {
    const {index} = req.params

    const monster = monstersDB[monstersDB.findIndex(e => e.index === index)]

    res.status(200).send(monster)
  }
}