const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const app = express();
const db = require('./models');
const Role = db.role;
const dbConfig = require('./config/db.config');
const { cityRouter } = require('./routes/city.routes');

// front end credentials
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:8081'],
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'traveasy-session',
    secret: 'COOKIE_SECRET', // should use as secret environment variable
    httpOnly: true,
  })
);

// routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' });
});

// Mongoose connection to MongoDB database
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.use(["/city", "/citys"], cityRouter);


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: 'user' }).save((err) => {
        if (err) {
          console.log('Error!', err);
        }
        console.log('added user role success!');
      });
      new Role({ name: 'moderator' }).save((err) => {
        if (err) {
          console.log('Error!', err);
        }
        console.log('added moderator role success!');
      });
      new Role({ name: 'admin' }).save((err) => {
        if (err) {
          console.log('Error!', err);
        }
        console.log('added admin role success!');
      });
    }
  });
}



