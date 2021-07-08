const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    get logged in user
// @access  Private
router.get('/' , (req,res)=> {
    res.send('get logged in user');
});

// @route   POST api/auth
// @desc    auth user & get token
// @access  Pulbic
router.post('/' , (req,res)=> {
    res.send('auth user & get token');
});

module.exports = router;