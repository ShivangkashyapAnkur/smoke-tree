const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite (can replace with MySQL/Postgres for production)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const User = require('./user')(sequelize);
const Address = require('./address')(sequelize);

// Define the one-to-many relationship
User.hasMany(Address, { as: 'addresses' });
Address.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

const db = {
  sequelize,
  Sequelize,
  User,
  Address,
};

// Sync the models with the database
db.sequelize.sync({ force: true })
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database: ', err));

module.exports = db;
