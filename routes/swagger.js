const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../apiDocumentation/swaggerConfig');


//enable authorizate jtw for swagger
const swaggerUiOptions = {
    explorer: true
};

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerUiOptions));

module.exports = router;
