const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/login', controller.login);

router.post('/demo', (req,res)=>{
    return res.json({"Data":"Now it's working congrats...."});
})

module.exports = router;
