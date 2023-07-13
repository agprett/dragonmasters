const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env
const monstersDB = require('../json/base_json_files/5e-monsters')

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  }
})

module.exports = {
  getEncounters: (req, res) => {
    if(req.session.user){
      const {user_id} = req.session.user

      sequelize.query(`
        SELECT name, encounter_id, short_description FROM encounters
        WHERE user_id = '${user_id}';
      `)
        .then(dbRes => {
          res.status(200).send(dbRes[0])
        })
    } else {
      res.sendStatus(400)
    }
  },

  getEncounter: (req, res) => {
    if(req.session.user){
      const {user_id} = req.session.user
      const {id} = req.params
  
      sequelize.query(`
        SELECT encounter_id, name, short_description, description FROM encounters
        WHERE user_id = '${user_id}' AND encounter_id = ${+id};

        SELECT id, name, count, encounter_id FROM encounter_monsters
        WHERE encounter_id = ${+id};

        SELECT c.character_id, c.name, c.player, c.level, c.hit_points
        FROM encounter_characters e
        JOIN characters c
        ON e.character_id = c.character_id
        WHERE e.encounter_id = ${+id};
      `)
        .then(dbRes => {
          const encounter = dbRes[1][0].rows[0]

          encounter.monsters = dbRes[1][1].rows.map(monster => {
            monster.count = +monster.count
            const index = monstersDB.findIndex(element => element.name === monster.name)

            let monsterInfo = monstersDB[index]

            return {...monster, info: monsterInfo}
          });

          encounter.players = dbRes[1][2].rows

          res.status(200).send(encounter)
        })
    } else {
      res.sendStatus(400)
    }

  },

  createEncounter: (req, res) => {
    let {name, shortDesc, desc, characters,  monsters} = req.body
    if(req.session.user && name && shortDesc && characters[0] && Object.keys(monsters).length) {
      const {user_id} = req.session.user

      desc = desc ? desc : 'None'
      
      sequelize.query(`INSERT INTO encounters (user_id, name, short_description, description)
      VALUES ('${user_id}', $$${name}$$, $$${shortDesc}$$, $$${desc}$$)
      RETURNING encounter_id;`)
        .then((dbRes) => {
          const {encounter_id} = dbRes[0][0]
          let monstersValues = []
          
          for(let monster in monsters) {
              const {name, url, amount} = monsters[monster]
              monstersValues.push(`($$${name}$$, $$${url}$$, ${amount}, ${encounter_id})`)
            }
            
          let characterValues = characters.map(char => {
            return `(${encounter_id}, ${char.character_id})`
          })
          
          console.log(monstersValues.join(', '))
          console.log(characterValues.join(', '))
          
          sequelize.query(`
            INSERT INTO encounter_characters (encounter_id, character_id)
            VALUES ${characterValues.join(', ')};

            INSERT INTO encounter_monsters (name, url, count, encounter_id)
            VALUES ${monstersValues.join(', ')};
          `)
            .then(() => {
              res.sendStatus(200)
            })
        })
    } else {
      res.status(400).send('Must send all required data')
    }
  },

  updateEncounter: (req, res) => {
    res.status(200).send('test')
  }
}