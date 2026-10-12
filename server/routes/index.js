import express from 'express';
const router = express.Router();

let counter = 0;
const numbers = []
/* GET home page. */
router.get('/', function(req, res, next) {
  counter++;
  res.render('index', { title: 'RICARDO',
    counter,
    numbers
  });
});

//module.exports = router;
export default router;