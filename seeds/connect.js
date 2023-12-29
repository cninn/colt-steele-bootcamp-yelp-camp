const mongoose =require('mongoose');

const DB_URL= process.env.MONGO_CONNECT;

const connect = ()=>{
    try {
      mongoose.connect(DB_URL);
      console.log("Database is active!");
  /*    mongoose.connection.close(); // MANUEL OLARAK BAĞLANTI KESME  */
    } catch (err) {
      console.log(err);
  
    }
  }

 
  
  module.exports = connect;