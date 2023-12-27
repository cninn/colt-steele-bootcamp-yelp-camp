const mongoose =require('mongoose');


const connect = ()=>{
    try {
      mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
      console.log("Database is active!");
  /*    mongoose.connection.close(); // MANUEL OLARAK BAĞLANTI KESME  */
    } catch (err) {
      console.log(err);
  
    }
  }

 
  
  module.exports = connect;