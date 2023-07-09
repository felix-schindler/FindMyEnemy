BEGIN;

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	personality CHAR(4)
);

CREATE TABLE IF NOT EXISTS questions (
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS answers (
	id SERIAL PRIMARY KEY,
	question_id INT NOT NULL REFERENCES questions(id),
	content TEXT NOT NULL,
	category CHAR(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS challenges (
	id SERIAL PRIMARY KEY,
	user_1_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	user_2_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	user_1_score INT DEFAULT 0,
	user_2_score INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS personality_types (
	id SERIAL PRIMARY KEY,
	"type" VARCHAR(4) NOT NULL
);

-- Create the compatibilities table
CREATE TABLE IF NOT EXISTS compatibilities (
	id SERIAL PRIMARY KEY,
	personality_type_1_id INT REFERENCES personality_types(id),
	personality_type_2_id INT REFERENCES personality_types(id),
	"percentage" INT NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
	UNIQUE(personality_type_1_id, personality_type_2_id)
);

CREATE TABLE IF NOT EXISTS frenemies (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	enemy_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	compatibility_id INT REFERENCES compatibilities(id),
	UNIQUE(user_id, enemy_id)
);

INSERT INTO questions (content) VALUES
	('At a party do you'),
	('Are you more'),
	('Is it worse to'),
	('Are you more impressed by'),
	('Are more drawn toward the'),
	('Do you prefer to work'),
	('Do you need to choose'),
	('At parties do you'),
	('Are you more attracted to'),
	('Are you more interested in'),
	('In judging others are you more swayed by'),
	('In approaching others is your inclination to be somewhat'),
	('Are you more'),
	('Does it bother you more having things'),
	('In your social groups do you'),
	('In doing ordinary things are you more likely to'),
	('Writers should'),
	('Which appeals to you more'),
	('Are you more comfortable in making'),
	('Do you want things'),
	('Would you say you are more'),
	('In phoning do you:'),
	('Facts'),
	('Are visionaries'),
	('Are you more often'),
	('Is it worse to be'),
	('Should one usually let events occur'),
	('Do you feel better about'),
	('In company do you'),
	('Common sense is'),
	('Children often do not'),
	('In making decisions do you feel more comfortable with'),
	('Are you more'),
	('Which is more admirable'),
	('Do you put more value on');

INSERT INTO answers (question_id, content, category) VALUES
	(1, 'Interact with many, including strangers', 'E'),
	(1, 'Interact with a few, known to you', 'I'),
	(2, 'Realistic than speculative', 'S'),
	(2, 'Speculative than realistic', 'N'),
	(3, 'Have your ''head in the clouds''', 'N'),
	(3, 'Be ''in a rut''', 'S'),
	(4, 'Principles', 'T'),
	(4, 'Emotions', 'F'),
	(5, 'Convincing', 'T'),
	(5, 'Touching', 'F'),
	(6, 'To deadlines', 'J'),
	(6, 'Just ''whenever''', 'P'),
	(7, 'Rather carefully', 'J'),
	(7, 'Somewhat impulsively', 'P'),
	(8, 'Stay late, with increasing energy', 'E'),
	(8, 'Leave early with decreased energy', 'I'),
	(9, 'Sensible people', 'S'),
	(9, 'Imaginative people', 'N'),
	(10, 'What is actual', 'S'),
	(10, 'What is possible', 'N'),
	(11, 'Laws than circumstances', 'T'),
	(11, 'Circumstances than laws', 'F'),
	(12, 'Objective', 'T'),
	(12, 'Personal', 'F'),
	(13, 'Punctual', 'J'),
	(13, 'Leisurely', 'P'),
	(14, 'Incomplete', 'J'),
	(14, 'Complete', 'P'),
	(15, 'Keep abreast of other''s happenings', 'E'),
	(15, 'Get behind on the news', 'I'),
	(16, 'Do it the usual way', 'S'),
	(16, 'Do it your own way', 'N'),
	(17, 'Say what they mean and mean what they say', 'S'),
	(17, 'Express things more by use of analogy', 'N'),
	(18, 'Consistency of thought', 'T'),
	(18, 'Harmonious human relationships', 'F'),
	(19, 'Logical judgments', 'T'),
	(19, 'Value judgments', 'F'),
	(20, 'Settled and decided', 'J'),
	(20, 'Unsettled and undecided', 'P'),
	(21, 'Serious and determined', 'J'),
	(21, 'Easy-going', 'P'),
	(22, 'Rarely question that it will all be said', 'E'),
	(22, 'Rehearse what you''ll say', 'I'),
	(23, 'Speak for themselves', 'S'),
	(23, 'Illustrate principles', 'N'),
	(24, 'Somewhat annoying', 'S'),
	(24, 'Rather fascinating', 'N'),
	(25, 'A cool-headed person', 'T'),
	(25, 'A warm-hearted person', 'F'),
	(26, 'Unjust', 'T'),
	(26, 'Merciless', 'F'),
	(27, 'By careful selection and choice', 'J'),
	(27, 'Randomly and by chance', 'P'),
	(28, 'Having purchased', 'J'),
	(28, 'Having the option to buy', 'P'),
	(29, 'Initiate conversation', 'E'),
	(29, 'Wait to be approached', 'I'),
	(30, 'Rarely questionable', 'S'),
	(30, 'Frequently questionable', 'N'),
	(31, 'Make themselves useful enough', 'S'),
	(31, 'Exercise their fantasy enough', 'N'),
	(32, 'Standards', 'T'),
	(32, 'Feelings', 'F'),
	(33, 'A firm than gentle', 'T'),
	(33, 'Gentle than firm', 'F'),
	(34, 'The ability to organize and be methodical', 'J'),
	(34, 'The ability to adapt and make do', 'P'),
	(35, 'Infinite', 'J'),
	(35, 'Open-minded', 'P');

-- Password: admin
INSERT INTO users (username, password, personality)
VALUES ('admin', '$2a$10$w3CxnJGRms6YanIeNQnVieoKcIZ0O5TLihB0ZrDA4xwaFIvPBSvei', 'ENFJ');

-- Password: password
INSERT INTO users (username, password, personality)
VALUES ('jane_smith', '$2a$10$pgYTn5zQ/TgL9ISqVJ2WeeFtrI8dVH9oB/Jzoljy1WmSkdWlKjbXm', 'ISTP');

-- TODO dont store passwords in plain text
-- Password: mellowFellow
INSERT INTO users (username, password, personality) 
VALUES ('papaya_flannels', '$2a$10$uJoCQf9ksE7X.gcsB1zh/O47eGUhQByR0WRhhtaWqzstnMEnGdbVu', 'ISTJ');

-- Password: trustyLemon
INSERT INTO users (username, password, personality) 
VALUES ('queen_elizabeth3', '$2a$10$JoKTNq8YZjzLoxATO5Hk2.psK9uGFz.IOoeYpmfCDOnkbLStu3vr6', 'ISFJ');

-- Password: niftyKitten
INSERT INTO users (username, password, personality) 
VALUES ('mandy-candy', '$2a$10$tldD79yu.QZGExwVk4SNA.rwuYbt5ekAZOmynMTPf2YSql5h2VDoe', 'INFJ');

-- Password: windyDragon
INSERT INTO users (username, password, personality) 
VALUES ('steph_curry', '$2a$10$ndQYqQdES5NcQNCDVYovYOtZoS5MqBVhWD3uHwVCVJeVh0BLqumZq', 'INTJ');

-- Password: luckyClover
INSERT INTO users (username, password, personality) 
VALUES ('peety', '$2a$10$vq74Ih83N4ZEtLgu.Ewj7eGEE24/3dCIL6nzCxwlCjhLOFR4qFVIW', 'ISTP');

-- Password: cozyDolphin
INSERT INTO users (username, password, personality) 
VALUES ('duck_lover20', '$2a$10$rCo56OoN57FFroFhU0PItePLXe5hZcqm.Tzr7wNVEeZAiUZWPtxWy', 'ISFP');

-- Password: jollyBadger
INSERT INTO users (username, password, personality) 
VALUES ('olsen_oatmeal', '$2a$10$S6S/Hxg0PzPDuhQvmuj3Rui3RgRgcetTeFkpOx3x8zy12kwar.5pe', 'INFP');

-- Password: boldRaven
INSERT INTO users (username, password, personality) 
VALUES ('angry_pasta', '$2a$10$IXKTGUUVoq3muAQcdHbJvOeBTmBpltqGsCtx4YKzVCJWKb3hlG6nm', 'INTP');

-- Password: friendlyHawk
INSERT INTO users (username, password, personality) 
VALUES ('wizard_of_oz', '$2a$10$zO0sqwYJz.I536Vfveg.nOgpjxXxKV5sPSi9pJl5z8M07/2u05CAa', 'ESTP');

-- Password: sunnyOtter
INSERT INTO users (username, password, personality) 
VALUES ('naruto-uzumaki', '$2a$10$DuUVCyQ95PdOyguYjPYYP.Mf0RFgk1KjFvO57iNR5ZtfmNTtcDUjC', 'ESFP');

-- Password: happyGopher
INSERT INTO users (username, password, personality) 
VALUES ('lisa_meyer', '$2a$10$xazO56SW875OKSNju5yzzuiuP7iWqWmNihl/21oAXD.IV.6YvGmBi', 'ENFP');

-- Password: brightCheetah
INSERT INTO users (username, password, personality) 
VALUES ('catgirl420', '$2a$10$64QH7gf7mQWxwf2wFKS3Y.6f5lNct6xRhjXegQ10t1SjWERDkcgKi', 'ENTP');

-- Password: cleverStork
INSERT INTO users (username, password, personality) 
VALUES ('malfoy_alley', '$2a$10$1id55quKSSNeUMNJ81BeuexS/LM6Pi0AP0KUuNKQCZtF137Fou6Xa', 'ESTJ');

-- Password: wiseBadger
INSERT INTO users (username, password, personality) 
VALUES ('diavolo4', '$2a$10$CDgriYSsI3qUIbmAdRr5aeGynZ5lmYGoaYZ6g6fTRtGtGlUPgL40y', 'ESFJ');

-- Password: chillPanda
INSERT INTO users (username, password, personality) 
VALUES ('HairyPoppins', '$2a$10$hJx8uyQU7i68fU.eRu4dl.thXjzlEDvr9KP9WdSLh5gZWLk9.eD16', 'ENFJ');

-- Password: trendyTurtle
INSERT INTO users (username, password, personality) 
VALUES ('fluffy_cookie', '$2a$10$nRhpEq0Tdyo.5hVrK5iRzO9t9Dg13BnexpCQrU1Pqq5zalNPx.znm', 'ENTJ');

-- Create challenges between admin and other users
-- Admin won
INSERT INTO challenges (user_1_id, user_2_id, user_1_score, user_2_score)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM users WHERE username = 'diavolo4'), 3, 1);

-- Admin lost
INSERT INTO challenges (user_1_id, user_2_id, user_1_score, user_2_score)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM users WHERE username = 'HairyPoppins'), 2, 3);

-- Only admin played; Second score empty
INSERT INTO challenges (user_1_id, user_2_id, user_1_score)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM users WHERE username = 'fluffy_cookie'), 3);

--  Admin score empty; Only second played
INSERT INTO challenges (user_1_id, user_2_id, user_2_score)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM users WHERE username = 'lisa_meyer'), 6);
INSERT INTO challenges (user_1_id, user_2_id, user_2_score)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM users WHERE username = 'naruto-uzumaki'), 24);
INSERT INTO challenges (user_1_id, user_2_id, user_2_score)
VALUES ((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM users WHERE username = 'malfoy_alley'), 17);

-- Friends for the admin
INSERT INTO frenemies (user_id, enemy_id)
VALUES (
  (SELECT id FROM users WHERE username = 'admin'),
  (SELECT id FROM users WHERE username = 'jane_smith')
);

INSERT INTO frenemies (user_id, enemy_id)
VALUES (
  (SELECT id FROM users WHERE username = 'admin'),
  (SELECT id FROM users WHERE username = 'HairyPoppins')
);

INSERT INTO frenemies (user_id, enemy_id)
VALUES (
  (SELECT id FROM users WHERE username = 'admin'),
  (SELECT id FROM users WHERE username = 'naruto-uzumaki')
);

-- Insert all 16 personality types
INSERT INTO personality_types (type) VALUES
	('ENFJ'), ('ENFP'), ('ENTJ'), ('ENTP'),
	('ESFJ'), ('ESFP'), ('ESTJ'), ('ESTP'),
	('INFJ'), ('INFP'), ('INTJ'), ('INTP'),
	('ISFJ'), ('ISFP'), ('ISTJ'), ('ISTP');

-- Insert compatibility percentages
INSERT INTO compatibilities (personality_type_1_id, personality_type_2_id, percentage) VALUES

  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ENFJ'), 14),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ENFP'), 9),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ENTJ'), 58),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ENTP'), 27),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ESFJ'), 36),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ESFP'), 20),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ESTJ'), 68),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ESTP'), 59),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 26),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'INFP'), 27),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 84),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'INTP'), 65),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 70),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 60),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 82),
  ((SELECT id FROM personality_types WHERE type = 'ENFJ'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 91),
  
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ENFP'), 3),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ENTJ'), 63),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ENTP'), 15),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ESFJ'), 58),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ESFP'), 7),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ESTJ'), 73),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ESTP'), 24),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 49),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'INFP'), 27),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 87),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'INTP'), 64),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 89),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 51),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 96),
  ((SELECT id FROM personality_types WHERE type = 'ENFP'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 86),

  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ENTJ'), 9),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ENTP'), 19),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ESFJ'), 47),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ESFP'), 49),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ESTJ'), 13),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ESTP'), 26),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 75),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'INFP'), 87),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 54),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'INTP'), 53),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 71),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 94),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 34),
  ((SELECT id FROM personality_types WHERE type = 'ENTJ'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 59),
  
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ENTP'), 6),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ESFJ'), 68),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ESFP'), 13),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ESTJ'), 30),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ESTP'), 8),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 89),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'INFP'), 65),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 78),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'INTP'), 49),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 95),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 86),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 89),
  ((SELECT id FROM personality_types WHERE type = 'ENTP'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 65),
  
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'ESFJ'), 6),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'ESFP'), 60),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'ESTJ'), 23),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'ESTP'), 63),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 26),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'INFP'), 83),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 68),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'INTP'), 95),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 21),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 43),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 29),
  ((SELECT id FROM personality_types WHERE type = 'ESFJ'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 81),
  
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'ESFP'), 30),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'ESTJ'), 61),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'ESTP'), 25),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 57),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'INFP'), 42),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 78),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'INTP'), 61),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 88),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 42),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 92),
  ((SELECT id FROM personality_types WHERE type = 'ESFP'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 74),

  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'ESTJ'), 4),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'ESTP'), 22),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 86),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'INFP'), 97),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 67),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'INTP'), 78),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 52),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 78),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 21),
  ((SELECT id FROM personality_types WHERE type = 'ESTJ'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 45),

  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'ESTP'), 5),
  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 95),
  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'INFP'), 76),
  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 83),
  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'INTP'), 61),
  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 88),
  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 57),
  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 80),
  ((SELECT id FROM personality_types WHERE type = 'ESTP'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 38),

  ((SELECT id FROM personality_types WHERE type = 'INFJ'), (SELECT id FROM personality_types WHERE type = 'INFJ'), 5),
  ((SELECT id FROM personality_types WHERE type = 'INFJ'), (SELECT id FROM personality_types WHERE type = 'INFP'), 15),
  ((SELECT id FROM personality_types WHERE type = 'INFJ'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 35),
  ((SELECT id FROM personality_types WHERE type = 'INFJ'), (SELECT id FROM personality_types WHERE type = 'INTP'), 50),
  ((SELECT id FROM personality_types WHERE type = 'INFJ'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 15),
  ((SELECT id FROM personality_types WHERE type = 'INFJ'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 42),
  ((SELECT id FROM personality_types WHERE type = 'INFJ'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 47),
  ((SELECT id FROM personality_types WHERE type = 'INFJ'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 77),

  ((SELECT id FROM personality_types WHERE type = 'INFP'), (SELECT id FROM personality_types WHERE type = 'INFP'), 3),
  ((SELECT id FROM personality_types WHERE type = 'INFP'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 30),
  ((SELECT id FROM personality_types WHERE type = 'INFP'), (SELECT id FROM personality_types WHERE type = 'INTP'), 16),
  ((SELECT id FROM personality_types WHERE type = 'INFP'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 54),
  ((SELECT id FROM personality_types WHERE type = 'INFP'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 22),
  ((SELECT id FROM personality_types WHERE type = 'INFP'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 79),
  ((SELECT id FROM personality_types WHERE type = 'INFP'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 51),
  
  ((SELECT id FROM personality_types WHERE type = 'INTJ'), (SELECT id FROM personality_types WHERE type = 'INTJ'), 14),
  ((SELECT id FROM personality_types WHERE type = 'INTJ'), (SELECT id FROM personality_types WHERE type = 'INTP'), 11),
  ((SELECT id FROM personality_types WHERE type = 'INTJ'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 21),
  ((SELECT id FROM personality_types WHERE type = 'INTJ'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 55),
  ((SELECT id FROM personality_types WHERE type = 'INTJ'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 15),
  ((SELECT id FROM personality_types WHERE type = 'INTJ'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 22),

  ((SELECT id FROM personality_types WHERE type = 'INTP'), (SELECT id FROM personality_types WHERE type = 'INTP'), 4),
  ((SELECT id FROM personality_types WHERE type = 'INTP'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 62),
  ((SELECT id FROM personality_types WHERE type = 'INTP'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 57),
  ((SELECT id FROM personality_types WHERE type = 'INTP'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 49),
  ((SELECT id FROM personality_types WHERE type = 'INTP'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 19),

  ((SELECT id FROM personality_types WHERE type = 'ISFJ'), (SELECT id FROM personality_types WHERE type = 'ISFJ'), 5),
  ((SELECT id FROM personality_types WHERE type = 'ISFJ'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 24),
  ((SELECT id FROM personality_types WHERE type = 'ISFJ'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 7),
  ((SELECT id FROM personality_types WHERE type = 'ISFJ'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 38),

  ((SELECT id FROM personality_types WHERE type = 'ISFP'), (SELECT id FROM personality_types WHERE type = 'ISFP'), 3),
  ((SELECT id FROM personality_types WHERE type = 'ISFP'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 53),
  ((SELECT id FROM personality_types WHERE type = 'ISFP'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 24),

  ((SELECT id FROM personality_types WHERE type = 'ISTJ'), (SELECT id FROM personality_types WHERE type = 'ISTJ'), 4),
  ((SELECT id FROM personality_types WHERE type = 'ISTJ'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 22),

  ((SELECT id FROM personality_types WHERE type = 'ISTP'), (SELECT id FROM personality_types WHERE type = 'ISTP'), 4);

COMMIT;
