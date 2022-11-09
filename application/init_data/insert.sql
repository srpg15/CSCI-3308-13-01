-- Default insert values for testing
-- Only default values to remain for final product is category and exercises inserts to provide baseline
INSERT INTO category(category_id, category_name)
    VALUES(1, 'Chest');
INSERT INTO category(category_id, category_name)
    VALUES(2, 'Back');
INSERT INTO category(category_id, category_name)
    VALUES(3, 'Legs');
INSERT INTO category(category_id, category_name)
    VALUES(4, 'Cardio');
INSERT INTO category(category_id, category_name)
    VALUES(5, 'Shoulders');
INSERT INTO category(category_id, category_name)
    VALUES(6, 'Calisthenics');
INSERT INTO exercises(exercise_id, exercise_name, reps, set_num, description, category_id)
    VALUES(1, 'Barbell Bench Press', 5, 4, 'The classic flat bench press. Reps and Sets are designed for optimal hypertrophy', 1);
INSERT INTO exercises(exercise_id, exercise_name, reps, set_num, description, category_id)
    VALUES(2, 'Barbell Standing Squat', 5, 4, 'Standing squat exercise that targets most of the lower body strength and stability', 3);
INSERT INTO exercises(exercise_id, exercise_name, reps, set_num, description, category_id)
    VALUES(3, 'Overhead Press', 6, 5, 'Overhead press can be done on machine or barbell. Barbell targets stability while machine focuses on strength', 5);
INSERT INTO exercises(exercise_id, exercise_name, reps, set_num, description, category_id)
    VALUES(4, 'Romanian Deadlifts', 8, 4, 'An alteration of the traditional barbell deadlift. Done with 2 dumbells in a traditional deadlift form without touching weights against the ground', 2);
INSERT INTO users(user_id, username, password)
    VALUES(1, 'test', 'test1');
INSERT INTO users_to_exercises(day_id, day_name, user_id, exercise_id)
    VALUES(1, 'Sunday', 1, 4);
INSERT INTO users_to_exercises(day_id, day_name, user_id, exercise_id)
    VALUES(4, 'Wednesday', 1, 2);