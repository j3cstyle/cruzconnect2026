export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Please check the form fields.",
        errors: result.error.issues.map(i => ({field: i.path.join("."), message: i.message}))
      });
    }
    req.body = result.data;
    next();
  };
}