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

COMMIT;
