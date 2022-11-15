const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { render } = require('ejs');

// database configuration
const dbConfig = {
    host: 'db',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  };


  const user = { 
    user_id: undefined,
    username: undefined,
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



    const fetch_excersie_name = () => {
      return new Promise((resolve, reject) => {
        let query = "SELECT exercise_name FROM exercises;";

        db.any(query)
          .then(function(rows) {
            const data = rows
            resolve(data)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  

  

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
        res.redirect('/login'); 
      });

    
      app.get('/login', (req, res) => {
        res.render('pages/login');
      });


      app.get('/home', async (req, res) => {
        fetch_excersie_name()
        .then(data => {
          res.render('pages/home', {data: data});
        })
        .catch(e => {
          console.log(e)
        })
        
      });

    app.get('/register', (req, res) => {
        res.render('pages/register');
      });
    

      app.post('/register', async (req, res)=>{
        const hash = await bcrypt.hash(req.body.password, 10);
        let INSERT = `INSERT INTO users (username,password) VALUES ('${req.body.username}','${hash}')`;
        db.query(INSERT)
        .then(query =>{
          res.redirect('/login');
        })
        .catch((err) =>{
          res.render('pages/register',{error: true, message: 'username alredy used'});
        });
    });

    app.get('/profile', (req, res) =>{
      res.render('pages/Profile',{username: user.username});
    });

    app.post('/profile/Change-username', async (req, res) =>{
      let old_username = req.body.Old_Username;
      let new_username = req.body.new_username;
      let query = `select * from users where users.user_id = '${user.user_id}'`;
      await db.query(query)
      .then(async data =>{
        if(old_username === user.username){
          let modify = `update users set username = '${new_username}' where user_id = '${user.user_id}';`;
          db.query(modify)
            .then( message =>{
              user.username = new_username;
              res.render('pages/profile',{
                message: "Username updated successfully",
                username: user.username
              });

            })
            .catch(err=>{
              res.render('pages/profile',{
                message: "couldn't update the Username",
                username: user.username,
                error:true
              });
            });
        }else{
          res.render('pages/profile',{
            message: "Usernames doesn't match",
            username: user.username,
            error:true
          });
        }
      })
      .catch(err =>{
        res.render('pages/profile',{
          message: "couldn't update the Username",
          username: user.username,
          error:true
        });
      });
    });

    app.post('/profile/Change-password', async (req, res) =>{
      let old_passord = req.body.Old_Password;
      let new_password = req.body.new_Password;
      let check_new_password = req.body.Re_Enter_Password;
      let query = `select * from users where users.user_id = '${user.user_id}'`;
      await db.query(query)
      .then(async data =>{
        const match = await bcrypt.compare(old_passord, data[0].password);
        if(match){
          if(new_password === check_new_password && new_password!= ''){
            // 
            const hash = await bcrypt.hash(new_password, 10);
            let modify = `update users set password = '${hash}' where user_id = '${user.user_id}';`;
            db.query(modify)
            .then( message =>{
              res.render('pages/profile',{
                message: "password updated successfully",
                username: user.username
              });

            })
            .catch(err=>{
              res.render('pages/profile',{
                message: "couldn't update the password",
                username: user.username,
                error:true
              });
            });

          }else{
            res.render('pages/profile',{
            message: "the passwords you entered doesn't match ",
            username: user.username,
            error:true
          });
          }
        }else{
          res.render('pages/profile',{
            message: "incorrect password",
            username: user.username,
            error:true
          });
        }
      })
      .catch(err=>{
        res.render('pages/profile',{
          message: "couldn't update the password",
          username: user.username,
          error:true
        });
      });
    });
    

  app.post('/login', async (req, res) => {
    //the login goes here
          let username = req.body.username;
          let password = req.body.password;
          let query = `select * from users where username = '${username}'`;

          await db.any(query)
          .then(async data =>{
          const match = await bcrypt.compare(password, data[0].password);
          if(match){
              req.session.user = {
                  api_key: process.env.API_KEY,
                };
                  user.username = data[0].username;
                  user.user_id = data[0].user_id;
                  console.log(user.user_id);
                  req.session.save();
                  res.redirect('/home');
          }
          else{

            res.render("pages/login", {
              message: 'Incorrect username or password.',
              error: true
            });
          }  
      })
      .catch(err=>{
        res.render('pages/register', {
          message: 'account is not found, register here',
          error: true
        });
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

// GET /logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});


 
  app.listen(3000);

  console.log("Server is listening on port 3000");
