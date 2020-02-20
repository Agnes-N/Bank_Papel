import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const information = jwt.verify(token, 'jwtprivatekey');
    req.Data = information;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'You must log in to perform this task.',
    });
  }
};

export default auth;
