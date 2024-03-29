import spellsDb from '../json/SRD_data/spells.json' assert {type: 'json'}

import {spells} from '../mongodb/collectionsFns.js'

const quickDB = spellsDb.map(spell => {
  const {index, name, desc, casting_time, range, level, school, classes, dc, url} = spell
  
  return {index, name, desc, casting_time, range, level, school, classes, dc, url}
})

const spellFunctions = {
  getAllSpells: async (req, res) => {
    const {name, casting_time, school, minLevel, maxLevel, classSelect} = req.query

    // if(name || casting_time || school || minLevel || maxLevel || classSelect) {
    //   let filtered = quickDB.filter(spell => {
    //     let keep = true

    //     if(name && !spell.name.toLowerCase().includes(name.toLowerCase())) {
    //       keep = false
    //     }

    //     if(casting_time && casting_time !== spell.casting_time) {
    //       keep = false
    //     }

    //     if(school && school !== spell.school.name) {
    //       keep = false
    //     }

    //     if(minLevel && +minLevel > spell.level) {
    //       keep = false
    //     }

    //     if(maxLevel && +maxLevel < spell.level) {
    //       keep = false
    //     }

    //     if(classSelect) {
    //       let classMatch = false

    //       spell.classes.forEach(e => {
    //         if(e.name === classSelect) {
    //           classMatch = true
    //         }
    //       })

    //       if(!classMatch) {
    //         keep = false
    //       }
    //     }

    //     return keep
    //   })

    //   return res.status(200).send(filtered)
    // }

    // res.status(200).send(quickDB)
    let spellsData = await spells.find()
    res.status(200).send(spellsData)
  },

  getSpell: (req, res) => {
    const {index} = req.params

    const spell = spellsDb[spellsDb.findIndex(e => e.index === index)]

    res.status(200).send(spell)
  }
}

export default spellFunctions

let keys = ['index', 'name', 'desc', 'higher_level', 'range', 'components', 'material', 'ritual', 'duration', 'concentration', 'casting_time', 'level', 'attack_type', 'damage', 'school', 'classes', 'subclasses', 'url', 'dc', 'heal_at_slot_level', 'area_of_effect']
let inconsistent = ['dc', 'heal_at_slot_level', 'area_of_effect', 'higher_level', 'material', 'attack_type', 'damage']
let classesAvail = ['Wizard', 'Sorcerer', 'Cleric', 'Paladin', 'Ranger', 'Bard', 'Druid',  'Warlock']