const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/MetaData");
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports = connect;
