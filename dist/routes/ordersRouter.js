"use strict";
var router = require("express").Router();
var ordersController = require('../controllers/ordersController');
router.post("/", ordersController.handleOrder);
module.exports = router;
