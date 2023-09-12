const { User } = require("../../models");
const { userSchema } = require("../../schemas");
const sendEmail = require("../../helpers/sendEmail");

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
      return;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        status: "Conflict",
        code: 409,
        message: "Email in use",
      });
      return;
    }
    const verificationToken = uuidv4();
    const avatarURL = gravatar.url(email, { d: "mp" });
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Please Verify Your Identity",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify Your Identity</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          email,
          subscription: result.subscription,
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
