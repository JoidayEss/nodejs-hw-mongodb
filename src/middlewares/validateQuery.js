export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
    next();
  };
};

export default validateQuery;
