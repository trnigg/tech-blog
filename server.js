const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// If we need any helpers, declare them here and check path
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Configure and link a session object with the sequelize store
// Cookie maxAge set to 10 minutes for idle users
// see: https://expressjs.com/en/resources/middleware/session.html
// also: https://developer.okta.com/blog/2021/06/07/session-mgmt-node
const sess = {
  secret: process.env.SESS_SECRET,
  cookie: { maxAge: 1000 * 10 * 60 }, // 10 minutes
  resave: false,
  saveUninitialized: false,
  rolling: true, // update with new maxAge expiration on every response, see: https://trueq.io/q/5
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
  );
});
