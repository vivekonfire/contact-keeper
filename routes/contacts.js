const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    get all users contacts
// @access  Private
router.get('/' , (req,res)=> {
    res.send('get all contacts');
});

// @route   POST api/contacts
// @desc    add new contact
// @access  private
router.post('/' , (req,res)=> {
    res.send('add all contacts');
});

// @route   GET api/contacts/:id
// @desc    update contact
// @access  Private
router.put('/:id' , (req,res)=> {
    res.send('update contact');
});

// @route   POST api/contacts/:id
// @desc    delete contact
// @access  private
router.delete('/:id' , (req,res)=> {
    res.send('delete contacts');
});

module.exports = router;