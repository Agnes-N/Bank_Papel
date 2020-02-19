import Joi from 'joi';

const validateLogin = (req, res, next) => {
  const schema = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    if (error.details[0].message.replace('/', '').replace(/"/g, '').includes('email')) {
      return res.status(400).json({
        status: 400,
        error: {
          error: 'Incorrect email format. use: example@mail.com',
        },
      });
    }
    return res.status(400).json({
      status: 400,
      error: error.details[0].message.replace('/', '').replace(/"/g, ''),
    });
  }
  next();
};
export default validateLogin;
