import Sequelize from 'sequelize'
const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
  }
})

const encounterFunctions = {
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

          encounter.monsters = dbRes[1][1].rows

          encounter.players = dbRes[1][2].rows

          res.status(200).send(encounter)
        })
    } else {
      res.sendStatus(400)
    }

  },

  createEncounter: (req, res) => {
    let {name, short_description, desc, terrain, location, rewards, campaign_id, characters, monsters} = req.body

    if(req.session.user && name && short_description) {
      const {user_id} = req.session.user
      
      desc = desc ? desc : 'None'
      
      sequelize.query(`INSERT INTO encounters (user_id, name, short_description, description)
      VALUES ('${user_id}', $$${name}$$, $$${short_description}$$, $$${desc}$$)
      RETURNING encounter_id;`)
        .then((dbRes) => {
          const {encounter_id} = dbRes[0][0]

          console.log(dbRes[0][0].encounter_id)
          let query = ''
          if(monsters) {
            let monstersValues = monsters.map(mon => {
              return `($$${mon.name}$$, $$${mon.url}$$, ${mon.count}, ${encounter_id})`
            })
            
            console.log(monstersValues.join(', '))
              
            query += `
              INSERT INTO encounter_monsters (name, url, count, encounter_id)
              VALUES ${monstersValues.join(', ')};
            `
          }

          if(characters) {
            let characterValues = characters.map(char => {
              return `(${encounter_id}, $$${char.characterId}$$)`
            })
            
            console.log(characterValues.join(', '))
  
            query += `
              INSERT INTO encounter_characters (encounter_id, character_id)
              VALUES ${characterValues.join(', ')};
            `
          }
          
          sequelize.query(query)
            .then(() => {
              res.status(200).send('New encounter created!')
            })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      res.status(400).send('Must send all required data to create a new encounter')
    }
  },

  updateEncounter: (req, res) => {
    res.status(200).send('test')
  }
}

export default encounterFunctions