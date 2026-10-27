
import express from 'express';

const router = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', (req, res, _next) => {
  counter += 1;

  res.render('index', {
    title: 'RICARDO',
    counter,
    numbers,
  });
});

export default router;
