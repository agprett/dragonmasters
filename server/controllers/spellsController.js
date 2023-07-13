const spellsDb = require('../json/base_json_files/5e-spells.json')

let keys = ['index', 'name', 'desc', 'higher_level', 'range', 'components', 'material', 'ritual', 'duration', 'concentration', 'casting_time', 'level', 'attack_type', 'damage', 'school', 'classes', 'subclasses', 'url', 'dc', 'heal_at_slot_level', 'area_of_effect']
let inconsistent = ['dc', 'heal_at_slot_level', 'area_of_effect', 'higher_level', 'material', 'attack_type', 'damage']
let classesAvail = ['Wizard', 'Sorcerer', 'Cleric', 'Paladin', 'Ranger', 'Bard', 'Druid',  'Warlock']

const quickDB = spellsDb.map(spell => {
  const {index, name, desc, casting_time, range, level, school, classes, dc, url} = spell
  
  return {index, name, desc, casting_time, range, level, school, classes, dc, url}
})


module.exports = {
  getAllSpells: (req, res) => {
    const {name, casting_time, school, minLevel, maxLevel, classSelect} = req.query

    if(name || casting_time || school || minLevel || maxLevel || classSelect) {
      let filtered = quickDB.filter(spell => {
        let keep = true

        if(name && !spell.name.toLowerCase().includes(name.toLowerCase())) {
          keep = false
        }

        if(casting_time && casting_time !== spell.casting_time) {
          keep = false
        }

        if(school && school !== spell.school) {
          keep = false
        }

        if(minLevel && +minLevel > spell.level) {
          keep = false
        }

        if(maxLevel && +maxLevel < spell.level) {
          keep = false
        }

        if(classSelect) {
          let classMatch = false

          spell.classes.forEach(e => {
            if(e.name === classSelect) {
              classMatch = true
            }
          })

          if(!classMatch) {
            keep = false
          }
        }

        return keep
      })

      return res.status(200).send(filtered)
    }

    res.status(200).send(quickDB)
  },

  getSpell: (req, res) => {
    const {index} = req.params

    const spell = spellsDb[spellsDb.findIndex(e => e.index === index)]

    res.status(200).send(spell)
  }
}