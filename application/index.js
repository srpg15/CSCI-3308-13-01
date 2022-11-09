const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');

// database configuration
const dbConfig = {
    host: 'db',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };
  
  const db = pgp(dbConfig);


  // test your database
  db.connect()
    .then(obj => {
      console.log('Database connection successful'); // you can view this message in the docker compose logs
      obj.done(); // success, release the connection;
    })
    .catch(error => {
      console.log('ERROR:', error.message || error);
    });

    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(
        session({
          secret: process.env.SESSION_SECRET,
          saveUninitialized: false,
          resave: false,
        })
      );
      
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );

      app.get('/', (req, res) =>{
        res.redirect('/register'); 
      });

    
      app.get('/login', (req, res) => {
        res.render('pages/login');
      });


      app.get('/home', (req, res) => {
        res.render('pages/home');
      });

    app.get('/register', (req, res) => {
        res.render('pages/register');
      });



    app.post('/register', async (req, res) => {
        //the logic goes here
        const username = req.body.username;
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10);
        const query = 'insert into users (username, password) values ($1, $2) returning *';
    db.any(query, [
      username,
      hash
    ])
      .then(() =>{
       res.redirect('/login');

      })
      .catch(err=>{
        console.log(err);
        res.redirect("/register");
      });
    });

    
    app.post('/login', async (req, res) => {
        //the login goes here
        const username = req.body.username;
        const password = req.body.password;
        const query = `select * from users where username = '${username}'`;
        db.any(query)
        .then(async data =>{
        const match = await bcrypt.compare(password, data[0].password); 
        if(match){
            req.session.user = {
                api_key: process.env.API_KEY,
                };
                req.session.save();
                res.redirect('/discover');
        }
        else{
            res.render("pages/register",{
                message: "Incorrect username or password",
                error:true
            })
        }

        })
        .catch(err=>{
            
            res.render("pages/login",{
                message: "Database Request Failed",
                error:true
            })
        });
    });

    // Authentication Middleware.
// const auth = (req, res, next) => {
//     console.log(req.session)
//     if (!req.session.user) {
//       // Default to register page.
//       return res.redirect('/register');
//     }
//     next();
//   };
//   // Authentication Required
//   app.use(auth);


app.get('/logout', (req, res) => {
  req.session.destroy();
    res.render('pages/login',{
        message: "Logged out Successfully"
    })
  });

  app.listen(3000);
  console.log("Server is listening on port 3000");
      