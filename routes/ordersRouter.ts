const router = require("express").Router();
const ordersController = require('../controllers/ordersController')

router.post("/", ordersController.handleOrder);



module.exports = router;