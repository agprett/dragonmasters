import { Sequelize } from 'sequelize'

const connectToDB = async (uri) => {
  const sequelize = new Sequelize(uri, {
    logging: console.log,
    define: {
      timestamps: false,
      underscored: true
    } 
  })
  
  try {
    await sequelize.authenticate()
    console.log('Connected to DB successfully')
  } catch (err) {
    console.log('Failed to connect to DB', err)
  }

  return sequelize
}

export default connectToDB