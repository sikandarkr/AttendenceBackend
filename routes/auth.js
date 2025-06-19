const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const logger = require('../utils/logger');
router.post('/login', controller.login);

router.post('/demo', (req,res)=>{
    logger.error('Demo route error', { message: err.message, stack: err.stack });
    throw new Error('🔥 Intentional error for testing CloudWatch');
    return res.json({"Data":"Now it's working congrats...."});
})
router.get('/error-demo', (req,res)=>{
    nonExistentFunction(); // This will throw ReferenceError
})

module.exports = router;
