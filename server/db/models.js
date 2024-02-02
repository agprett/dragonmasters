import { DataTypes, Model } from "sequelize"
import util from 'util'
import connectToDB from "./db.js"

const db = await connectToDB(process.env.CONNECTION_STRING)

// User table tracks the data for a user: username, password, etc.
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

// Character table holds data about a players character and who create that character
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
  char_class: {
    type: DataTypes.TEXT
  },
  armor_class: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: db,
  defaultScope: {
    attributes: {
      exclude: ['user_id']
    }
  }
})

// Campaign table tracks information about the overall campaign
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
  sequelize: db,
  defaultScope: {
    attributes: {
      exclude: ['dragon_master']
    }
  }
})

// Campaign Note is a table that has notes about the campaign and who can view them
class CampaignNote extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

CampaignNote.init({
  note_id: {
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

// This table links a specific character to the campaigns they're participating in
class CampaignCharacter extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

CampaignCharacter.init({
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

// This table contains overall information about an encounter: description, location, terrain, rewards, campaign it's in, etc.
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
  sequelize: db,
  defaultScope: {
    attributes: {
      exclude: ['user_id']
    }
  }
})

// This table links encounters to the monsters added to them and how many there are of each monster
class EncounterMonster extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

EncounterMonster.init({
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
  },
  pointer: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db
})

// This table links the characters to the encounters they're participating in
class EncounterCharacter extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

EncounterCharacter.init({
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

// Below are all the relationships present in the above tables
User.hasMany(Character, {foreignKey: 'user_id'})
Character.belongsTo(User, {foreignKey: 'user_id'})

User.hasMany(Campaign, {foreignKey: 'dungeon_master'})
Campaign.belongsTo(User, {foreignKey: 'dungeon_master'})

Campaign.hasMany(CampaignNote, {foreignKey: 'campaign_id'})
CampaignNote.belongsTo(Campaign, {foreignKey: 'campaign_id'})

Campaign.belongsToMany(Character, {through: 'CampaignCharacter', foreignKey: 'campaign_id', as: 'characters'})
Character.belongsToMany(Campaign, {through: 'CampaignCharacter', foreignKey: 'character_id', as: 'characters'})

User.hasMany(Encounter, {foreignKey: 'user_id'})
Encounter.belongsTo(User, {foreignKey: 'user_id'})

Campaign.hasMany(Encounter, {foreignKey: 'campaign_id'})
Encounter.belongsTo(Campaign, {foreignKey: 'campaign_id'})

Encounter.hasMany(EncounterMonster, {foreignKey: 'encounter_id', as: 'monsters'})
EncounterMonster.belongsTo(Encounter, {foreignKey: 'encounter_id', as: 'monsters'})

Encounter.belongsToMany(Character, {through: 'EncounterCharacter', foreignKey: 'encounter_id', as: 'players'})
Character.belongsToMany(Encounter, {through: 'EncounterCharacter', foreignKey: 'character_id', as: 'players'})
Encounter.hasMany(EncounterCharacter, {as: 'characters', foreignKey: 'encounter_id'})
EncounterCharacter.belongsTo(Encounter, {as: 'characters', foreignKey: 'encounter_id'})
Character.hasMany(EncounterCharacter, {foreignKey: 'character_id'})
EncounterCharacter.belongsTo(Character, {foreignKey: 'character_id'})

export default db
export { User, Character, Campaign, Encounter, CampaignNote, CampaignCharacter, EncounterMonster, EncounterCharacter }