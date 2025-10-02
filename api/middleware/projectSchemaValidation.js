const yup = require("yup");
const validateTask = yup.object({
  title: yup.string().required().min(3),
  content: yup.string().required(),
});
module.exports = validateTask;
