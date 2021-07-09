const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    get logged in user
// @access  Private
router.get('/' , auth ,async (req,res)=> {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth
// @desc    auth user & get token
// @access  Pulbic
router.post('/' ,[
    body('email','please enter a valid email').isEmail(),
    body('password', 'password is required').exists()
] ,async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){ 
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ msg: 'invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg:'invalid credentials'});
        }

        const payload = {
            user :{
                id: user.id
            }
        }

        jwt.sign(payload , config.get('jwtSecret'),{
            expiresIn:360000
        },(err,token)=>{
            if(err) throw err;
            res.json({token});
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;