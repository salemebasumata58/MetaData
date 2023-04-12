const mongoose = require("mongoose");
const metaDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    extentionType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MetaData = mongoose.model("metadata", metaDataSchema);
module.exports = MetaData;
