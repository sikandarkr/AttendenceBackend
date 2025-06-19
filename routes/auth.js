const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/login', controller.login);

router.post('/demo', (req,res)=>{
    throw new Error('🔥 Intentional error for testing CloudWatch');
    return res.json({"Data":"Now it's working congrats...."});
})
router.get('/error-demo', (req,res)=>{
    nonExistentFunction(); // This will throw ReferenceError
})

module.exports = router;
