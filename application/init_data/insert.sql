-- Default insert values for testing
-- Only default values to remain for final product is category and exercises inserts to provide baseline
INSERT INTO category(category_id, category_name) VALUES
    (1, 'Chest'),
    (2, 'Back'),
    (3, 'Legs'),
    (4, 'Cardio'),
    (5, 'Shoulders'),
    (6, 'Calisthenics');
INSERT INTO exercises(exercise_id, exercise_name, reps, set_num, description, category_id) VALUES
    (1, "Barbell Bench Press", 5, 4, "The classic flat bench press. Reps and Sets are designed for optimal hypertrophy", 1),
    (2, "Barbell Standing Squat", 5, 4, "Standing squat exercise that targets most of the lower body strength and stability", 3),
    (3, "Overhead Press", 6, 5, "Overhead press can be done on machine or barbell. Barbell targets stability while machine focuses on strength", 5),
    (4, "Romanian Deadlifts", 8, 4, "An alteration of the traditional barbell deadlift. Done with 2 dumbells in a traditional deadlift form without touching weights against the ground", 2),
    (5, "Side Lateral Raise", 10, 3, "With dumbbells in each hand, keep arms straight while spreading arms open to reach shoulder height", 5),
    (6, "Bulgarian Split Squat", 8, 4, "Stand in lunge position with back foot elevated to knee height. Squat with dumbbells in each hand", 3),
    (7, "Running", 4, 5, "Run for 2 minutes straight for each rep. Take 1 minute break before beginning next set", 4),
    (8, "Forearm Plank", 3, 2, "In plank position supported by forearms, hold position with flat back for 1 minute per rep. Taking 30 second breaks between sets", 6),
    (9, "Eliptical", 4, 5, "Run on eliptical for 3 minutes straight for each rep. Take 90 second between sets", 4),
    (10, "Cable Crossover", 10, 3, "With cables in each hand, pull hand together in round motion to focus burn on chest", 1),
    (11, "Upright Rows", 4, 5, "With dumbbells in both hands, lift hands up to shoulder height while keeping arms close to core to work the back", 2);
INSERT INTO users(user_id, username, password) VALUES
    (1, test, test1),
    (2, cubuff, xyz),
    (3, ralphie, abcde);
INSERT INTO users_to_exercises(day_id, day_name, user_id, exercise_id) VALUES
    (1, 'Sunday', 1, 4),
    (2, 'Monday', 1, 3),
    (3, 'Tuesday', 1, 6),  
    (4, 'Wednesday', 1, 2),
    (6, 'Friday', 1, 1);
