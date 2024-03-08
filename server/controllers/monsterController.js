import monstersDB from '../json/SRD_data/monsters.json' assert {type: 'json'}

let pointers = {}
const quickDB = monstersDB.map(monster => {
  const {index, name, size, hit_points, armor_class, challenge_rating, xp, pointer, url} = monster
  pointers[index] = pointer

  return {index, name, size, hit_points, armor_class, challenge_rating, xp, pointer, url}
})

const monsterFunctions = {
  getAllMonsters: (req, res) => {
    const {name, size, challenge_rating_min, challenge_rating_max, alignment, full} = req.query

    let data = quickDB
    
    if(full) {
      data = monstersDB
    }
    
    if(name || size || challenge_rating_min || challenge_rating_max || alignment) {  
      let filtered = data.filter(monster => {
        let keep = true
        
        if(name && !monster.name.toLowerCase().includes(name.toLowerCase())) {
          keep = false
        }
  
        if(size && monster.size !== size) {
          keep = false
        }
  
        if(challenge_rating_min && monster.challenge_rating < challenge_rating_min) {
          keep = false
        }

        if(challenge_rating_max && monster.challenge_rating >= challenge_rating_max) {
          keep = false
        }

        if(alignment && monster.alignment !== alignment) {
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

    const monster = monstersDB[pointers[index]]

    res.status(200).send(monster)
  }
}

export default monsterFunctions