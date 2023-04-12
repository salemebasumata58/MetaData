const fs = require("fs");
const path = require("path");
const connect = require("./config/db");
const MetaData = require("./models/metadata.model");

const data = [];

function getMetaData(directoryPath) {
  const items = fs.readdirSync(directoryPath);

  items.forEach((itemName) => {
    const itemPath = path.join(directoryPath, itemName);
    // console.log(itemPath)
    const stats = fs.statSync(itemPath);
    const isFile = stats.isFile();
    if (!isFile) {
      data.push({ name: itemName, type: "folder", extension: null });
      return getMetaData(itemPath);
    }
    const type = isFile ? "file" : "folder";

    const extentionType = path.extname(itemName);
    
    // const createdDate = stats.birthtime;
    // const updatedDate = stats.mtime;

    const itemMetadata = {
      name: itemName,
      type,
      extentionType,
    };

    data.push(itemMetadata);
  });

  return data;
}
const updateMetaData = async (data) => {
  await connect();
  for (const item of data) {
    const { name, type, extentionType } = item;
    await MetaData.updateOne(
      { name },
      { $set: { type, extentionType } },
      { upsert: true }
    );
  }
};
// getMetaData("sample");
console.log(data);
setInterval(() => {
  const data = getMetaData("sample");
  // console.log(data);
  updateMetaData(data);
}, 3000);
