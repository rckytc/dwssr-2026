//var express = require('express');
import express from 'express';
//var router = express.Router();
const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('LISTA DE USUARIOS');
});

//module.exports = router;
export default router;