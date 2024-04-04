import connectToMongo from "./mongodb.js";

const client = await connectToMongo(process.env.URI)
const db = client.db('dragonmaster')

class Collections {
  constructor() {
    this.data = {}
    this.db
  }

  async init(collection, options) {
    this.db = options.mongo
    this.data = await this.db.collection(collection)
  }
  
  async find(query, options) {
    let found = await this.data.find(query).toArray()

    return found
  }
}

const monsters = new Collections
await monsters.init('monsters', {mongo: db})

const spells = new Collections
await spells.init('spells', {mongo: db})

export {monsters, spells}