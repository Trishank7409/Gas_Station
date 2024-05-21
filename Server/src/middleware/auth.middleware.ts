
// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Your authentication logic here
  const token =  req.cookies.jwt_token ?? '';

  if (token) {
    // Validate token and continue to the next middleware or route handler
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default AuthMiddleware;
