const seedsPet = require("./data");

const sequelize = require("../config/connection");
const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedsPet();
};

seedAll();