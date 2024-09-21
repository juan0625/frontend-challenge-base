import { verifyToken } from '../utils/auth';

export const withAuth = (handler) => (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return handler(req, res);
};
