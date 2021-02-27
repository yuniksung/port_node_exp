const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { Sequelize } = require('sequelize/types');
const app = express();

const port = process.env.PORT || 3001;

// const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: Sequelize,
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, "public")));
app.use(session(sess));

const helpers = require('./utils/helpers');

app.engine("handlebars", hbs.engine);
app.set('view engine', 'handlebars');

Sequelize.afterSync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("now listening"));
});