const yup = require("yup");

const validateUser = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  username: yup.string().required().min(3),
  profilePic: yup
    .mixed()
    .test("is-valid-type", "Not a valid image type", function () {
      const file = this.options.context?.file;
      if (!file) return true;
      return ["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype);
    }),
});

module.exports = validateUser;
