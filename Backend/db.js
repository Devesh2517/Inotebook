const mongoose = require("mongoose")
// ?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"

//connecting mongodb 
const connectToMongo = async () => {

    mongoose.connect(mongoURI, await console.log("connected to mongodb"))

}

module.exports = connectToMongo