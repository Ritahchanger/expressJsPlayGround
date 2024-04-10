const mongoose = require('mongoose')


require("dotenv").config();





const connectDb = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URL);

    console.log(`The database is configured and its running`);

  } catch (error) {
    console.log(`failed to connect to the database ${error.message}`)
  }
}

module.exports=connectDb;