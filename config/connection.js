const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

// Sync the models with the database to create the tables
// Move to seed file if i implement seeding
sequelize
  .sync({ force: false }) // Set force to false after dev to prevent dropping tables
  .then(() => {
    console.log('Database and tables have been created!');
  })
  .catch((err) => {
    console.error('Error creating the database and tables:', err);
  });

module.exports = sequelize;
