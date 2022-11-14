-- Default insert values for testing
-- Only default values to remain for final product is category and exercises inserts to provide baseline
INSERT INTO category(category_id, category_name) VALUES
    (1, 'Chest'),
    (2, 'Back'),
    (3, 'Legs'),
    (4, 'Cardio'),
    (5, 'Shoulders'),
    (6, 'Calisthenics'),
    (7, 'Arms');
INSERT INTO exercises(exercise_id, exercise_name, reps, set_num, description, category_id) VALUES
    (1, 'Barbell Bench Press', 5, 4, 'The classic flat bench press. Reps and Sets are designed for optimal hypertrophy', 1),
    (2, 'Barbell Standing Squat', 5, 4, 'Standing squat exercise that targets most of the lower body strength and stability', 3),
    (3, 'Overhead Press', 6, 5, 'Overhead press can be done on machine or barbell. Barbell targets stability while machine focuses on strength', 5),
    (4, 'Romanian Deadlifts', 8, 4, 'An alteration of the traditional barbell deadlift. Done with 2 dumbells in a traditional deadlift form without touching weights against the ground', 2),
    (5, 'Side Lateral Raise', 10, 3, 'With dumbbells in each hand, keep arms straight while spreading arms open to reach shoulder height', 5),
    (6, 'Bulgarian Split Squat', 8, 4, 'Stand in lunge position with back foot elevated to knee height. Squat with dumbbells in each hand', 3),
    (7, 'Running', 4, 5, 'Run for 2 minutes straight for each rep. Take 1 minute break before beginning next set', 4),
    (8, 'Forearm Plank', 3, 2, 'In plank position supported by forearms, hold position with flat back for 1 minute per rep. Taking 30 second breaks between sets', 6),
    (9, 'Eliptical', 4, 5, 'Run on eliptical for 3 minutes straight for each rep. Take 90 second between sets', 4),
    (10, 'Cable Crossover', 10, 3, 'With cables in each hand, pull hand together in round motion to focus burn on chest', 1),
    (11, 'Upright Rows', 4, 5, 'With dumbbells in both hands, lift hands up to shoulder height while keeping arms close to core to work the back', 2),
    (12, 'Incline Bench', 8, 4, 'An alteration of the bench press that works front shoulders and chest at the same time', 1),
    (13, 'Bent Over Rows', 6, 5, 'A barbell row that is done in a bent over position to work upper strength and lower back stability', 2),
    (14, 'Tricep Extension', 10, 4, 'Using a cable or dumbbell, extend your arm to work triceps', 7),
    (15, 'Hammer Curl', 8, 5, 'A typical bicep curl with arm in a neutral position and dumbbell handle pointing vertically', 7),
    (16, 'Cable Fly', 8, 5, 'Using a fly machine standing or dumbbells on a flat bench, start with your arms wide at your sides then bring forwards until hands cross or dumbbells touch.', 1),
    (17, 'Leg Curl', 8, 4, 'A typical leg curl using a machine. Works the back of the leg.', 3),
    (18, 'Leg Extension', 12, 4, 'Leg extension using a machine. Isolates the quads.', 3),
    (19, 'Calf Raise', 12, 4, 'Using a machine or free weights, perform weighted calf raises with adequate weight for repetition amount', 3);
INSERT INTO users(user_id, username, password) VALUES
    (1, 'test', '$2b$10$92ATl9.9ZSgOsQR0GdC84eVZpOsS6rZxzY3H4g40WjX5.P1Myf7FS'),
    (2, 'cubuff', '$2b$10$92ATl9.9ZSgOsQR0GdC84eVZpOsS6rZxzY3H4g40WjX5.P1Myf7FS'),
    (3, 'ralphie', '$2b$10$92ATl9.9ZSgOsQR0GdC84eVZpOsS6rZxzY3H4g40WjX5.P1Myf7FS');
INSERT INTO users_to_exercises(day_id, day_name, user_id, exercise_id) VALUES
    (1, 'Sunday', 1, 4),
    (1, 'Sunday', 1, 11),
    (2, 'Monday', 1, 3),
    (2, 'Monday', 1, 5),
    (3, 'Tuesday', 1, 6),
    (3, 'Tuesday', 1, 2),
    (4, 'Wednesday', 1, 5),
    (4, 'Wednesday', 1, 3),
    (6, 'Friday', 1, 10),
    (6, 'Friday', 1, 1),
    (1, 'Sunday', 2, 5),
    (1, 'Sunday', 2, 3),
    (2, 'Monday', 2, 6),
    (2, 'Monday', 2, 2),
    (3, 'Tuesday', 2, 10),
    (3, 'Tuesday', 2, 1),
    (4, 'Wednesday', 2, 4),
    (4, 'Wednesday', 2, 11),
    (6, 'Friday', 2, 9),
    (6, 'Friday', 2, 2),
    (1, 'Sunday', 3, 6),
    (1, 'Sunday', 3, 8),
    (2, 'Monday', 3, 10),
    (2, 'Monday', 3, 1),
    (3, 'Tuesday', 3, 6),
    (3, 'Tuesday', 3, 2),
    (4, 'Wednesday', 3, 7),
    (4, 'Wednesday', 3, 8),
    (6, 'Friday', 3, 7),
    (6, 'Friday', 3, 1);
    
