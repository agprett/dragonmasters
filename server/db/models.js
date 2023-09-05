import { DataTypes, Model } from "sequelize"
import util from 'util'
import connectToDB from "./db.js"

const db = await connectToDB(process.env.CONNECTION_STRING)

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init({
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize: db
})

class Character extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Character.init({
  character_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  player: {
    type: DataTypes.TEXT,
    defaultValue: 'Someone'
  },
  hit_points: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  race: {
    type: DataTypes.TEXT
  },
  class: {
    type: DataTypes.TEXT
  },
  armorclass: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: db
})

class Campaign extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Campaign.init({
  campaign_id:  {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  dungeon_master: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  length: {
    type: DataTypes.TEXT
  },
  world_name: {
    type: DataTypes.TEXT
  },
  start_level: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: db
})

class Campaign_Note extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Campaign_Note.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  campaign_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize: db
})

class Campaign_Character extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Campaign_Character.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  campaign_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  character_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  current_hit_points: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db
})

class Encounter extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Encounter.init({
  encounter_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  campaign_id: {
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: "No description"
  },
  short_description: {
    type: DataTypes.STRING(50)
  },
  terrain: {
    type: DataTypes.TEXT
  },
  location: {
    type: DataTypes.TEXT
  },
  rewards: {
    type: DataTypes.TEXT
  }
}, {
  sequelize: db
})


class Encounter_Monster extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Encounter_Monster.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  encounter_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db
})

class Encounter_Character extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Encounter_Character.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  encounter_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  character_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db
})

User.hasMany(Character, {foreignKey: 'user_id'})
Character.belongsTo(User, {foreignKey: 'user_id'})

User.hasMany(Campaign, {foreignKey: 'user_id'})
Campaign.belongsTo(User, {foreignKey: 'dungeon_master'})

Campaign.hasMany(Campaign_Note, {foreignKey: 'campaign_id'})
Campaign_Note.belongsTo(Campaign, {foreignKey: 'campaign_id'})

Campaign.hasMany(Campaign_Character, {foreignKey: 'campaign_id'})
Campaign_Character.belongsTo(Campaign, {foreignKey: 'campaign_id'})

Character.hasMany(Campaign_Character, {foreignKey : 'character_id'})
Campaign_Character.belongsTo(Character, {foreignKey: 'character_id'})

User.hasMany(Encounter, {foreignKey: 'user_id'})
Encounter.belongsTo(User, {foreignKey: 'user_id'})

Campaign.hasMany(Encounter, {foreignKey: 'campaign_id'})
Encounter.belongsTo(Campaign, {foreignKey: 'campaign_id'})

Encounter.hasMany(Encounter_Monster, {foreignKey: 'encounter_id'})
Encounter_Monster.belongsTo(Encounter, {foreignKey: 'encounter_id'})

Encounter.hasMany(Encounter_Character, {foreignKey: 'encounter_id'})
Encounter_Character.belongsTo(Encounter, {foreignKey: 'encounter_id'})

export default db
export { User, Character, Campaign, Encounter, Campaign_Note, Campaign_Character, Encounter_Monster, Encounter_Character }