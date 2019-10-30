import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { createConnection } from 'typeorm';
import passport from 'passport';
import config from './config/passport';

import login from './routes/login';
import questions from './routes/questions';
import topics from './routes/topics';
import courses from './routes/courses';

// Setting up port
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // For body parser
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'], // todo, remove this from being hardcoded
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());
config();

// wire up all the routes
app.use(login(passport));
app.use(questions);
app.use(topics);
app.use(courses);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_req, res) => {
  res.send('Welcome to the ICS Quiz Program API!');
});

createConnection().then(() => {
  app.listen(PORT, () => console.log('The ICS Quiz Program API, listening on port 3000!'));
});
