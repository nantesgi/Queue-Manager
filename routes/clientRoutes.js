const express = require('express');

const clientController = require('../controllers/clientController');

const router = express.Router();

router
  .route('/')
  .get(clientController.callReception)
  .post(clientController.getClient);

router.route('/:skipID').get(clientController.skipReception);

module.exports = router;
