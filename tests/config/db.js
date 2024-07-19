const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let dbServer;

exports.connect = async () => {
  // Check and close current connections
  await mongoose.disconnect();

  dbServer = await MongoMemoryServer.create();

  const mongoUri = await dbServer.getUri();

  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("successfully connected to mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.disconnect = async () => {
  await mongoose.disconnect();
  await dbServer.stop();
};

exports.clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};
