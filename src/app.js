// require('dotenv').config()
// // const express = require('express')
// // const bodyParser = require('body-parser')
// // const cors = require('cors')
// // const morgan = require('morgan')
// // const {sequelize} = require('./models')
// // // const { Sequelize } = require('sequelize')
// // const config = require('./config/config')
 
// // const app = express()
// // app.use(morgan('combine'))
// // app.use(bodyParser.json())
// // app.use(cors())

// // // require('./routes')(app)
// // // console.log("hello:", process.env.VUE_APP_URL)

// // // // sequelize.sync({force: true}) //con esto limpio la base de datos, peligroso si lo dejas para produccion
// // // sequelize.sync()
// // // .then(()=> { 
// // //     // app.listen(process.env.PORT || 8081)
// // //     app.listen(config.port)

// // //     console.log(`server started on port ${config.port}`)
// // // })


// // //  // const authRoutes = requiere('./routes/auth')
// // // // app.use((error, req, res, next) => {
// // // //     console.log(error)
// // // //     const status = error.statusCode || 500
// // // //     const message = error.message
// // // //     const data = error.data
// // // //     res.status(status).json({message: message, data: data})
// // // // })

// // // // app.use('/auth', authRoutes)
// // // // // app.use((req, res, next) => {
// // // // //     console.log("in the middleware!!!!")
// // // // //     next() // si no lo ponemos no mira otros middlewares. el next permite que continue al siguiente middleware
// // // // // })


// // // // app.listen(8080)

// // Required packages
// const express = require('express');
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // Set up express app
// const app = express();
// app.use(express.json());

// console.log("hello:", process.env.VUE_APP_URL)
// // Set up MySQL connection
// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'password',
//     database: 'newcompany',
//     port: '3306'
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database: ', err);
//         return;
//     }
//     console.log('Connected to database.');
// });

// // Register endpoint
// app.post('/register', (req, res) => {
//     const { email, password, name } = req.body;

//     // Hash the password before storing it in the database
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     // Insert user data into the database
//     const sql = `INSERT INTO users (email, password, name) VALUES (email, password, name)`;
//     const values = [email, hashedPassword, name];
//     connection.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error registering user: ', err);
//             res.status(500).send('Error registering user.');
//             return;
//         }
//         console.log('User registered.');
//         res.send('User registered.');
//     });
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const sql = `SELECT * FROM users WHERE email = ?`;
//     const values = [email];
//     connection.query(sql, values, (err, results) => {
//         if (err) {
//             console.error('Error logging in user: ', err);
//             res.status(500).send('Error logging in user.');
//             return;
//         }

//         // User not found
//         if (results.length === 0) {
//             res.status(401).send('Incorrect email or password.');
//             return;
//         }

//         // Compare the password with the hashed password in the database
//         const user = results[0];
//         const passwordMatch = bcrypt.compareSync(password, user.password);
//         if (!passwordMatch) {
//             res.status(401).send('Incorrect email or password.');
//             return;
//         }

//         // Create a JWT token and send it to the client
//         const token = jwt.sign({ id: user.id }, 'secret-key');
//         res.json({ token });
//     });
// });

// // Authentication middleware
// function authenticate(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         res.status(401).send('No token provided.');
//         return;
//     }

//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, 'secret-key', (err, decoded) => {
//         if (err) {
//             res.status(401).send('Invalid token.');
//             return;
//         }
//         req.userId = decoded.id;
//         next();
//     });
// }

// // Protected endpoint
// app.get('/protected', authenticate, (req, res) => {
//     res.send(`Hello, user ${req.userId}!`);
// });

// // Start the server
// const port = 8081;
// app.listen(port, () => {
//     console.log(`Server started on port ${port}.`);
// });
///////////////////////
////////////////////////////
///////////////////////////
// const mysql = require('mysql');
// const con = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "randompass"
// });
// con.connect(function(err) {
//  if (err) console.log(err);
//  else {
//    console.log("Connected!");
//  }
// });
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a MySQL pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'users'
});

// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error registering new user.');
    } else {
      res.status(200).send('New user registered successfully.');
    }
  });
});

// Authenticate a user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error authenticating user.');
    } else {
      if (results.length > 0) {
        res.status(200).send('User authenticated successfully.');
      } else {
        res.status(400).send('Invalid username or password.');
      }
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000.');
});