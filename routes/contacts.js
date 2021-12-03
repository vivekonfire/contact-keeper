const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");

// @route   GET api/contacts
// @desc    get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(404).send("server error");
    }
});

// @route   POST api/contacts
// @desc    add new contact
// @access  private
router.post(
    "/",
    [auth, [body("name", "Please enter the name").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id,
            });

            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @route   GET api/contacts/:id
// @desc    update contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "contact not found" });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "not authorized" });
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/contacts/:id
// @desc    delete contact
// @access  private
router.delete("/:id", auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "contact not found" });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "not authorized" });
        }
        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: "contact removes" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
