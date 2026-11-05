import jwt from 'jsonwebtoken';

// Put this in front of any route that only a logged-in admin may use.
// It reads the JWT from the cookie, checks it, and saves the admin's id on req.
const requireAdminLogin = (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ message: 'You are not logged in' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decodedToken.adminId;
    next(); // token is good, continue to the real route
  } catch (error) {
    return res.status(401).json({ message: 'Your session has expired, please log in again' });
  }
};

export default requireAdminLogin;
