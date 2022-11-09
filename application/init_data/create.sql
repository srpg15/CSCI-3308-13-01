-- User creds table 
-- Each user gets a unique user_id that ties their account to their individual routines
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL
);
-- Database of each individual exercise stored by the site
-- User modifiable through alter table onclick events
CREATE TABLE exercises(
    exercise_id SERIAL PRIMARY KEY, 
    exercise_name VARCHAR(50),
    reps INT,
    set_num INT,
    description VARCHAR(300),
    category_id INT
);
-- Bridge table to connect the user's unique ID to their routines
-- Day_id and day_name are used to outline the week plan 
-- Must have duplicates for each day (eg: If I do barbell bench on tuesday and friday there will be 2 entries with differing day_id and day_name)
CREATE TABLE users_to_exercises(
    day_id INT,
    day_name VARCHAR(50),
    user_id INT,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES users(user_id),
    exercise_id INT,
    CONSTRAINT exercise_id FOREIGN KEY (exercise_id)
        REFERENCES exercises(exercise_id)
);
-- Table that stores the different categories that the exercises are filed under
-- User modifiable
CREATE TABLE category(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50)
);