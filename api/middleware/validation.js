const validation = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(500).json({ message: "erros", error: error });
  }
};

module.exports = validation;
