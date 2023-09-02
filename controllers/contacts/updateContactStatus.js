const { Contact } = require("../../models");
const { contactStatusSchema } = require("../../schemas");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactStatusSchema.validate(req.body);
    if (error) {
      res.status(400).send("missing field favorite");
      return;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      res.status(404).send("Not found");
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
