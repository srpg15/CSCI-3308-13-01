const express = require('express')
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { render } = require('ejs');
const { queryResult } = require('pg-promise');
const path = require('path')
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



    const fetch_database = (query) => {
      return new Promise((resolve, reject) => {
      
        db.any(query)
          .then(function(rows) {
            const data = rows
            //console.log(data);
            resolve(data)
          })
          .catch(e => {
            reject(e)
          })
      })
    };
  

  

    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, "src")));
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



    app.get('/register', (req, res) => {
        res.render('pages/register');
      });


    const auth = (req, res, next) => {
      if(!req.session.user) res.render('pages/login')
      else next()
    }
    

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
      res.render('pages/Profile',{username: req.session.user.username});
    });

    app.post('/profile/Change-username', async (req, res) =>{
      let old_username = req.body.Old_Username;
      let new_username = req.body.new_username;
      let query = `select * from users where users.user_id = '${req.session.user.user_id}'`;
      await db.query(query)
      .then(async data =>{
        if(old_username === req.session.user.username){
          let modify = `update users set username = '${new_username}' where user_id = '${req.session.user.user_id}';`;
          db.query(modify)
            .then( message =>{
              req.session.user.username = new_username;
              res.render('pages/profile',{
                message: "Username updated successfully",
                username: req.session.user.username
              });

            })
            .catch(err=>{
              res.render('pages/profile',{
                message: "couldn't update the Username",
                username: req.session.user.username,
                error:true
              });
            });
        }else{
          res.render('pages/profile',{
            message: "Usernames doesn't match",
            username: req.session.user.username,
            error:true
          });
        }
      })
      .catch(err =>{
        res.render('pages/profile',{
          message: "couldn't update the Username",
          username: req.session.user.username,
          error:true
        });
      });
    });

    app.post('/profile/Change-password', async (req, res) =>{
      let old_passord = req.body.Old_Password;
      let new_password = req.body.new_Password;
      let check_new_password = req.body.Re_Enter_Password;
      let query = `select * from users where users.user_id = '${req.session.user.user_id}'`;
      await db.query(query)
      .then(async data =>{
        const match = await bcrypt.compare(old_passord, data[0].password);
        if(match){
          if(new_password === check_new_password && new_password!= ''){
            // 
            const hash = await bcrypt.hash(new_password, 10);
            let modify = `update users set password = '${hash}' where user_id = '${req.session.user.user_id}';`;
            db.query(modify)
            .then( message =>{
              res.render('pages/profile',{
                message: "password updated successfully",
                username: req.session.user.username
              });

            })
            .catch(err=>{
              res.render('pages/profile',{
                message: "couldn't update the password",
                username: req.session.user.username,
                error:true
              });
            });

          }else{
            res.render('pages/profile',{
            message: "the passwords you entered doesn't match ",
            username: req.session.user.username,
            error:true
          });
          }
        }else{
          res.render('pages/profile',{
            message: "incorrect password",
            username: req.session.user.username,
            error:true
          });
        }
      })
      .catch(err=>{
        res.render('pages/profile',{
          message: "couldn't update the password",
          username: req.session.user.username,
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
                  username: data[0].username,
                  user_id: data[0].user_id,
                };
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

app.get('/home', auth, async (req, res) => {
  const {user_id} = req.session.user || {};
  console.log(req.session.user);
  console.log(user_id);

  query1 = "SELECT * FROM exercises;"
  query2 = `SELECT * FROM exercises INNER JOIN users_to_exercises ON exercises.exercise_id = users_to_exercises.exercise_id WHERE user_id = ${user_id};`;
  query3 = `SELECT * FROM users_to_exercises WHERE user_id = ${user_id};`;
  
  fetch_database(query1)
  .then(Exe => {

    fetch_database(query2)
    .then(name => {
      
      fetch_database(query3)
        .then(days => {
          res.render('pages/home', {data: Exe, user: name, day: days});
        })
        .catch(e => {
          console.log(e); 
        })
    })
    .catch(e => {
      console.log(e);
    })
  })
  .catch(e => {
    console.log(e);
  })

 
});

  

app.post('/home/add', (req, res)=>{
  let exercise_id = req.body.exercise_id;
  let day_name = req.body.day_name;
  let query = `INSERT INTO users_to_exercises(day_name, user_id, exercise_id) VALUES($1, $2, $3);`;
  db.query(query, [day_name, req.session.user.user_id, exercise_id])
  .then(()=>{
    res.redirect('/home');
  })
  .catch((err)=>{
    res.render('pages/home', {
      message: `couldn't add the exercise.`,
      error: true
    });
  });

});

app.post('/home/delete', (req, res) => {
  let exercise_id = req.body.ExerciseId;
  let day_name = req.body.dayName;
  let query = `SELECT * FROM users_to_exercises where users_to_exercises.user_id = $1 AND users_to_exercises.exercise_id = $2 AND users_to_exercises.day_name = $3;`;
  db.query(query,[req.session.user.user_id, exercise_id, day_name])
  .then(()=> {
    let Delete = 
    `DELETE FROM users_to_exercises
     WHERE users_to_exercises.user_id = '${req.session.user.user_id}' 
     AND users_to_exercises.exercise_id = '${exercise_id}' 
     AND users_to_exercises.day_name = '${day_name}';`;
    db.query(Delete)
    .then(()=>{
      res.redirect('/home');
    })
    .catch((err)=>{
      console.log(err);
    });
  })
  .catch((err)=>{
    res.redirect('/home');
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
 
  app.listen(3000);

  console.log("Server is listening on port 3000");
