const data = require("../../models/contacts");
const contactSchema = require("../../schemas/contact");

const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).send("Error");
      return;
    }
    const newContact = await data.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
